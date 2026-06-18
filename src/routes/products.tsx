import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { listProducts, listCategories } from "@/lib/products.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { useLang } from "@/components/lang-context";
import { localized, tr } from "@/lib/i18n";

const searchSchema = z.object({
  cat: z.string().optional(),
  wholesale: z.coerce.boolean().optional(),
  q: z.string().optional(),
});

function makeQuery(args: { category?: string; wholesale?: boolean }) {
  return queryOptions({
    queryKey: ["products", args],
    queryFn: () => listProducts({ data: args }),
  });
}
const catsQuery = queryOptions({ queryKey: ["categories"], queryFn: () => listCategories() });

export const Route = createFileRoute("/products")({
  validateSearch: (s) => searchSchema.parse(s),
  loaderDeps: ({ search }) => ({ cat: search.cat, wholesale: search.wholesale }),
  loader: async ({ context, deps }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(makeQuery({ category: deps.cat, wholesale: deps.wholesale })),
      context.queryClient.ensureQueryData(catsQuery),
    ]);
  },
  head: () => ({
    meta: [
      { title: "All Products — Noyis Africa" },
      { name: "description", content: "Browse herbal wellness formulas, functional beverages and wholesale cartons from Noyis Africa." },
    ],
  }),
  component: ProductsPage,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">No products found.</div>,
});

function ProductsPage() {
  const { lang } = useLang();
  const { cat, wholesale, q } = Route.useSearch();
  const { data: products } = useSuspenseQuery(makeQuery({ category: cat, wholesale }));
  const { data: cats } = useSuspenseQuery(catsQuery);
  const activeCat = cats.find((c) => c.slug === cat);
  const query = (q ?? "").toLowerCase();
  const filtered = query
    ? products.filter((p) => {
        const name = localized(p.name_localized, lang).toLowerCase();
        const short = localized(p.short_description_localized, lang).toLowerCase();
        return name.includes(query) || short.includes(query) || (p.tags ?? []).some((t) => t.includes(query));
      })
    : products;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <section className="bg-gradient-sand py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="font-display text-3xl text-botanical sm:text-4xl">
            {activeCat ? localized(activeCat.name_localized, lang) : tr("nav_products", lang)}
          </h1>
          {activeCat && (
            <p className="mt-2 max-w-2xl text-muted-foreground">{localized(activeCat.description_localized, lang)}</p>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            to="/products"
            search={{}}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}
          >
            {tr("view_all", lang)}
          </Link>
          {cats.map((c) => (
            <Link
              key={c.id}
              to="/products"
              search={{ cat: c.slug }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${cat === c.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}
            >
              {localized(c.name_localized, lang)}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">No products yet in this category.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
