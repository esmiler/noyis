import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listProductSlugs } from "@/lib/products.functions";
import { listGuideSlugs } from "@/lib/guides.functions";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/products", "/wholesale", "/contact", "/store-locator", "/guides", "/auth"];
        const [products, guides] = await Promise.all([listProductSlugs(), listGuideSlugs()]);
        const urls = [
          ...staticPaths.map((p) => `<url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`),
          ...products.map(
            (p) =>
              `<url><loc>${BASE_URL}/products/${p.slug}</loc><lastmod>${p.updated_at}</lastmod><changefreq>weekly</changefreq></url>`,
          ),
          ...guides.map(
            (g) =>
              `<url><loc>${BASE_URL}/guides/${g.slug}</loc><lastmod>${g.updated_at}</lastmod><changefreq>monthly</changefreq></url>`,
          ),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
