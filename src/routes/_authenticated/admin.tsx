import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { claimFirstAdmin, myRoles, listUsersWithRoles, setUserRoles } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, LogOut, Plus, Trash2, Upload, X } from "lucide-react";
import logoAsset from "@/assets/noyis-logo.png.asset.json";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Noyis Africa" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Localized = Record<string, string>;
type Product = {
  id: string;
  slug: string;
  name_localized: Localized;
  short_description_localized: Localized;
  long_description_localized: Localized;
  hero_image: string | null;
  pricing_usd: number | null;
  pricing_xcd: number | null;
  stock_status: string;
  stock_quantity: number;
  featured: boolean;
  is_wholesale: boolean;
  category_id: string | null;
  tags: string[];
  benefits: unknown;
  botanical_origin: string | null;
  country_of_origin: string | null;
};
type Category = {
  id: string;
  slug: string;
  name_localized: Localized;
  description_localized: Localized;
  image: string | null;
  featured: boolean;
  sort_order: number;
};
type Faq = {
  id: string;
  question_localized: Localized;
  answer_localized: Localized;
  sort_order: number;
};

function AdminPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [roles, setRoles] = useState<string[] | null>(null);
  const [busy, setBusy] = useState(false);
  const fetchRoles = useServerFn(myRoles);
  const claim = useServerFn(claimFirstAdmin);

  const refreshRoles = useCallback(async () => {
    try {
      const r = await fetchRoles();
      setRoles(r);
    } catch {
      setRoles([]);
    }
  }, [fetchRoles]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate({ to: "/auth" });
        return;
      }
      setUser({ id: data.user.id, email: data.user.email ?? undefined });
      void refreshRoles();
    });
  }, [navigate, refreshRoles]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function doClaim() {
    setBusy(true);
    try {
      const res = await claim();
      if (res.ok) {
        toast.success("You are now the admin.");
        await refreshRoles();
      } else toast.error(res.reason ?? "Could not claim admin");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  if (!user || roles === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isAdmin = roles.includes("admin");
  const isEditor = isAdmin || roles.includes("editor");

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset.url} alt="" className="h-9 w-9" />
            <div>
              <div className="font-display text-lg font-semibold leading-tight">Noyis Admin</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            {roles.map((r) => (
              <Badge key={r} variant="secondary" className="capitalize">{r}</Badge>
            ))}
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-1.5 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {!isEditor ? (
          <div className="rounded-lg border bg-card p-8 text-center">
            <h2 className="font-display text-xl font-semibold">No admin access</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your account exists but you don't have admin or editor privileges yet.
            </p>
            <div className="mt-6">
              <Button onClick={doClaim} disabled={busy}>
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Claim first-admin role
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Only works if no admin exists yet.
              </p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="products">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              {isAdmin && <TabsTrigger value="users">Users</TabsTrigger>}
            </TabsList>
            <TabsContent value="products" className="mt-4">
              <ProductsAdmin />
            </TabsContent>
            <TabsContent value="categories" className="mt-4">
              <CategoriesAdmin />
            </TabsContent>
            <TabsContent value="faqs" className="mt-4">
              <FaqsAdmin />
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <SettingsAdmin />
            </TabsContent>
            {isAdmin && (
              <TabsContent value="users" className="mt-4">
                <UsersAdmin />
              </TabsContent>
            )}
          </Tabs>
        )}
      </main>
    </div>
  );
}

// ---------- PRODUCTS ----------
function ProductsAdmin() {
  const [items, setItems] = useState<Product[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("sort_order"),
    ]);
    setItems((p ?? []) as unknown as Product[]);
    setCats((c ?? []) as unknown as Category[]);
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  function newProduct(): Product {
    return {
      id: "",
      slug: "",
      name_localized: { en: "" },
      short_description_localized: { en: "" },
      long_description_localized: { en: "" },
      hero_image: null,
      pricing_usd: null,
      pricing_xcd: null,
      stock_status: "in_stock",
      stock_quantity: 0,
      featured: false,
      is_wholesale: false,
      category_id: null,
      tags: [],
      benefits: [],
      botanical_origin: null,
      country_of_origin: null,
    };
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); void load(); }
  }

  if (editing) {
    return (
      <ProductEditor
        product={editing}
        categories={cats}
        onClose={() => { setEditing(null); void load(); }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Products ({items.length})</h2>
        <Button onClick={() => setEditing(newProduct())}>
          <Plus className="mr-1.5 h-4 w-4" /> New product
        </Button>
      </div>
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <div className="overflow-hidden rounded-lg border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Price USD</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Flags</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="p-3 font-medium">{p.name_localized?.en || "(no name)"}</td>
                  <td className="p-3 font-mono text-xs">{p.slug}</td>
                  <td className="p-3">{p.pricing_usd ?? "—"}</td>
                  <td className="p-3">{p.stock_status} ({p.stock_quantity})</td>
                  <td className="p-3 space-x-1">
                    {p.featured && <Badge variant="secondary">Featured</Badge>}
                    {p.is_wholesale && <Badge variant="outline">Wholesale</Badge>}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Edit</Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td className="p-6 text-center text-muted-foreground" colSpan={6}>No products yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LocalizedField({
  label, value, onChange, multiline,
}: { label: string; value: Localized; onChange: (v: Localized) => void; multiline?: boolean }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 grid gap-2 sm:grid-cols-2">
        {SUPPORTED_LANGS.map((l) => (
          <div key={l}>
            <div className="mb-1 text-xs uppercase text-muted-foreground">{l}</div>
            {multiline ? (
              <Textarea rows={3} value={value?.[l] ?? ""} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
            ) : (
              <Input value={value?.[l] ?? ""} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageUploader({ value, onChange }: { value: string | null; onChange: (url: string | null) => void }) {
  const [uploading, setUploading] = useState(false);
  async function onFile(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `products/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("product-media").upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("product-media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }
  return (
    <div>
      <Label>Hero image</Label>
      <div className="mt-1 flex items-center gap-3">
        {value && <img src={value} alt="" className="h-20 w-20 rounded-md object-cover" />}
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span>{value ? "Replace" : "Upload"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) void onFile(f); }}
          />
        </label>
        {value && (
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange(null)}>
            <X className="h-4 w-4" /> Remove
          </Button>
        )}
      </div>
      <div className="mt-2">
        <Input placeholder="…or paste image URL" value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} />
      </div>
    </div>
  );
}

function ProductEditor({
  product, categories, onClose,
}: { product: Product; categories: Category[]; onClose: () => void }) {
  const [p, setP] = useState<Product>(product);
  const [saving, setSaving] = useState(false);
  const isNew = !p.id;

  async function save() {
    setSaving(true);
    try {
      const payload = {
        slug: p.slug,
        name_localized: p.name_localized,
        short_description_localized: p.short_description_localized,
        long_description_localized: p.long_description_localized,
        hero_image: p.hero_image,
        pricing_usd: p.pricing_usd,
        pricing_xcd: p.pricing_xcd,
        stock_status: p.stock_status,
        stock_quantity: p.stock_quantity,
        featured: p.featured,
        is_wholesale: p.is_wholesale,
        category_id: p.category_id,
        tags: p.tags,
        botanical_origin: p.botanical_origin,
        country_of_origin: p.country_of_origin,
      };
      if (isNew) {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").update(payload).eq("id", p.id);
        if (error) throw error;
      }
      toast.success("Saved");
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function patch<K extends keyof Product>(k: K, v: Product[K]) { setP({ ...p, [k]: v }); }

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">{isNew ? "New product" : "Edit product"}</h2>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Slug (URL)</Label>
          <Input value={p.slug} onChange={(e) => patch("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} placeholder="treasure-man" />
        </div>
        <div>
          <Label>Category</Label>
          <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={p.category_id ?? ""} onChange={(e) => patch("category_id", e.target.value || null)}>
            <option value="">— None —</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name_localized?.en || c.slug}</option>)}
          </select>
        </div>
      </div>

      <LocalizedField label="Name" value={p.name_localized} onChange={(v) => patch("name_localized", v)} />
      <LocalizedField label="Short description" value={p.short_description_localized} onChange={(v) => patch("short_description_localized", v)} multiline />
      <LocalizedField label="Long description" value={p.long_description_localized} onChange={(v) => patch("long_description_localized", v)} multiline />

      <ImageUploader value={p.hero_image} onChange={(v) => patch("hero_image", v)} />

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <Label>Price USD</Label>
          <Input type="number" step="0.01" value={p.pricing_usd ?? ""} onChange={(e) => patch("pricing_usd", e.target.value ? Number(e.target.value) : null)} />
        </div>
        <div>
          <Label>Price XCD</Label>
          <Input type="number" step="0.01" value={p.pricing_xcd ?? ""} onChange={(e) => patch("pricing_xcd", e.target.value ? Number(e.target.value) : null)} />
        </div>
        <div>
          <Label>Stock status</Label>
          <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={p.stock_status} onChange={(e) => patch("stock_status", e.target.value)}>
            <option value="in_stock">In stock</option>
            <option value="low_stock">Low stock</option>
            <option value="out_of_stock">Out of stock</option>
            <option value="contact">Contact for availability</option>
          </select>
        </div>
        <div>
          <Label>Stock quantity</Label>
          <Input type="number" value={p.stock_quantity} onChange={(e) => patch("stock_quantity", Number(e.target.value) || 0)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Botanical origin</Label>
          <Input value={p.botanical_origin ?? ""} onChange={(e) => patch("botanical_origin", e.target.value || null)} />
        </div>
        <div>
          <Label>Country of origin</Label>
          <Input value={p.country_of_origin ?? ""} onChange={(e) => patch("country_of_origin", e.target.value || null)} />
        </div>
      </div>

      <div>
        <Label>Tags (comma-separated)</Label>
        <Input value={p.tags.join(", ")} onChange={(e) => patch("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={p.featured} onCheckedChange={(v) => patch("featured", v)} /> Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={p.is_wholesale} onCheckedChange={(v) => patch("is_wholesale", v)} /> Wholesale
        </label>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={save} disabled={saving || !p.slug || !p.name_localized.en}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save product
        </Button>
      </div>
    </div>
  );
}

// ---------- CATEGORIES ----------
function CategoriesAdmin() {
  const [items, setItems] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from("categories").select("*").order("sort_order");
    setItems((data ?? []) as unknown as Category[]);
  }, []);
  useEffect(() => { void load(); }, [load]);

  function newCat(): Category {
    return { id: "", slug: "", name_localized: { en: "" }, description_localized: { en: "" }, image: null, featured: false, sort_order: 0 };
  }
  async function save() {
    if (!editing) return;
    const payload = {
      slug: editing.slug,
      name_localized: editing.name_localized,
      description_localized: editing.description_localized,
      image: editing.image,
      featured: editing.featured,
      sort_order: editing.sort_order,
    };
    const { error } = editing.id
      ? await supabase.from("categories").update(payload).eq("id", editing.id)
      : await supabase.from("categories").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); void load(); }
  }
  async function remove(id: string) {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); void load(); }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Categories ({items.length})</h2>
          <Button onClick={() => setEditing(newCat())}><Plus className="mr-1.5 h-4 w-4" /> New</Button>
        </div>
        <div className="overflow-hidden rounded-lg border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="p-3">Order</th><th className="p-3">Name</th><th className="p-3">Slug</th><th className="p-3"></th></tr>
            </thead>
            <tbody className="divide-y">
              {items.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="p-3">{c.sort_order}</td>
                  <td className="p-3 font-medium">{c.name_localized?.en}</td>
                  <td className="p-3 font-mono text-xs">{c.slug}</td>
                  <td className="p-3 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(c)}>Edit</Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editing && (
        <div className="space-y-4 rounded-lg border bg-card p-4">
          <h3 className="font-display text-lg font-semibold">{editing.id ? "Edit category" : "New category"}</h3>
          <div>
            <Label>Slug</Label>
            <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} />
          </div>
          <LocalizedField label="Name" value={editing.name_localized} onChange={(v) => setEditing({ ...editing, name_localized: v })} />
          <LocalizedField label="Description" value={editing.description_localized} onChange={(v) => setEditing({ ...editing, description_localized: v })} multiline />
          <ImageUploader value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
          <div>
            <Label>Sort order</Label>
            <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) || 0 })} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Switch checked={editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v })} /> Featured
          </label>
          <div className="flex justify-end gap-2 border-t pt-3">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save} disabled={!editing.slug}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- FAQS ----------
function FaqsAdmin() {
  const [items, setItems] = useState<Faq[]>([]);
  const [editing, setEditing] = useState<Faq | null>(null);
  const load = useCallback(async () => {
    const { data } = await supabase.from("faqs").select("*").order("sort_order");
    setItems((data ?? []) as unknown as Faq[]);
  }, []);
  useEffect(() => { void load(); }, [load]);

  function newFaq(): Faq {
    return { id: "", question_localized: { en: "" }, answer_localized: { en: "" }, sort_order: items.length };
  }
  async function save() {
    if (!editing) return;
    const payload = {
      question_localized: editing.question_localized,
      answer_localized: editing.answer_localized,
      sort_order: editing.sort_order,
    };
    const { error } = editing.id
      ? await supabase.from("faqs").update(payload).eq("id", editing.id)
      : await supabase.from("faqs").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); void load(); }
  }
  async function remove(id: string) {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) toast.error(error.message); else void load();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">FAQs ({items.length})</h2>
          <Button onClick={() => setEditing(newFaq())}><Plus className="mr-1.5 h-4 w-4" /> New</Button>
        </div>
        <div className="space-y-2">
          {items.map((f) => (
            <div key={f.id} className="flex items-start justify-between rounded-lg border bg-card p-4">
              <div className="flex-1 pr-4">
                <div className="font-medium">{f.question_localized?.en}</div>
                <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{f.answer_localized?.en}</div>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(f)}>Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(f.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editing && (
        <div className="space-y-4 rounded-lg border bg-card p-4">
          <h3 className="font-display text-lg font-semibold">{editing.id ? "Edit FAQ" : "New FAQ"}</h3>
          <LocalizedField label="Question" value={editing.question_localized} onChange={(v) => setEditing({ ...editing, question_localized: v })} />
          <LocalizedField label="Answer" value={editing.answer_localized} onChange={(v) => setEditing({ ...editing, answer_localized: v })} multiline />
          <div>
            <Label>Sort order</Label>
            <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) || 0 })} />
          </div>
          <div className="flex justify-end gap-2 border-t pt-3">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- SETTINGS ----------
function SettingsAdmin() {
  const [items, setItems] = useState<{ id: string; config_key: string; value: unknown }[]>([]);
  const [newKey, setNewKey] = useState("");
  const [newVal, setNewVal] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase.from("settings").select("*").order("config_key");
    setItems((data ?? []) as unknown as { id: string; config_key: string; value: unknown }[]);
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function save(id: string, value: string) {
    let parsed: unknown = value;
    try { parsed = JSON.parse(value); } catch { /* keep string */ }
    const { error } = await supabase.from("settings").update({ value: parsed as never }).eq("id", id);
    if (error) toast.error(error.message); else toast.success("Saved");
  }
  async function add() {
    if (!newKey) return;
    let parsed: unknown = newVal;
    try { parsed = JSON.parse(newVal); } catch { /* keep */ }
    const { error } = await supabase.from("settings").insert({ config_key: newKey, value: parsed as never });
    if (error) toast.error(error.message);
    else { setNewKey(""); setNewVal(""); void load(); }
  }
  async function remove(id: string) {
    const { error } = await supabase.from("settings").delete().eq("id", id);
    if (error) toast.error(error.message); else void load();
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold">Site settings</h2>
      <div className="space-y-3">
        {items.map((s) => (
          <SettingRow key={s.id} item={s} onSave={save} onDelete={remove} />
        ))}
      </div>
      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-2 font-medium">Add setting</h3>
        <div className="grid gap-2 sm:grid-cols-[200px_1fr_auto]">
          <Input placeholder="config_key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
          <Input placeholder='value (string or JSON)' value={newVal} onChange={(e) => setNewVal(e.target.value)} />
          <Button onClick={add}>Add</Button>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  item, onSave, onDelete,
}: { item: { id: string; config_key: string; value: unknown }; onSave: (id: string, v: string) => void; onDelete: (id: string) => void }) {
  const [val, setVal] = useState(typeof item.value === "string" ? item.value : JSON.stringify(item.value, null, 2));
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-mono text-sm">{item.config_key}</div>
        <Button size="sm" variant="ghost" onClick={() => onDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
      </div>
      <Textarea rows={2} value={val} onChange={(e) => setVal(e.target.value)} className="font-mono text-xs" />
      <div className="mt-2 flex justify-end">
        <Button size="sm" onClick={() => onSave(item.id, val)}>Save</Button>
      </div>
    </div>
  );
}

// ---------- USERS ----------
function UsersAdmin() {
  const fetchUsers = useServerFn(listUsersWithRoles);
  const updateRoles = useServerFn(setUserRoles);
  const [users, setUsers] = useState<{ id: string; email: string; roles: string[]; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);
  useEffect(() => { void load(); }, [load]);

  async function toggle(userId: string, role: string, current: string[]) {
    const next = current.includes(role) ? current.filter((r) => r !== role) : [...current, role];
    try {
      await updateRoles({ data: { userId, roles: next } });
      toast.success("Roles updated");
      void load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  }

  if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold">Users & roles ({users.length})</h2>
      <div className="overflow-hidden rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Admin</th>
              <th className="p-3">Editor</th>
              <th className="p-3">Viewer</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-3">{u.email}</td>
                {(["admin", "editor", "viewer"] as const).map((r) => (
                  <td key={r} className="p-3">
                    <Checkbox checked={u.roles.includes(r)} onCheckedChange={() => toggle(u.id, r, u.roles)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Silence unused-import warning for Lang
export type { Lang };
