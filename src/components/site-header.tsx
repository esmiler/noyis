import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X, Globe, Phone } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/noyis-africa-logo.png.asset.json";
import { useLang } from "./lang-context";
import { LANG_LABELS, SUPPORTED_LANGS, tr, type Lang } from "@/lib/i18n";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { PRIMARY_WHATSAPP } from "@/lib/whatsapp";
import { CartSheet } from "./cart-sheet";

export function SiteHeader() {
  const { lang, setLang } = useLang();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navItems: { label: string; to: string }[] = [
    { label: tr("nav_wellness", lang), to: "/products?cat=natural-wellness" },
    { label: tr("nav_beverages", lang), to: "/products?cat=commercial-beverages" },
    { label: tr("nav_wholesale", lang), to: "/wholesale" },
    { label: tr("nav_guides", lang), to: "/guides" },
    { label: tr("nav_locator", lang), to: "/store-locator" },
    { label: tr("nav_contact", lang), to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center">
          <img src={logoAsset.url} alt="Noyis Africa" className="h-24 w-auto object-contain sm:h-28" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to as string}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
              aria-label="Language"
              className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium text-foreground"
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
            >
              {SUPPORTED_LANGS.map((l) => (
                <option key={l} value={l}>
                  {LANG_LABELS[l]}
                </option>
              ))}
            </select>
          </div>

          <a
            href={`https://wa.me/${PRIMARY_WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-botanical sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" /> WhatsApp
          </a>

          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
            aria-label={tr("cart", lang)}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-gold-foreground">
                {count}
              </span>
            )}
          </button>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to as string}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 px-3 py-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <select
                aria-label="Language"
                className="flex-1 rounded-md border border-input bg-background px-2 py-1.5 text-sm"
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
              >
                {SUPPORTED_LANGS.map((l) => (
                  <option key={l} value={l}>
                    {LANG_LABELS[l]}
                  </option>
                ))}
              </select>
            </div>
          </nav>
        </div>
      )}

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
