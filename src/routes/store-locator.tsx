import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import storefront from "@/assets/noyis-storefront.png.asset.json";

export const Route = createFileRoute("/store-locator")({
  head: () => ({
    meta: [
      { title: "Visit Our Warehouse — Noyis Africa, Antigua" },
      { name: "description", content: "Find Noyis Africa wholesale & retail warehouse on Lower Nevis Street, St. John's, Antigua. Business hours, directions, contact." },
      { property: "og:title", content: "Visit Our Warehouse — Noyis Africa" },
      { property: "og:description", content: "Lower Nevis Street, St. John's, Antigua. Business hours, directions, contact." },
      { property: "og:url", content: "/store-locator" },
    ],
    links: [{ rel: "canonical", href: "/store-locator" }],
  }),
  component: LocatorPage,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Not found.</div>,
});

function LocatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-4xl text-botanical">Visit our warehouse</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Lower Nevis Street, St. John&apos;s, Antigua &amp; Barbuda — near Cherry Jamdon Club. Walk in for retail,
          or pre-arrange a wholesale pickup.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <img src={storefront.url} alt="Noyis Africa warehouse storefront" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">Lower Nevis Street, St. John&apos;s, Antigua &amp; Barbuda</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Lower+Nevis+Street,+St.+John%27s,+Antigua"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    Get directions →
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Business hours</p>
                  <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                    <li>Mon – Fri: 8:00 AM – 7:00 PM</li>
                    <li>Saturday: 8:00 AM – 6:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a href="tel:+12687210101" className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground hover:bg-accent">
                <Phone className="h-4 w-4" /> +1 (268) 721-0101
              </a>
              <a href="https://wa.me/12687210101" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-botanical">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-card">
          <iframe
            title="Noyis Africa map"
            src="https://www.google.com/maps?q=Lower+Nevis+Street,+St.+John's,+Antigua&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
          />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
