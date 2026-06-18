import { tr, type Lang } from "./i18n";

export const WHATSAPP_NUMBERS = ["12687210101", "12687700171"];
export const PRIMARY_WHATSAPP = WHATSAPP_NUMBERS[0];

export interface CartLine {
  slug: string;
  name: string;
  qty: number;
  price_usd?: number | null;
}

export function buildWhatsAppMessage(lines: CartLine[], lang: Lang): string {
  const intro = tr("whatsapp_intro", lang);
  const items = lines.map((l) => `• ${l.qty} x ${l.name}`).join("\n");
  const outro = tr("whatsapp_outro", lang);
  return `${intro}\n${items}${outro}`;
}

export function whatsAppUrl(message: string, number: string = PRIMARY_WHATSAPP): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
