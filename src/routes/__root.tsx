import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LangProvider } from "@/components/lang-context";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-botanical">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-botanical"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-botanical"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Noyis Africa — Natural Wellness & Wholesale Distribution in the Caribbean" },
      {
        name: "description",
        content:
          "Premium herbal formulas, functional coffees, therapeutic oils and wholesale beverage distribution from Antigua & Barbuda. Your Health, Our Priority.",
      },
      { name: "author", content: "Noyis Africa" },
      { name: "theme-color", content: "#1B5E20" },
      { property: "og:site_name", content: "Noyis Africa" },
      { property: "og:title", content: "Noyis Africa — Natural Wellness & Wholesale Distribution in the Caribbean" },
      { property: "og:description", content: "Noyis Discover is a global visibility-first commerce platform for product discovery and WhatsApp-based ordering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Noyis Africa — Natural Wellness & Wholesale Distribution in the Caribbean" },
      { name: "description", content: "Noyis Discover is a global visibility-first commerce platform for product discovery and WhatsApp-based ordering." },
      { name: "twitter:description", content: "Noyis Discover is a global visibility-first commerce platform for product discovery and WhatsApp-based ordering." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/baa700c2-899b-4ce0-8faf-04c8d3fb6be2/id-preview-285c4aae--c2a009fe-1583-496f-92d0-360688840a19.lovable.app-1781749935041.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/baa700c2-899b-4ce0-8faf-04c8d3fb6be2/id-preview-285c4aae--c2a009fe-1583-496f-92d0-360688840a19.lovable.app-1781749935041.png" },
      { name: "geo.region", content: "AG" },
      { name: "geo.placename", content: "St. John's, Antigua and Barbuda" },
      { name: "geo.position", content: "17.1175;-61.8456" },
      { name: "ICBM", content: "17.1175, -61.8456" },
      { name: "google-site-verification", content: "0vkyCmUgk4a_xbT-KMU23DbnQeNFGzT-9Fw0gJ1u49w" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "alternate", hrefLang: "en", href: "https://noyisafrica.com" },
      { rel: "alternate", hrefLang: "es", href: "https://noyisafrica.com" },
      { rel: "alternate", hrefLang: "fr", href: "https://noyisafrica.com" },
      { rel: "alternate", hrefLang: "pt", href: "https://noyisafrica.com" },
      { rel: "alternate", hrefLang: "x-default", href: "https://noyisafrica.com" },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Noyis Africa",
              url: "https://noyisafrica.com",
              slogan: "Your Health, Our Priority",
              sameAs: [],
            },
            {
              "@type": "LocalBusiness",
              name: "Noyis Africa Wholesale & Retail Warehouse",
              image: "/__l5e/assets-v1/96046073-86a4-4f89-95f5-cd4e6c5c92cd/noyis-storefront.png",
              telephone: "+1-268-721-0101",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Lower Nevis Street",
                addressLocality: "St. John's",
                addressCountry: "AG",
              },
              areaServed: ["Antigua & Barbuda", "Caribbean", "United States", "Canada", "Latin America"],
            },
            {
              "@type": "WebSite",
              name: "Noyis Africa",
              url: "https://noyisafrica.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://noyisafrica.com/products?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "Event",
              name: "Antigua Carnival 2026",
              startDate: "2026-07-25",
              endDate: "2026-08-04",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "St. John's, Antigua",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "St. John's",
                  addressCountry: "AG",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Noyis Africa",
                url: "https://noyisafrica.com",
              },
              description:
                "Noyis Africa supports Antigua Carnival 2026 with natural stamina, hydration and J'ouvert recovery formulas — Treasure Man, Treasure Woman and Treasure Herbs — available at Lower Nevis Street, St. John's.",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <Outlet />
      </LangProvider>
    </QueryClientProvider>
  );
}
