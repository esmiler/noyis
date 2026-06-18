import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Check, Leaf, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { listProducts } from "@/lib/products.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import lineup from "@/assets/noyis-treasure-lineup.jpg.asset.json";
import treasureMan from "@/assets/treasure-man.png.asset.json";
import treasureWoman from "@/assets/treasure-woman.png.asset.json";
import treasureHerbs from "@/assets/treasure-herbs.png.asset.json";

const CANONICAL = "https://noyisafrica.com/treasure";

const TITLE = "Treasure Herbs, Treasure Man & Treasure Woman — Official Noyis Africa";
const DESCRIPTION =
  "Official home of Treasure Herbs, Treasure Man and Treasure Woman — 100% natural African herbal wellness formulas by Noyis Africa. Shipping across Antigua, the Caribbean, the United States, Canada and Latin America.";

const productsQuery = queryOptions({
  queryKey: ["products", { wholesale: undefined }],
  queryFn: () => listProducts({ data: {} }),
});

const TREASURE = [
  {
    slug: "treasure-man",
    name: "Treasure Man",
    image: treasureMan.url,
    tagline: "Vitality, stamina & male wellness",
    body:
      "Treasure Man is a 100% natural African herbal formula crafted for men who want sustained energy, stamina and everyday vitality. Used across Antigua, the Caribbean and the African diaspora as part of a daily wellness routine.",
    benefits: [
      "Supports natural stamina & vitality",
      "100% natural African botanicals",
      "Traditional formulation, modern quality control",
      "Trusted by men across the Caribbean diaspora",
    ],
  },
  {
    slug: "treasure-woman",
    name: "Treasure Woman",
    image: treasureWoman.url,
    tagline: "Balance, vitality & feminine wellness",
    body:
      "Treasure Woman is a 100% natural African herbal blend formulated to support hormonal balance, vitality and overall feminine wellness. A favourite of Caribbean women seeking a gentle, plant-based daily companion.",
    benefits: [
      "Supports feminine balance & vitality",
      "Crafted from African botanicals",
      "Trusted by women across Antigua & the Caribbean",
      "Plant-based, naturally formulated",
    ],
  },
  {
    slug: "treasure-herbs",
    name: "Treasure Herbs",
    image: treasureHerbs.url,
    tagline: "Daily herbal wellness for the whole family",
    body:
      "Treasure Herbs is the everyday cornerstone of the Treasure collection — a 100% natural African herbal blend used as a daily wellness tonic by families across Antigua, the Caribbean, North America and Latin America.",
    benefits: [
      "Daily herbal wellness companion",
      "African botanicals, naturally blended",
      "Suitable for the whole household",
      "Backed by Noyis Africa quality standards",
    ],
  },
] as const;

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is Treasure Herbs?",
    a: "Treasure Herbs is a 100% natural African herbal blend distributed by Noyis Africa from Antigua. It is used as a daily herbal wellness tonic across the Caribbean, North America and Latin America.",
  },
  {
    q: "What is Treasure Man?",
    a: "Treasure Man is a 100% natural African herbal formula for men, designed to support stamina, vitality and everyday wellness. It is part of the Treasure collection by Noyis Africa.",
  },
  {
    q: "What is Treasure Woman?",
    a: "Treasure Woman is a 100% natural African herbal blend for women, supporting feminine balance and daily vitality. It is part of the Treasure collection by Noyis Africa.",
  },
  {
    q: "Where can I buy Treasure Herbs, Treasure Man and Treasure Woman?",
    a: "The official source is Noyis Africa at noyisafrica.com. Order via the website or WhatsApp (+1 268 721 0101) for delivery across Antigua, the wider Caribbean, the United States, Canada and Latin America.",
  },
  {
    q: "Are Treasure products available in Antigua during Carnival season?",
    a: "Yes. Noyis Africa stocks Treasure Herbs, Treasure Man and Treasure Woman year-round in Antigua, with increased availability during Carnival season. Visit the store locator or message us on WhatsApp for the nearest stockist.",
  },
  {
    q: "Are Treasure products natural?",
    a: "Yes. Treasure Herbs, Treasure Man and Treasure Woman are 100% natural herbal formulas crafted from African botanicals.",
  },
];

export const Route = createFileRoute("/treasure")({
  loader: async ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "treasure herbs, treasure man, treasure woman, treasure herbs antigua, treasure man antigua, treasure woman antigua, noyis africa, african herbal wellness, caribbean herbal supplements, natural wellness antigua, treasure herbal collection",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: lineup.url },
      { property: "og:site_name", content: "Noyis Africa" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: lineup.url },
      { name: "geo.region", content: "AG" },
      { name: "geo.placename", content: "St. John's, Antigua" },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      { rel: "alternate", hrefLang: "en", href: CANONICAL },
      { rel: "alternate", hrefLang: "es", href: CANONICAL },
      { rel: "alternate", hrefLang: "fr", href: CANONICAL },
      { rel: "alternate", hrefLang: "x-default", href: CANONICAL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${CANONICAL}#collection`,
              url: CANONICAL,
              name: TITLE,
              description: DESCRIPTION,
              inLanguage: "en",
              isPartOf: { "@type": "WebSite", name: "Noyis Africa", url: "https://noyisafrica.com" },
              about: [
                { "@type": "Thing", name: "Treasure Herbs" },
                { "@type": "Thing", name: "Treasure Man" },
                { "@type": "Thing", name: "Treasure Woman" },
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://noyisafrica.com/" },
                { "@type": "ListItem", position: 2, name: "Treasure Collection", item: CANONICAL },
              ],
            },
            ...TREASURE.map((t) => ({
              "@type": "Product",
              "@id": `https://noyisafrica.com/products/${t.slug}#product`,
              name: t.name,
              alternateName: [`${t.name} Antigua`, `${t.name} Noyis Africa`, `${t.name} herbal`],
              description: t.body,
              image: t.image,
              brand: { "@type": "Brand", name: "Noyis Africa" },
              category: "Herbal Wellness",
              url: `https://noyisafrica.com/products/${t.slug}`,
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                areaServed: ["AG", "Caribbean", "US", "CA", "Latin America"],
                url: `https://noyisafrica.com/products/${t.slug}`,
              },
            })),
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "Organization",
              "@id": "https://noyisafrica.com/#org",
              name: "Noyis Africa",
              url: "https://noyisafrica.com",
              logo: "https://noyisafrica.com/icon.png",
              areaServed: [
                { "@type": "Country", name: "Antigua and Barbuda" },
                { "@type": "Place", name: "Caribbean" },
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "Canada" },
                { "@type": "Place", name: "Latin America" },
              ],
              sameAs: ["https://wa.me/12687210101"],
            },
          ],
        }),
      },
    ],
  }),
  component: TreasurePage,
});

function TreasurePage() {
  useSuspenseQuery(productsQuery);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <section className="bg-gradient-botanical py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" /> Official Treasure Collection
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">
              Treasure Herbs, Treasure Man &amp; Treasure Woman
            </h1>
            <p className="mt-4 text-lg text-white/85">
              The official home of the Treasure collection by Noyis Africa — 100% natural African herbal wellness
              formulas. Trusted across Antigua, the Caribbean, North America and Latin America. Stocked
              year-round and in full supply for Carnival season.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <a
                  href="https://wa.me/12687210101?text=Hello%20Noyis%20Africa%2C%20I%27d%20like%20to%20order%20Treasure%20herbs."
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <Link to="/store-locator">Find a stockist</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-elevated">
            <img
              src={lineup.url}
              alt="Treasure Herbs, Treasure Man and Treasure Woman — 100% natural African herbal wellness formulas by Noyis Africa"
              className="w-full"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {TREASURE.map((t) => (
            <article key={t.slug} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <Link to="/products/$slug" params={{ slug: t.slug }} className="block bg-gradient-to-br from-sand to-stone">
                <img src={t.image} alt={`${t.name} — natural African herbal wellness by Noyis Africa`} className="aspect-[4/3] w-full object-contain p-4" loading="lazy" />
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t.tagline}</p>
                <h2 className="font-display text-2xl text-botanical">{t.name}</h2>
                <p className="text-sm text-muted-foreground">{t.body}</p>
                <ul className="mt-2 grid gap-1.5">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-3">
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-botanical">
                    <Link to="/products/$slug" params={{ slug: t.slug }}>View {t.name}</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Leaf, title: "100% Natural", body: "African botanicals, naturally formulated." },
              { icon: ShieldCheck, title: "Official Source", body: "Direct from Noyis Africa — no resellers." },
              { icon: Sparkles, title: "Carnival-Ready", body: "Full stock in Antigua through Carnival season." },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl text-botanical">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl text-botanical sm:text-4xl">Frequently asked questions</h2>
        <p className="mt-2 text-muted-foreground">
          Answers about Treasure Herbs, Treasure Man and Treasure Woman — the official Noyis Africa collection.
        </p>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQS.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="cursor-pointer list-none font-display text-lg text-botanical">{f.q}</summary>
              <p className="mt-3 text-sm text-foreground/85">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
