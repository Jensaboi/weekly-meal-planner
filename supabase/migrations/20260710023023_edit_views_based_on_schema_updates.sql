DROP VIEW IF EXISTS meal_card;
DROP VIEW IF EXISTS recipe_details;
DROP VIEW IF EXISTS recipe_card;
DROP VIEW IF EXISTS household_view;

CREATE OR REPLACE VIEW recipe_details AS
SELECT
  r.*,

  -- ingredients
  (
    SELECT json_agg(
      jsonb_build_object(
        'id', ri.id,
        'ingredient_id', ri.ingredient_id,
        'amount', ri.amount,
        'unit', ri.unit,
        'name', i.name,
        'livsmedel_id', i.livsmedel_id
      )
    )
    FROM recipe_ingredients ri
    LEFT JOIN ingredients i
      ON i.id = ri.ingredient_id
    WHERE ri.recipe_id = r.id
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
    SELECT json_agg(to_jsonb(rc))
    FROM recipe_categories rc
    JOIN recipe_categories_map rcm
      ON rcm.category_id = rc.id
    WHERE rcm.recipe_id = r.id
  ) AS categories,

  --images
  (
    SELECT json_agg(to_jsonb(rimg) ORDER BY rimg.is_default DESC)
    FROM recipe_images rimg
    WHERE rimg.recipe_id = r.id
  ) AS images

FROM recipes r;


CREATE OR REPLACE VIEW recipe_card AS
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
  
  -- Total ingredients
  (
    SELECT COUNT(ri.id)
    FROM recipe_ingredients ri
    WHERE r.id = ri.recipe_id
  ) AS total_ingredients,

  -- total instructions
  (
    SELECT COUNT(i.id)
    FROM recipe_instructions i
    WHERE r.id = i.recipe_id
  ) AS total_instructions,

    --image
  (
    SELECT img.img_path
    FROM recipe_images img
    WHERE img.recipe_id = r.id
    ORDER BY img.is_default DESC, img.created_at ASC
    LIMIT 1
  ) AS image

FROM recipes r;

CREATE OR REPLACE VIEW household_view AS
SELECT 
  h.*,
  hm.user_id,
  -- members
  COALESCE(
    (
      SELECT json_agg(to_jsonb(m))
      FROM household_members m
      WHERE m.household_id = h.id
    ),
    '[]'::json
  ) AS members

FROM households h
JOIN household_members hm
ON hm.household_id = h.id;

CREATE OR REPLACE VIEW meal_card AS
SELECT 
  m.*,
  rc.author_id,
  rc.name,
  rc.description,
  rc.cooking_time,
  rc.prep_time,
  rc.visibility,
  rc.avg_rating,
  rc.total_reviews,
  rc.total_ingredients,
  rc.total_instructions,
  rc.categories,
  rc.image
FROM meals m
LEFT JOIN recipe_card rc ON rc.id = m.recipe_id;
