CREATE VIEW recipe_catalog AS
SELECT
  r.*,

  -- ingredients
  (
    SELECT json_agg( to_jsonb(i))
    FROM recipe_ingredients i
    WHERE i.recipe_id = r.id
  ) AS ingredients,

  -- instructions
  (
    SELECT json_agg(to_jsonb(ins) ORDER BY ins.step)
    FROM recipe_instructions ins
    WHERE ins.recipe_id = r.id
  ) AS instructions,

  -- avg rating
  (
    SELECT AVG(rr.rating)
    FROM recipe_reviews rr
    WHERE rr.recipe_id = r.id
  ) AS avg_rating,

  -- total reviews
  (
    SELECT COUNT(*)
    FROM recipe_reviews rr
    WHERE rr.recipe_id = r.id
  ) AS total_reviews,

  -- categories
  (
    SELECT json_agg(to_jsonb(rcm))
    FROM recipe_categories_map rcm
    JOIN recipe_categories rc ON rc.id = rcm.category_id
    WHERE rcm.recipe_id = r.id
  ) AS categories,

  --images
  (
    SELECT json_agg(to_jsonb(rimg) ORDER BY rimg.is_default DESC)
    FROM recipe_images rimg
    WHERE rimg.recipe_id = r.id
  ) AS images

FROM recipes r;
