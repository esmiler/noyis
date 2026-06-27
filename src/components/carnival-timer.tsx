import { useEffect, useState } from "react";
import { Sparkles, AlertTriangle } from "lucide-react";
import { tr } from "@/lib/i18n";
import { useLang } from "./lang-context";

const CARNIVAL_START = new Date("2026-07-25T00:00:00-04:00");
const CARNIVAL_END = new Date("2026-08-04T23:59:59-04:00");
const ORDER_DEADLINE = new Date("2026-07-20T23:59:59-04:00");

function daysBetween(from: Date, to: Date) {
  return Math.max(0, Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
}

export function CarnivalTimer() {
  const { lang } = useLang();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const isAfter = now.getTime() > CARNIVAL_END.getTime();
  const isDuring = now.getTime() >= CARNIVAL_START.getTime() && !isAfter;
  const days = daysBetween(now, CARNIVAL_START);

  if (isAfter) {
    return (
      <div className="sticky top-20 z-30 border-y border-gold/40 bg-gradient-to-r from-botanical via-botanical/95 to-botanical text-white shadow-soft">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
          <Sparkles className="h-5 w-5 shrink-0 text-gold" aria-hidden />
          <p className="text-xs font-medium leading-snug sm:text-sm">
            {tr("carnival_post", lang)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Antigua Carnival 2026 countdown"
      className="sticky top-20 z-30 border-y border-gold/40 bg-gradient-to-r from-gold via-gold/95 to-gold text-gold-foreground shadow-soft"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
        <p className="text-xs font-semibold leading-snug sm:text-sm">
          {isDuring
            ? tr("carnival_live", lang)
            : tr("carnival_count", lang).replace("{days}", String(days))}
        </p>
        <p className="flex items-center gap-1.5 text-[11px] font-medium leading-snug text-gold-foreground/85 sm:text-xs">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {tr("carnival_deadline", lang)}
        </p>
      </div>
    </div>
  );
}
