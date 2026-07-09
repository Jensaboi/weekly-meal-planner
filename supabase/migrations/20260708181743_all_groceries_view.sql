CREATE OR REPLACE VIEW public.all_groceries AS
SELECT g.* FROM public.groceries g
WHERE g.user_id = auth.uid()