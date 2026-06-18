import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((input) =>
    z
      .object({ category: z.string().optional(), wholesale: z.boolean().optional(), featured: z.boolean().optional() })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const sb = publicClient();
    let q = sb
      .from("products")
      .select(
        "id, slug, name_localized, short_description_localized, hero_image, pricing_usd, pricing_xcd, stock_status, stock_quantity, featured, is_wholesale, category_id, tags, benefits",
      )
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (data.featured) q = q.eq("featured", true);
    if (data.wholesale) q = q.eq("is_wholesale", true);
    if (data.category) {
      const { data: cat } = await sb.from("categories").select("id").eq("slug", data.category).maybeSingle();
      if (cat?.id) q = q.eq("category_id", cat.id);
    }
    const { data: rows, error } = await q;
    if (error) throw error;
    return rows ?? [];
  });

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data, error } = await sb.from("categories").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
});

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: product, error } = await sb.from("products").select("*").eq("slug", data.slug).maybeSingle();
    if (error) throw error;
    return product;
  });

export const listFaqs = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data, error } = await sb.from("faqs").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
});

export const listProductSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data, error } = await sb.from("products").select("slug, updated_at");
  if (error) throw error;
  return data ?? [];
});
