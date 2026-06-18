import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Noyis Africa" },
      { name: "description", content: "Reach Noyis Africa in St. John's, Antigua via WhatsApp, phone or in-store. Wholesale and retail inquiries welcome." },
      { property: "og:title", content: "Contact Noyis Africa" },
      { property: "og:description", content: "Reach us via WhatsApp, phone or in-store in St. John's, Antigua." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Not found.</div>,
});

function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <section className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-4xl text-botanical">Contact Noyis Africa</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          WhatsApp is the fastest way to reach us — order placement, wholesale quotes, product availability.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="https://wa.me/12687210101"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">WhatsApp</p>
              <p className="font-display text-lg text-botanical">+1 (268) 721-0101</p>
            </div>
          </a>
          <a
            href="https://wa.me/12687700171"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">WhatsApp</p>
              <p className="font-display text-lg text-botanical">+1 (268) 770-0171</p>
            </div>
          </a>
          <a href="tel:+12687210101" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Call</p>
              <p className="font-display text-lg text-botanical">+1 (268) 721-0101</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Visit</p>
              <p className="font-display text-lg text-botanical">Lower Nevis Street, St. John&apos;s</p>
              <p className="text-xs text-muted-foreground">Near Cherry Jamdon Club, Antigua &amp; Barbuda</p>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-card">
          <iframe
            title="Noyis Africa location"
            src="https://www.google.com/maps?q=Lower+Nevis+Street,+St.+John's,+Antigua&output=embed"
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
