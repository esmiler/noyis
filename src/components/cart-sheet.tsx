import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { useLang } from "./lang-context";
import { tr } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { buildWhatsAppMessage, whatsAppUrl } from "@/lib/whatsapp";

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { items, setQty, remove, clear, total } = useCart();
  const { lang } = useLang();

  const handleSend = () => {
    if (!items.length) return;
    const msg = buildWhatsAppMessage(
      items.map((i) => ({ slug: i.slug, name: i.name, qty: i.qty, price_usd: i.price_usd })),
      lang,
    );
    window.open(whatsAppUrl(msg), "_blank", "noopener");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="font-display text-2xl text-botanical">{tr("cart", lang)}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">{tr("cart_empty", lang)}</p>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.slug} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{i.name}</p>
                      {i.price_usd ? (
                        <p className="text-sm text-muted-foreground">USD ${i.price_usd.toFixed(2)}</p>
                      ) : null}
                    </div>
                    <button
                      onClick={() => remove(i.slug)}
                      aria-label="Remove"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => setQty(i.slug, i.qty - 1)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary hover:bg-accent"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{i.qty}</span>
                    <button
                      onClick={() => setQty(i.slug, i.qty + 1)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary hover:bg-accent"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-sand px-6 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total (USD)</span>
              <span className="font-display text-xl text-botanical">${total.toFixed(2)}</span>
            </div>
            <Button onClick={handleSend} className="w-full bg-primary text-primary-foreground hover:bg-botanical">
              {tr("cart_send_whatsapp", lang)}
            </Button>
            <button
              onClick={clear}
              className="mt-2 w-full text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              {tr("cart_clear", lang)}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
