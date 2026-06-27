import { Link } from "@tanstack/react-router";
import { Leaf, MessageCircle, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "./lang-context";
import { localized, tr } from "@/lib/i18n";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { PRIMARY_WHATSAPP, whatsAppUrl } from "@/lib/whatsapp";

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

  const [region, setRegion] = useState<string>("");
  useEffect(() => {
    const cached = typeof window !== "undefined" ? sessionStorage.getItem("noyis-country") : null;
    if (cached) { setRegion(cached); return; }
    fetch("https://ipapi.co/country_name/")
      .then((r) => (r.ok ? r.text() : ""))
      .then((c) => {
        const cc = (c || "").trim();
        if (cc) { setRegion(cc); sessionStorage.setItem("noyis-country", cc); }
      })
      .catch(() => {});
  }, []);

  const waUrl = whatsAppUrl(
    `Hi Noyis, I would like to quickly order ${name} for delivery to ${region || "my region"}.`,
    PRIMARY_WHATSAPP,
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-sand to-stone">
          {product.hero_image ? (
            <img src={product.hero_image} alt={name} className="h-full w-full object-contain p-4" loading="lazy" />
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
          <h2 className="font-display text-lg leading-tight text-botanical group-hover:text-primary">
            {name}
          </h2>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{short}</p>

        <div className="mt-auto flex flex-col gap-2 pt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {tr("price_on_request", lang)}
          </p>
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="flex-1 bg-[#25D366] text-white hover:bg-[#1DA851]"
            >
              <a href={waUrl} target="_blank" rel="noreferrer" aria-label={`${tr("order_via_whatsapp", lang)} — ${name}`}>
                <MessageCircle className="mr-1.5 h-4 w-4" />
                {tr("order_via_whatsapp", lang)}
              </a>
            </Button>
            {inStock && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => add({ slug: product.slug, name, price_usd: null })}
                className="border-gold/60 text-botanical hover:bg-gold/10"
                aria-label={tr("add_to_cart", lang)}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
