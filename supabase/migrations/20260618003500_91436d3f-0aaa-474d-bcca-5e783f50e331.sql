
DROP POLICY IF EXISTS "Public read product-media" ON storage.objects;
CREATE POLICY "Public read product-media" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'product-media');

DROP POLICY IF EXISTS "Editors write product-media" ON storage.objects;
CREATE POLICY "Editors write product-media" ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id = 'product-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  )
  WITH CHECK (
    bucket_id = 'product-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );
