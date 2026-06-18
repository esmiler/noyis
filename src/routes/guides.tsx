import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { BookOpen, Clock } from "lucide-react";
import { listGuides } from "@/lib/guides.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLang } from "@/components/lang-context";
import { localized } from "@/lib/i18n";

const guidesQuery = queryOptions({
  queryKey: ["guides"],
  queryFn: () => listGuides(),
});

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Wellness Guides — Noyis Africa" },
      {
        name: "description",
        content:
          "Practical guides to Caribbean herbal traditions, the Treasure wellness collection, soursop tea, moringa and natural daily wellness from Noyis Africa.",
      },
      { property: "og:title", content: "Wellness Guides — Noyis Africa" },
      {
        property: "og:description",
        content: "Caribbean herbal traditions, product guides and how-to brewing instructions.",
      },
      { property: "og:url", content: "/guides" },
    ],
    links: [{ rel: "canonical", href: "/guides" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Wellness Guides — Noyis Africa",
          description: "Caribbean herbal traditions, product guides and how-to brewing instructions.",
          url: "/guides",
        }),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(guidesQuery),
  component: GuidesIndex,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Not found.</div>,
});

function GuidesIndex() {
  const { lang } = useLang();
  const { data: guides } = useSuspenseQuery(guidesQuery);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <section className="bg-gradient-botanical py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
            <BookOpen className="h-3.5 w-3.5" /> Knowledge Library
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Wellness Guides</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Caribbean herbal traditions, product deep-dives and practical brewing instructions — written so you, your
            family, and AI search engines can find clear answers about natural wellness.
          </p>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {guides.map((g) => (
              <Link
                key={g.id}
                to="/guides/$slug"
                params={{ slug: g.slug }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-card"
              >
                {g.category && (
                  <span className="self-start rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                    {g.category}
                  </span>
                )}
                <h2 className="mt-3 font-display text-xl text-botanical group-hover:text-primary">
                  {localized(g.title_localized, lang)}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {localized(g.excerpt_localized, lang)}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {g.reading_minutes} min read
                  </span>
                </div>
              </Link>
            ))}
            {guides.length === 0 && (
              <div className="col-span-full rounded-xl border border-dashed p-10 text-center text-muted-foreground">
                Guides are coming soon.
              </div>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
