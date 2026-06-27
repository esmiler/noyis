import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { PRIMARY_WHATSAPP, whatsAppUrl } from "@/lib/whatsapp";
import { tr } from "@/lib/i18n";
import { useLang } from "./lang-context";

const STORAGE_KEY = "noyis-wa-widget-hidden-until";
const HIDE_MS = 5 * 60 * 1000;

export function WhatsAppWidget() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const until = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (Date.now() < until) {
      setVisible(false);
      const t = setTimeout(() => setVisible(true), until - Date.now());
      return () => clearTimeout(t);
    }
    setVisible(true);
    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setCountry(d?.country_name || ""))
      .catch(() => {});
  }, []);

  if (!visible) return null;

  const region = country || "my region";
  const msg = `Hi Noyis Africa! I am browsing the web platform from ${region} and would love to ask a quick question.`;
  const href = whatsAppUrl(msg, PRIMARY_WHATSAPP);

  const dismiss = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + HIDE_MS));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-2">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={tr("wa_widget_label", lang)}
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
        <MessageCircle className="h-7 w-7" />
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-gold" />
      </a>
      <button
        onClick={dismiss}
        aria-label="Hide WhatsApp widget"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-foreground/70 shadow-soft hover:bg-secondary"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
