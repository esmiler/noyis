import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import lineup from "@/assets/treasure-lineup-funnel.png.asset.json";
import treasureMan from "@/assets/treasure-man-funnel.png.asset.json";
import treasureWoman from "@/assets/treasure-woman-funnel.png.asset.json";
import treasureHerbs from "@/assets/treasure-herbs-funnel.png.asset.json";

const CANONICAL = "https://noyisafrica.com/treasure";
const TITLE = "Treasure Collection — Premium Organic Wellness by Noyis Africa";
const DESCRIPTION =
  "Explore the Treasure Collection by Noyis Africa — Treasure Man, Treasure Woman, and Treasure Herbs. A dedicated page for premium organic wellness formulas presented with a refined brand standard and direct WhatsApp ordering.";

const PRODUCTS = [
  {
    slug: "treasure-man",
    name: "Treasure Man",
    image: treasureMan.url,
    eyebrow: "Men's vitality support",
    headline: "A refined daily formula for stamina, confidence, and male vitality.",
    description:
      "Treasure Man is positioned as a premium herbal wellness formula for men who value consistency, strength, and everyday performance. It is presented for customers seeking a plant-based addition to a disciplined lifestyle, with a brand focus on quality handling, premium presentation, and dependable customer care.",
    benefits: [
      "Supports everyday vitality and active-lifestyle stamina",
      "Designed for men seeking a premium plant-based wellness option",
      "Presented as part of a disciplined, confidence-led routine",
      "Backed by the Noyis Africa standard for careful handling and presentation",
    ],
    formula: [
      "Plant-based herbal wellness blend",
      "Naturally inspired botanical profile",
      "Prepared for customers who prefer organic-forward wellness choices",
      "Full label and ordering guidance available on request via WhatsApp",
    ],
    whatsapp:
      "Hello,%20I%20would%20like%20to%20place%20an%20order%20for%20Treasure%20Man.%20Please%20share%20availability%20and%20the%20best%20purchase%20option.",
  },
  {
    slug: "treasure-woman",
    name: "Treasure Woman",
    image: treasureWoman.url,
    eyebrow: "Women's wellness support",
    headline: "A polished herbal formula created to support feminine balance and everyday wellness.",
    description:
      "Treasure Woman is presented as a premium wellness companion for women who want a graceful, plant-based formula that fits naturally into modern routines. The product is positioned with a focus on feminine vitality, brand care, and premium-quality presentation for customers who value both wellness and trust.",
    benefits: [
      "Supports feminine wellness and daily balance",
      "Plant-based positioning for customers who prefer natural lifestyle options",
      "Suitable for a polished, premium self-care routine",
      "Delivered with the same quality-led Noyis Africa brand standard",
    ],
    formula: [
      "Botanical wellness blend for women",
      "Naturally derived plant-based profile",
      "Organic-forward sourcing and presentation standard",
      "Full label and ordering guidance available on request via WhatsApp",
    ],
    whatsapp:
      "Hello,%20I%20would%20like%20to%20place%20an%20order%20for%20Treasure%20Woman.%20Please%20share%20availability%20and%20the%20best%20purchase%20option.",
  },
  {
    slug: "treasure-herbs",
    name: "Treasure Herbs",
    image: treasureHerbs.url,
    eyebrow: "Daily herbal support",
    headline: "A versatile herbal wellness formula designed for broad everyday support.",
    description:
      "Treasure Herbs sits at the center of the collection as a practical, everyday herbal option for customers who want a dependable wellness staple. It is presented as an accessible formula within a premium brand system — cleanly packaged, carefully handled, and aligned with the Noyis Africa organic-first promise.",
    benefits: [
      "Supports a consistent herbal wellness routine",
      "Suitable for customers seeking an everyday plant-based option",
      "Presented as a practical foundation within the Treasure line",
      "Handled and delivered with premium brand care",
    ],
    formula: [
      "General herbal wellness blend",
      "Naturally inspired botanical composition",
      "Organic-forward product positioning for daily use",
      "Full label and ordering guidance available on request via WhatsApp",
    ],
    whatsapp:
      "Hello,%20I%20would%20like%20to%20place%20an%20order%20for%20Treasure%20Herbs.%20Please%20share%20availability%20and%20the%20best%20purchase%20option.",
  },
] as const;

const FAQS = [
  {
    q: "What is the Treasure Collection by Noyis Africa?",
    a: "The Treasure Collection is a focused line of premium herbal wellness products under the Noyis Africa brand, featuring Treasure Man, Treasure Woman, and Treasure Herbs. The line is presented as an organic-forward wellness offering with a strong emphasis on brand trust, careful handling, and direct customer support.",
  },
  {
    q: "Are the Treasure products positioned as organic and non-GMO?",
    a: "Yes. This page presents the Treasure line within the broader Noyis Africa organic-first brand standard, with an emphasis on natural, plant-based, and non-GMO-conscious positioning across the brand's wellness offerings.",
  },
  {
    q: "Can I order directly through WhatsApp?",
    a: "Yes. Each product section includes a direct WhatsApp action so interested buyers can request availability, ordering details, and product guidance immediately.",
  },
  {
    q: "Does this page replace the home page?",
    a: "No. This is a standalone page dedicated to the Treasure line. The main home page remains separate and continues to serve as the primary entry point to the broader Noyis Africa brand.",
  },
] as const;

export const Route = createFileRoute("/treasure")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "noyis africa treasure collection, treasure man, treasure woman, treasure herbs, organic wellness, non-gmo wellness, herbal products antigua, premium herbal brand, treasure line",
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
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
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
              isPartOf: { "@type": "WebSite", name: "Noyis Africa", url: "https://noyisafrica.com" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://noyisafrica.com/" },
                { "@type": "ListItem", position: 2, name: "Treasure Collection", item: CANONICAL },
              ],
            },
            ...PRODUCTS.map((product) => ({
              "@type": "Product",
              name: product.name,
              image: product.image,
              description: product.description,
              brand: { "@type": "Brand", name: "Noyis Africa" },
              category: "Organic Wellness",
              url: `https://noyisafrica.com/products/${product.slug}`,
            })),
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: TreasurePage,
});

function TreasurePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main>
        <section className="bg-gradient-botanical py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                <Sparkles className="h-3.5 w-3.5" /> Premium Organic Wellness Line
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
                Treasure Man, Treasure Woman &amp; Treasure Herbs
              </h1>
              <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
                Discover a dedicated page for the Treasure line — a premium Noyis Africa collection presented with a
                stronger corporate voice, a cleaner wellness standard, and direct paths to purchase. This collection is
                positioned for customers who value organic-forward, plant-based, non-GMO-conscious products handled with
                care from presentation to delivery.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <a
                    href="https://wa.me/12687210101?text=Hello,%20I%20am%20interested%20in%20the%20Treasure%20Collection.%20Please%20share%20availability%20and%20ordering%20details."
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> Order via WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/products" search={{ cat: "natural-wellness" }}>
                    Browse wellness products <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-elevated">
              <img
                src={lineup.url}
                alt="Treasure Man, Treasure Woman and Treasure Herbs by Noyis Africa"
                className="w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-sand py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Brand standard</p>
                <h2 className="mt-3 font-display text-3xl text-botanical sm:text-4xl">
                  An organic-first Noyis Africa promise across wellness and food offerings.
                </h2>
                <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
                  Noyis Africa presents itself as a brand built around organic-forward decisions, careful handling, and
                  premium customer presentation. From herbal wellness products to prepared food offerings and small
                  chops, the brand message on this page is clear: ingredient quality, natural positioning, clean brand
                  standards, and thoughtful delivery remain central to how Noyis Africa creates, manages, sells, and
                  supports its products.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  {
                    icon: Leaf,
                    title: "100% Organic-forward",
                    body: "Presented with a clean, plant-based, nature-led brand standard.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Non-GMO-conscious",
                    body: "Framed for customers seeking naturally positioned, quality-led options.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Professionally handled",
                    body: "From sourcing and presentation to customer support and delivery.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-xl text-botanical">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-20">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.slug}
              className="grid gap-8 lg:grid-cols-2 lg:items-center"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                  <img
                    src={product.image}
                    alt={`${product.name} product presentation by Noyis Africa`}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{product.eyebrow}</p>
                <h2 className="mt-3 font-display text-3xl text-botanical sm:text-4xl">{product.name}</h2>
                <p className="mt-3 text-lg font-medium text-foreground">{product.headline}</p>
                <p className="mt-4 text-base text-muted-foreground">{product.description}</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <h3 className="font-display text-xl text-botanical">Benefits</h3>
                    <ul className="mt-4 grid gap-2">
                      {product.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-foreground/85">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <h3 className="font-display text-xl text-botanical">Formula profile</h3>
                    <ul className="mt-4 grid gap-2">
                      {product.formula.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-botanical">
                    <Link to="/products/$slug" params={{ slug: product.slug }}>
                      View product page <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`https://wa.me/12687210101?text=${product.whatsapp}`} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="bg-sand py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Why this page exists</p>
              <h2 className="mt-3 font-display text-3xl text-botanical sm:text-4xl">
                A dedicated sales page for the brand's strongest-performing line.
              </h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                The Treasure Collection has been given its own focused presentation so customers can understand the line
                quickly, trust the brand more easily, and move directly into conversation and purchase. This page is
                designed to help new visitors, returning customers, and ad-driven traffic understand the collection at
                a glance without changing the structure of the main home page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <a
                    href="https://wa.me/12687210101?text=Hello,%20I%20would%20like%20help%20choosing%20between%20Treasure%20Man,%20Treasure%20Woman,%20and%20Treasure%20Herbs."
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> Speak to sales on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl text-botanical sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-2 text-muted-foreground">
            Clear answers for customers exploring the Treasure line for the first time.
          </p>
          <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group p-6">
                <summary className="cursor-pointer list-none font-display text-lg text-botanical">{faq.q}</summary>
                <p className="mt-3 text-sm text-foreground/85">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
