## What's already in place

- **Sitemap**: live at `/sitemap.xml` (server route), lists `/`, `/treasure`, all products and guides — ready to submit to Google Search Console.
- **robots.txt**: allows all crawlers (Google, Bing, GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
- **Structured data**: `Organization` + `LocalBusiness` (Lower Nevis Street, St. John's, AG) + `WebSite` JSON-LD already on every page via `__root.tsx`. Treasure page has Product + FAQ + Breadcrumb JSON-LD.
- **Per-page SEO**: `/`, `/treasure`, `/products`, `/guides`, `/store-locator` etc. each have their own title, description, og tags, canonical.
- **Hreflang**: present on `/treasure` only (en/es/fr/x-default).
- **Geo signals on `/treasure`**: `geo.region=AG`, `geo.placename=St. John's, Antigua`.

## What the advice says vs. what only you can do

Three things he recommends. Two are code, one is not:

1. **Google Search Console verification + sitemap submit** — needs code (meta tag) + you clicking "Submit sitemap" in GSC. I can do the verification via the Google Search Console connector if you link it; otherwise I just drop in a verification meta tag you paste from GSC.
2. **Hreflang on every page** — pure code, I'll do it.
3. **Google Business Profile for "Lower Nevis Street, St. John's, Antigua"** — **cannot be done from code**. You have to claim/verify it at business.google.com yourself. The `LocalBusiness` JSON-LD in your site already mirrors the same address so Google can cross-reference once GBP is live.

## Changes I'll make

### 1. Sitewide hreflang + geo meta in `src/routes/__root.tsx`

Add to the root `head().links` (applies to every page):

```ts
{ rel: "alternate", hrefLang: "en", href: "https://noyisafrica.com" },
{ rel: "alternate", hrefLang: "es", href: "https://noyisafrica.com" },
{ rel: "alternate", hrefLang: "fr", href: "https://noyisafrica.com" },
{ rel: "alternate", hrefLang: "pt", href: "https://noyisafrica.com" },
{ rel: "alternate", hrefLang: "x-default", href: "https://noyisafrica.com" },
```

Add to root `meta`:

```ts
{ name: "geo.region", content: "AG" },
{ name: "geo.placename", content: "St. John's, Antigua and Barbuda" },
{ name: "geo.position", content: "17.1175;-61.8456" },
{ name: "ICBM", content: "17.1175, -61.8456" },
```

Caveat: hreflang technically should point to language-specific URLs. Since the site is a single-URL multi-language app (language toggle in `LangProvider`), pointing all variants at the same canonical is acceptable and tells Google the page serves multiple languages — it's what the advice is asking for. Real language-specific URLs (`/es/...`, `/fr/...`) would be a much bigger rework; flag that as a future option.

### 2. Google Search Console verification (pick one)

**Option A — link the Google Search Console connector** (preferred). I run the verification flow end-to-end: request the meta token, inject it into `__root.tsx`, call verify, then add `noyisafrica.com` as a property. You only click the connector approval.

**Option B — manual.** You go to search.google.com/search-console, add `noyisafrica.com`, choose the HTML meta tag method, paste the tag to me, I add it to `__root.tsx`, you click Verify, then click "Submit sitemap" → `sitemap.xml`.

### 3. What I will NOT do unless you ask

- Add `<link rel="alternate">` per-language-URL — would require a `/es`, `/fr`, `/pt` route split.
- Touch the Treasure page hreflang (already correct).
- Add a Google Business Profile — only you can claim that.

## After the changes, you should

1. Submit `https://noyisafrica.com/sitemap.xml` in GSC → Sitemaps.
2. In GSC → Settings → International Targeting is gone in the new UI; targeting comes from hreflang + GBP signals, both handled above.
3. Create/verify Google Business Profile for Lower Nevis Street, St. John's — this is the biggest single lever for "Antigua" foot traffic + AI/maps mentions.
4. Give it 2–4 weeks as the analyst said. The India/Turkey/Jamaica hits are bots + initial crawler sweeps — expected on a freshly-launched site.
