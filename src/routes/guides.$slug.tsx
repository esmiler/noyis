import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock } from "lucide-react";
import { getGuide } from "@/lib/guides.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLang } from "@/components/lang-context";
import { localized } from "@/lib/i18n";
import DOMPurify from "isomorphic-dompurify";

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    "h1","h2","h3","h4","h5","h6","p","br","hr","strong","em","b","i","u","s",
    "ul","ol","li","blockquote","code","pre","a","img","figure","figcaption",
    "table","thead","tbody","tr","th","td","span","div",
  ],
  ALLOWED_ATTR: ["href","title","alt","src","target","rel","class","id"],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/|#)/i,
};

const guideQuery = (slug: string) =>
  queryOptions({
    queryKey: ["guide", slug],
    queryFn: () => getGuide({ data: { slug } }),
  });

export const Route = createFileRoute("/guides/$slug")({
  loader: async ({ params, context }) => {
    const g = await context.queryClient.ensureQueryData(guideQuery(params.slug));
    if (!g) throw notFound();
    return g;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Guide not found — Noyis Africa" }] };
    const title = (loaderData.title_localized as Record<string, string>)?.en ?? "Wellness Guide";
    const desc = (loaderData.excerpt_localized as Record<string, string>)?.en ?? "";
    const faq = Array.isArray(loaderData.faq_localized) ? (loaderData.faq_localized as { q: string; a: string }[]) : [];
    return {
      meta: [
        { title: `${title} — Noyis Africa` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        ...(loaderData.hero_image ? [{ property: "og:image", content: loaderData.hero_image }] : []),
      ],
      links: [{ rel: "canonical", href: `/guides/${loaderData.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: title,
                description: desc,
                image: loaderData.hero_image ?? undefined,
                datePublished: loaderData.created_at,
                dateModified: loaderData.updated_at,
                author: { "@type": "Organization", name: loaderData.author ?? "Noyis Africa" },
                publisher: { "@type": "Organization", name: "Noyis Africa" },
              },
              ...(faq.length
                ? [
                    {
                      "@type": "FAQPage",
                      mainEntity: faq.map((f) => ({
                        "@type": "Question",
                        name: f.q,
                        acceptedAnswer: { "@type": "Answer", text: f.a },
                      })),
                    },
                  ]
                : []),
            ],
          }),
        },
      ],
    };
  },
  component: GuideDetail,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Guide not found</h1>
        <Link to="/guides" className="mt-4 inline-block text-primary hover:underline">← Back to all guides</Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

function GuideDetail() {
  const { lang } = useLang();
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(guideQuery(slug));
  if (!data) return null;

  const faq = Array.isArray(data.faq_localized)
    ? (data.faq_localized as { q: string; a: string }[])
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <Link to="/guides" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All guides
        </Link>
        {data.category && (
          <span className="mt-6 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
            {data.category}
          </span>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-botanical sm:text-5xl">
          {localized(data.title_localized, lang)}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{localized(data.excerpt_localized, lang)}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {data.reading_minutes} min read
          </span>
        </div>
        {data.hero_image && (
          <img src={data.hero_image} alt="" className="mt-8 w-full rounded-2xl border border-border object-cover" />
        )}
        <div
          className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-headings:text-botanical prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: localized(data.body_localized, lang) }}
        />

        {faq.length > 0 && (
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl text-botanical">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-5">
              {faq.map((f, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
      <SiteFooter />
    </div>
  );
}
