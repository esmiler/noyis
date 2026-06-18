import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Check, Leaf, ShoppingCart, AlertCircle } from "lucide-react";
import { getProduct } from "@/lib/products.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLang } from "@/components/lang-context";
import { localized, tr } from "@/lib/i18n";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

function productQuery(slug: string) {
  return queryOptions({ queryKey: ["product", slug], queryFn: () => getProduct({ data: { slug } }) });
}

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(productQuery(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    const name = (loaderData?.name_localized as Record<string, string> | undefined)?.en ?? params.slug.replace(/-/g, " ");
    const desc =
      (loaderData?.short_description_localized as Record<string, string> | undefined)?.en ??
      `${name} from Noyis Africa — premium Caribbean wellness and wholesale.`;
    const image = loaderData?.hero_image ?? undefined;
    return {
      meta: [
        { title: `${name} — Noyis Africa` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Noyis Africa` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    };
  },
  component: ProductPage,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-display text-botanical">Product not found</p>
        <Link to="/products" className="mt-4 inline-block text-primary hover:underline">Back to catalog</Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { lang } = useLang();
  const { add } = useCart();
  const { data: p } = useSuspenseQuery(productQuery(slug));
  if (!p) return null;

  const name = localized(p.name_localized, lang);
  const short = localized(p.short_description_localized, lang);
  const long = localized(p.long_description_localized, lang);
  const usage = localized(p.usage_localized, lang);
  const warnings = localized(p.warnings_localized, lang);
  const benefits = Array.isArray(p.benefits) ? (p.benefits as string[]) : [];
  const ingredients = Array.isArray(p.ingredients) ? (p.ingredients as string[]) : [];
  const inStock = p.stock_status === "in_stock";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: short,
    ...(p.hero_image ? { image: p.hero_image } : {}),
    brand: { "@type": "Brand", name: "Noyis Africa" },
    countryOfOrigin: p.country_of_origin,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> · <Link to="/products" className="hover:text-primary">{tr("nav_products", lang)}</Link> · <span className="text-foreground">{name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sand to-stone shadow-card">
            {p.hero_image ? (
              <img src={p.hero_image} alt={name} className="h-full w-full object-cover" />
            ) : (
              <Leaf className="h-32 w-32 text-primary/30" />
            )}
            {p.is_wholesale && (
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-foreground">
                Wholesale
              </span>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Noyis Africa</p>
            <h1 className="mt-2 font-display text-4xl text-botanical">{name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{short}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-botanical">
                {tr("price_on_request", lang)}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${inStock ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}
              >
                <Check className="h-3.5 w-3.5" /> {inStock ? tr("in_stock", lang) : tr("out_of_stock", lang)}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{tr("cart_quote_note", lang)}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {inStock ? (
                <Button
                  size="lg"
                  onClick={() => add({ slug: p.slug, name, price_usd: null })}
                  className="bg-primary text-primary-foreground hover:bg-botanical"
                >
                  <ShoppingCart className="h-4 w-4" /> {tr("add_to_cart", lang)}
                </Button>
              ) : (
                <Button asChild size="lg" variant="outline">
                  <a href={`https://wa.me/12687210101?text=${encodeURIComponent(`Hello, is ${name} available?`)}`} target="_blank" rel="noreferrer">
                    {tr("contact_for_availability", lang)}
                  </a>
                </Button>
              )}
            </div>

            {long && <p className="mt-8 leading-relaxed text-foreground/85">{long}</p>}

            {benefits.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-xl text-botanical">{tr("product_benefits", lang)}</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ingredients.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-xl text-botanical">{tr("product_ingredients", lang)}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{ingredients.join(" · ")}</p>
              </div>
            )}

            {usage && (
              <div className="mt-6">
                <h2 className="font-display text-xl text-botanical">{tr("product_usage", lang)}</h2>
                <p className="mt-2 text-sm text-foreground/85 whitespace-pre-line">{usage}</p>
              </div>
            )}

            {warnings && (
              <div className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-gold-foreground">{tr("product_warnings", lang)}</p>
                    <p className="mt-1 text-sm text-foreground/85">{warnings}</p>
                  </div>
                </div>
              </div>
            )}

            {p.country_of_origin && (
              <p className="mt-6 text-xs text-muted-foreground">
                {tr("product_origin", lang)}: {p.botanical_origin ? `${p.botanical_origin} · ` : ""}{p.country_of_origin}
              </p>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
