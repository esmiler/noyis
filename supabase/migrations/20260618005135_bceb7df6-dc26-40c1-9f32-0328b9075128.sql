
-- 1) GUIDES TABLE (GEO/AEO content library)
CREATE TABLE public.guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_localized JSONB NOT NULL DEFAULT '{}'::jsonb,
  excerpt_localized JSONB NOT NULL DEFAULT '{}'::jsonb,
  body_localized JSONB NOT NULL DEFAULT '{}'::jsonb,
  hero_image TEXT,
  category TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  faq_localized JSONB NOT NULL DEFAULT '[]'::jsonb,
  reading_minutes INT NOT NULL DEFAULT 4,
  author TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.guides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.guides TO authenticated;
GRANT ALL ON public.guides TO service_role;

ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published guides public read"
  ON public.guides FOR SELECT
  USING (published = true);

CREATE POLICY "Editors manage guides"
  ON public.guides FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TRIGGER touch_guides_updated_at
  BEFORE UPDATE ON public.guides
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 2) Allow admins to READ product_analytics (insert remains public)
CREATE POLICY "Admins read analytics"
  ON public.product_analytics FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

GRANT SELECT ON public.product_analytics TO authenticated;

-- 3) Seed launch guides (English; editor can translate later)
INSERT INTO public.guides (slug, title_localized, excerpt_localized, body_localized, category, tags, reading_minutes, faq_localized, sort_order) VALUES
('caribbean-herbal-traditions',
 '{"en":"Caribbean Herbal Traditions: A Living Apothecary"}'::jsonb,
 '{"en":"From soursop leaves to moringa, bush teas have shaped Caribbean wellness for centuries. A practical introduction to the herbs Noyis Africa carries today."}'::jsonb,
 '{"en":"<p>Across Antigua, Barbuda and the wider Caribbean, herbal medicine is a daily practice — not a trend. Grandmothers brew soursop leaf tea for restful sleep, moringa for energy, lemongrass for digestion, and bitter melon for blood sugar balance. At Noyis Africa we source these traditional botanicals alongside modern herbal formulas so families can keep these rituals alive.</p><h2>The four pillars of Caribbean bush medicine</h2><ul><li><strong>Soursop (graviola)</strong> — calming, antioxidant-rich leaves brewed as evening tea.</li><li><strong>Moringa</strong> — nutrient-dense leaf powder used for daily vitality.</li><li><strong>Ginger & lemongrass</strong> — warming digestive tonics.</li><li><strong>Bitter herbs</strong> — cleansing infusions taken in small daily doses.</li></ul><p>Our Caribbean Herbal Tea blend brings these four together in one daily cup. Order via WhatsApp for delivery across Antigua & Barbuda.</p>"}'::jsonb,
 'tradition', ARRAY['herbal','caribbean','wellness','tea'], 5,
 '[{"q":"Where can I buy authentic Caribbean herbs in Antigua?","a":"Noyis Africa stocks soursop, moringa, lemongrass and ginger blends at our warehouse on Lower Nevis Street, St. John''s. Order via WhatsApp +1 (268) 721-0101."},{"q":"Is soursop tea safe daily?","a":"Most adults tolerate 1–2 cups per day well. Pregnant women and people on medication should consult a clinician first."}]'::jsonb,
 10),
('treasure-woman-guide',
 '{"en":"Treasure Woman: Goron Tula & Women''s Herbal Balance"}'::jsonb,
 '{"en":"How the Treasure Woman herbal tonic supports hormonal balance, libido and vitality — the ingredients, who it''s for and how to use it."}'::jsonb,
 '{"en":"<p>Treasure Woman is a 100% natural herbal tonic formulated around <strong>Goron Tula</strong> — the West African ''sweetdetar'' fruit prized for centuries for women''s reproductive wellness — combined with supportive botanicals for libido, cycle balance and energy.</p><h2>Key ingredients</h2><ul><li><strong>Goron Tula</strong> — natural lubrication, hormonal support.</li><li><strong>Fenugreek</strong> — traditional hormonal balancer.</li><li><strong>Hibiscus & ginger</strong> — circulation and warmth.</li></ul><h2>How to use</h2><p>Adults: 15–30 ml once daily, preferably in the morning. Shake well before use.</p>"}'::jsonb,
 'product-guide', ARRAY['treasure','women','hormonal','libido'], 4,
 '[{"q":"Who is Treasure Woman for?","a":"Adult women looking for natural support for libido, hormonal balance and overall vitality."},{"q":"Is it safe with contraceptives?","a":"Speak to your clinician before combining herbal tonics with prescription hormones."}]'::jsonb,
 20),
('treasure-man-guide',
 '{"en":"Treasure Man: Herbal Support for Vitality & Prostate Health"}'::jsonb,
 '{"en":"A breakdown of the Treasure Man herbal formula — what''s inside, the traditional uses and how Caribbean men incorporate it into a daily wellness routine."}'::jsonb,
 '{"en":"<p>Treasure Man is a men''s herbal vitality tonic blending African and Caribbean botanicals traditionally used for energy, stamina and prostate support.</p><h2>Inside the bottle</h2><ul><li><strong>Tongkat ali</strong> — testosterone & stamina support.</li><li><strong>Saw palmetto</strong> — prostate wellness.</li><li><strong>Moringa</strong> — daily micronutrients.</li></ul><h2>Daily use</h2><p>15–30 ml once daily. Refrigerate after opening. Not intended to diagnose or treat any disease.</p>"}'::jsonb,
 'product-guide', ARRAY['treasure','men','vitality','prostate'], 4,
 '[{"q":"How long until I notice effects?","a":"Most users report increased daily energy within 2–3 weeks of consistent use."},{"q":"Can I take it with coffee?","a":"Yes — many customers pair it with our Functional Herbal Coffee in the morning."}]'::jsonb,
 30),
('soursop-tea-benefits',
 '{"en":"Soursop Tea: Caribbean Calm in a Cup"}'::jsonb,
 '{"en":"Why soursop (graviola) leaf tea is a Caribbean staple — the traditional uses, brewing instructions and what science says today."}'::jsonb,
 '{"en":"<p>Soursop leaves are one of the most-used herbs in Caribbean households. The tea is traditionally taken in the evening for restful sleep, gentle digestion and immune support.</p><h2>How to brew</h2><ol><li>Steep 4–6 dried leaves in 250 ml boiling water for 8–10 minutes.</li><li>Strain and sweeten with honey if desired.</li><li>Drink warm, ideally an hour before bed.</li></ol><h2>Pairs well with</h2><p>Moringa for daytime energy, lemongrass for digestion, ginger for warmth.</p>"}'::jsonb,
 'how-to', ARRAY['soursop','tea','sleep','immune'], 3,
 '[{"q":"How often can I drink soursop tea?","a":"1–2 cups per day is well-tolerated by most adults. Take occasional breaks if used long-term."},{"q":"Does Noyis Africa stock soursop?","a":"Yes — our Caribbean Herbal Tea blend includes soursop leaves alongside moringa, lemongrass and ginger."}]'::jsonb,
 40);
