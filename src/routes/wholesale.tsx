import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Truck, Package, Globe2, MessageCircle } from "lucide-react";
import { listProducts } from "@/lib/products.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

const wholesaleQuery = queryOptions({
  queryKey: ["products", { wholesale: true }],
  queryFn: () => listProducts({ data: { wholesale: true } }),
});

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Distribution — Noyis Africa" },
      { name: "description", content: "Bulk cartons and pallets of Coca-Cola, Malta, juices and Caribbean wellness products. Supplying distributors and retailers across the Caribbean." },
    ],
  }),
  loader: async ({ context }) => context.queryClient.ensureQueryData(wholesaleQuery),
  component: WholesalePage,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Not found.</div>,
});

function WholesalePage() {
  const { data: products } = useSuspenseQuery(wholesaleQuery);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <section className="bg-gradient-botanical py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              <Truck className="h-3.5 w-3.5" /> Caribbean Distribution
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">
              Wholesale supply for distributors, retailers &amp; resellers
            </h1>
            <p className="mt-4 text-lg text-white/85">
              Cartons and pallets of Coca-Cola, Malta, juices, herbal wellness products and Caribbean essentials —
              delivered across Antigua, the Caribbean, the US, Canada and Latin America.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <a href="https://wa.me/12687210101?text=Hello%20Noyis%20Africa%2C%20I%27d%20like%20a%20wholesale%20quote." target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> Request a wholesale quote
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <Link to="/contact">Contact our team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Package, title: "Cartons & pallets", body: "Buy by the carton, the pallet or full container — pricing scales with volume." },
            { icon: Truck, title: "Caribbean logistics", body: "Direct delivery in Antigua, freight forwarding across the region." },
            { icon: Globe2, title: "International orders", body: "We support international resellers in the US, Canada and Latin America." },
          ].map((b, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-xl text-botanical">{b.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl text-botanical sm:text-3xl">Available wholesale stock</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
