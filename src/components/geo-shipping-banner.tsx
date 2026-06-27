import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { tr } from "@/lib/i18n";
import { useLang } from "./lang-context";

const STORAGE_KEY = "noyis-shipping-dismissed";

type Region = "us_ca" | "caribbean" | "latam" | "global";

const CARIBBEAN = new Set([
  "AG", "AI", "AW", "BB", "BS", "BZ", "CU", "CW", "DM", "DO", "GD", "GP", "HT",
  "JM", "KN", "KY", "LC", "MQ", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI",
  "BM", "GY", "SR",
]);
const LATAM = new Set([
  "AR", "BO", "BR", "CL", "CO", "CR", "EC", "GT", "HN", "MX", "NI", "PA",
  "PE", "PY", "SV", "UY", "VE",
]);

function regionFor(country: string | null | undefined): Region {
  if (!country) return "global";
  const c = country.toUpperCase();
  if (c === "US" || c === "CA") return "us_ca";
  if (CARIBBEAN.has(c)) return "caribbean";
  if (LATAM.has(c)) return "latam";
  return "global";
}

export function GeoShippingBanner() {
  const { lang } = useLang();
  const [region, setRegion] = useState<Region | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    setDismissed(false);
    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled) return;
        setRegion(regionFor(d?.country_code ?? d?.country));
      })
      .catch(() => {
        if (!cancelled) setRegion("global");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (dismissed || !region) return null;

  const key =
    region === "us_ca"
      ? "ship_us_ca"
      : region === "caribbean"
        ? "ship_caribbean"
        : region === "latam"
          ? "ship_latam"
          : "ship_global";

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <div className="relative bg-botanical text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 pr-10 sm:px-6">
        <p className="flex-1 text-center text-[12px] font-medium leading-snug sm:text-sm">
          {tr(key, lang)}
        </p>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss shipping banner"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
