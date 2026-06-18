import { Link } from "@tanstack/react-router";
import { Leaf, ShoppingCart } from "lucide-react";
import { useLang } from "./lang-context";
import { localized, tr } from "@/lib/i18n";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

export interface ProductLike {
  slug: string;
  name_localized: unknown;
  short_description_localized: unknown;
  hero_image: string | null;
  pricing_usd: number | null;
  pricing_xcd?: number | null;
  stock_status: string;
  is_wholesale: boolean;
  benefits?: unknown;
}

export function ProductCard({ product }: { product: ProductLike }) {
  const { lang } = useLang();
  const { add } = useCart();
  const name = localized(product.name_localized, lang);
  const short = localized(product.short_description_localized, lang);
  const inStock = product.stock_status === "in_stock";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-sand to-stone">
          {product.hero_image ? (
            <img src={product.hero_image} alt={name} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <Leaf className="h-16 w-16 text-primary/40" aria-hidden />
          )}
          {product.is_wholesale && (
            <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
              Wholesale
            </span>
          )}
          {!inStock && (
            <span className="absolute right-3 top-3 rounded-full bg-destructive/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
              {tr("out_of_stock", lang)}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
          <h3 className="font-display text-lg leading-tight text-botanical group-hover:text-primary">
            {name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{short}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {tr("price_on_request", lang)}
          </p>

          {inStock ? (
            <Button
              size="sm"
              onClick={() =>
                add({ slug: product.slug, name, price_usd: null })
              }
              className="bg-primary text-primary-foreground hover:bg-botanical"
              aria-label={tr("add_to_cart", lang)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" variant="outline" asChild>
              <a href={`https://wa.me/12687210101?text=${encodeURIComponent(`Hello, is ${name} available?`)}`} target="_blank" rel="noreferrer">
                {tr("contact_for_availability", lang)}
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
