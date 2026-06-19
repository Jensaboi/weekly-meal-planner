DROP VIEW IF EXISTS recipe_card;

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
    SELECT json_agg(to_jsonb(rc))
    FROM recipe_categories rc
    JOIN recipe_categories_map rcm
      ON rcm.category_id = rc.id
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
