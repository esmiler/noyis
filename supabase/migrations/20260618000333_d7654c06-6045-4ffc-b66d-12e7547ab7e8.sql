
DROP POLICY "Anyone can submit contact" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions
  FOR INSERT WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(message) BETWEEN 1 AND 2000
    AND (phone IS NULL OR char_length(phone) <= 40)
  );

DROP POLICY "Anyone can record analytics" ON public.product_analytics;
CREATE POLICY "Anyone can record analytics" ON public.product_analytics
  FOR INSERT WITH CHECK (
    event_type IN ('view','whatsapp_click','cart_add')
  );
