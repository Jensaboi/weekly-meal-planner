ALTER VIEW recipe_catalog RENAME TO recipe_detail;

CREATE VIEW recipe_card AS
SELECT
  r.*,
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

  --image
  (
    SELECT img.img_path
    FROM recipe_images img
    WHERE img.recipe_id = r.id
    ORDER BY img.is_default DESC, img.created_at ASC
    LIMIT 1
  ) AS image

FROM recipes r;

