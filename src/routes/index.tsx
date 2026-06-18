import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Leaf, Truck, Package, Globe2, MessageCircle, ShieldCheck } from "lucide-react";
import { listProducts, listCategories } from "@/lib/products.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { useLang } from "@/components/lang-context";
import { localized, tr } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import storefront from "@/assets/noyis-storefront.png.asset.json";
import lineup from "@/assets/noyis-treasure-lineup.jpg.asset.json";

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
      { title: "Noyis Africa — Natural Wellness & Wholesale Beverages in the Caribbean" },
      {
        name: "description",
        content:
          "Premium herbal formulas (Treasure Man, Treasure Woman, Treasure Herbs), functional coffees and wholesale beverages from Antigua & Barbuda. WhatsApp ordering, Caribbean delivery.",
      },
    ],
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={storefront.url} alt="Noyis Africa warehouse storefront in St. John's, Antigua" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-botanical/95 via-botanical/80 to-botanical/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              <Leaf className="h-3.5 w-3.5" /> 100% Natural · Caribbean Distribution
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {tr("hero_title", lang)}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">{tr("hero_sub", lang)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/products" search={{ cat: "natural-wellness" }}>
                  {tr("hero_cta_wellness", lang)} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                <Link to="/products" search={{ cat: "commercial-beverages" }}>{tr("hero_cta_beverages", lang)}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                <Link to="/wholesale">{tr("hero_cta_wholesale", lang)}</Link>
              </Button>
              <a
                href="https://wa.me/12687210101"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" /> {tr("hero_cta_whatsapp", lang)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SMART CATEGORY SELECTOR */}
      <section className="border-y border-border bg-sand py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl text-botanical sm:text-3xl">{tr("smart_title", lang)}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Treasure Collection</p>
              <h2 className="mt-2 font-display text-3xl text-botanical sm:text-4xl">{tr("featured_title", lang)}</h2>
            </div>
            <Link to="/products" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
              {tr("view_all", lang)} →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* TREASURE LINEUP BANNER */}
      <section className="bg-gradient-botanical py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              Your Health, Our Priority
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
              Treasure Man · Treasure Herbs · Treasure Woman
            </h2>
            <p className="mt-4 text-white/85">
              Three 100% natural herbal formulas crafted with African botanicals. Trusted across Antigua, the
              Caribbean and beyond for vitality, balance and everyday wellness.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/products" search={{ cat: "natural-wellness" }}>Shop the collection</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-elevated">
            <img src={lineup.url} alt="Treasure Man, Treasure Herbs and Treasure Woman herbal formulas" className="w-full" loading="lazy" />
          </div>
        </div>
      </section>

      {/* WHY NOYIS */}
      <section className="bg-sand py-16 sm:py-20">
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
