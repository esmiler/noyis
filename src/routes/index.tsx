import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Leaf, Truck, Package, Globe2, MessageCircle, ShieldCheck, ChevronDown } from "lucide-react";
import { useState } from "react";
import { listProducts, listCategories } from "@/lib/products.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { useLang } from "@/components/lang-context";
import { localized, tr } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import lineup from "@/assets/noyis-treasure-lineup.jpg.asset.json";
import { CarnivalHero } from "@/components/carnival-hero";
import { CarnivalTimer } from "@/components/carnival-timer";

const featuredQuery = queryOptions({
  queryKey: ["products", "featured"],
  queryFn: () => listProducts({ data: { featured: true } }),
});
const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: () => listCategories(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noyis Africa — Antigua Carnival 2026 Wellness, Stamina & Recovery" },
      {
        name: "description",
        content:
          "Antigua Carnival 2026 stamina, hydration and J'ouvert recovery from Noyis Africa. Treasure Man, Treasure Woman & Treasure Herbs — natural detox teas in St. John's, with WhatsApp ordering and Caribbean delivery.",
      },
      { property: "og:title", content: "Noyis Africa — Caribbean Wellness & Wholesale" },
      { property: "og:description", content: "Herbal formulas, functional coffees and wholesale beverages from Antigua. Your Health, Our Priority." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(featuredQuery),
      context.queryClient.ensureQueryData(categoriesQuery),
    ]);
  },
  component: HomePage,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Not found.</div>,
});

function HomePage() {
  const { lang } = useLang();
  const { data: featured } = useSuspenseQuery(featuredQuery);
  const { data: categories } = useSuspenseQuery(categoriesQuery);
  const [divisionsExpanded, setDivisionsExpanded] = useState(false);

  const divisions = [
    { icon: Leaf, title: tr("div_wellness_title", lang), body: tr("div_wellness_body", lang), to: "/products" as const, search: { cat: "natural-wellness" } },
    { icon: Package, title: tr("div_beverages_title", lang), body: tr("div_beverages_body", lang), to: "/products" as const, search: { cat: "commercial-beverages" } },
    { icon: Truck, title: tr("div_wholesale_title", lang), body: tr("div_wholesale_body", lang), to: "/wholesale" as const, search: undefined },
    { icon: Globe2, title: tr("div_cuisine_title", lang), body: tr("div_cuisine_body", lang), to: "/contact" as const, search: undefined },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      {/* HERO — Carnival 2026 slider */}
      <CarnivalHero />

      {/* CARNIVAL COUNTDOWN — sticky high-visibility bar */}
      <CarnivalTimer />

      {/* WHO WE ARE — desktop only */}
      <section className="hidden bg-background py-14 sm:py-16 md:block">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Noyis Africa</p>
            <h2 className="mt-2 font-display text-3xl text-botanical sm:text-4xl">{tr("who_title", lang)}</h2>
          </div>
          <p className="text-base text-muted-foreground lg:col-span-2">{tr("who_body", lang)}</p>
        </div>
      </section>

      {/* OUR DIVISIONS — mobile shows 2 with Load More */}
      <section className="border-y border-border bg-sand py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl text-botanical sm:text-4xl">{tr("divisions_title", lang)}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:mt-8">
            {divisions.map((d, i) => {
              const hideOnMobile = !divisionsExpanded && i >= 2;
              return (
                <Link
                  key={i}
                  to={d.to}
                  search={d.search as never}
                  className={`group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-card ${hideOnMobile ? "hidden md:flex" : ""}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg text-botanical">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.body}</p>
                </Link>
              );
            })}
          </div>
          {divisions.length > 2 && (
            <div className="mt-5 flex justify-center md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDivisionsExpanded((v) => !v)}
                aria-expanded={divisionsExpanded}
                className="border-botanical/30 text-botanical"
              >
                {divisionsExpanded ? tr("show_less", lang) : tr("load_more", lang)}
                <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform ${divisionsExpanded ? "rotate-180" : ""}`} />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* SMART CATEGORY SELECTOR — mobile 1-col swipe carousel */}
      <section className="border-y border-border bg-sand py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl text-botanical sm:text-3xl">{tr("smart_title", lang)}</h2>
          {/* Mobile: snap carousel */}
          <div className="mt-6 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/products"
                search={{ cat: c.slug }}
                className="group flex w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {c.slug === "natural-wellness" && <Leaf className="h-5 w-5" />}
                  {c.slug === "commercial-beverages" && <Package className="h-5 w-5" />}
                  {c.slug === "wholesale-supplies" && <Truck className="h-5 w-5" />}
                  {c.slug === "retail-essentials" && <ShieldCheck className="h-5 w-5" />}
                </div>
                <h3 className="mt-4 font-display text-lg text-botanical">{localized(c.name_localized, lang)}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {localized(c.description_localized, lang)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {tr("view_all", lang)} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
          {/* Desktop: 4-col grid */}
          <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/products"
                search={{ cat: c.slug }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {c.slug === "natural-wellness" && <Leaf className="h-5 w-5" />}
                  {c.slug === "commercial-beverages" && <Package className="h-5 w-5" />}
                  {c.slug === "wholesale-supplies" && <Truck className="h-5 w-5" />}
                  {c.slug === "retail-essentials" && <ShieldCheck className="h-5 w-5" />}
                </div>
                <h3 className="mt-4 font-display text-lg text-botanical">{localized(c.name_localized, lang)}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {localized(c.description_localized, lang)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  {tr("view_all", lang)} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-background py-10 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Treasure Collection</p>
              <h2 className="mt-2 font-display text-2xl text-botanical sm:text-4xl">{tr("featured_title", lang)}</h2>
            </div>
            <Link to="/products" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
              {tr("view_all", lang)} →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* TREASURE LINEUP BANNER */}
      <section className="bg-gradient-botanical py-12 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              Your Health, Our Priority
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-4xl">
              Treasure Man · Treasure Herbs · Treasure Woman
            </h2>
            <p className="mt-4 text-white/85">
              Three 100% natural herbal formulas crafted with African botanicals. Trusted across Antigua, the
              Caribbean and beyond for vitality, balance and everyday wellness.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/treasure">Explore the Treasure collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <Link to="/products" search={{ cat: "natural-wellness" }}>Shop all products</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-elevated">
            <img src={lineup.url} alt="Treasure Man, Treasure Herbs and Treasure Woman herbal formulas" className="w-full" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CUSTOMER EXPERIENCES — mobile single slider, desktop grid */}
      <section className="bg-background py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl text-botanical sm:text-4xl">{tr("experiences_title", lang)}</h2>
            <p className="mt-2 text-muted-foreground">{tr("experiences_sub", lang)}</p>
          </div>
          {/* Mobile: single snap slider */}
          <div className="mt-6 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden">
            {[tr("exp_1", lang), tr("exp_2", lang), tr("exp_3", lang)].map((quote, i) => (
              <figure key={i} className="w-[88%] shrink-0 snap-center rounded-2xl border border-border bg-card p-5 shadow-soft">
                <blockquote className="text-sm text-foreground">{quote}</blockquote>
              </figure>
            ))}
          </div>
          {/* Desktop: 3-col grid */}
          <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-3">
            {[tr("exp_1", lang), tr("exp_2", lang), tr("exp_3", lang)].map((quote, i) => (
              <figure key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <blockquote className="text-sm text-foreground">{quote}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOYIS — hidden on mobile to reduce scroll */}
      <section className="hidden bg-sand py-16 sm:py-20 md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl text-botanical sm:text-4xl">{tr("why_title", lang)}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Truck, label: tr("why_distribution", lang) },
              { icon: Leaf, label: tr("why_premium", lang) },
              { icon: Package, label: tr("why_wholesale", lang) },
              { icon: Globe2, label: tr("why_shipping", lang) },
              { icon: MessageCircle, label: tr("why_language", lang) },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <SiteFooter />
    </div>
  );
}
