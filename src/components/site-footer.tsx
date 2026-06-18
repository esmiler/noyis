import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail } from "lucide-react";
import { useLang } from "./lang-context";
import { tr } from "@/lib/i18n";
import logoAsset from "@/assets/noyis-africa-logo.png.asset.json";

export function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-border bg-botanical text-botanical-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-12 w-12 rounded-full bg-white p-1" />
            <div>
              <p className="font-display text-xl font-semibold">Noyis Africa</p>
              <p className="text-sm text-botanical-foreground/70">{tr("footer_tagline", lang)}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-botanical-foreground/75">
            Wholesale &amp; retail warehouse for natural wellness, herbal formulas and Caribbean beverages.
            Shipping across Antigua, the Caribbean, the US, Canada and Latin America.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-gold">{tr("nav_products", lang)}</Link></li>
            <li><Link to="/products" search={{ cat: "natural-wellness" }} className="hover:text-gold">{tr("nav_wellness", lang)}</Link></li>
            <li><Link to="/products" search={{ cat: "commercial-beverages" }} className="hover:text-gold">{tr("nav_beverages", lang)}</Link></li>
            <li><Link to="/wholesale" className="hover:text-gold">{tr("nav_wholesale", lang)}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Visit / Contact</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Lower Nevis Street, St. John&apos;s, Antigua &amp; Barbuda</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href="tel:+12687210101" className="hover:text-gold">+1 (268) 721-0101</a></li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href="tel:+12687700171" className="hover:text-gold">+1 (268) 770-0171</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> noyisafrica.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-botanical-foreground/60">
        © {new Date().getFullYear()} Noyis Africa · {tr("footer_tagline", lang)}
      </div>
    </footer>
  );
}
