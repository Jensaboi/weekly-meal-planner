DROP VIEW IF EXISTS meal_groceries_grouped;
DROP VIEW IF EXISTS meal_groceries;

CREATE TYPE ingredient_unit AS ENUM (
  'g',
  'kg',
  'ml',
  'cl',
  'dl',
  'l',
  'tbsp',
  'tsp',
  'pcs'
);

CREATE TABLE IF NOT EXISTS ingredients (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  livsmedel_id BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS meal_ingredients(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  amount NUMERIC NOT NULL,
  unit ingredient_unit NOT NULL,
  meal_id BIGINT NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  ingredient_id BIGINT NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  is_bought BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  recipe_id BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  unit text NOT NULL,
  amount NUMERIC NOT NULL
);

ALTER TABLE IF EXISTS public.recipe_ingredients
RENAME COLUMN quantity to amount;

ALTER TABLE IF EXISTS public.recipe_ingredients
DROP COLUMN food_id;

ALTER TABLE IF EXISTS public.recipe_ingredients
DROP COLUMN name;

ALTER TABLE IF EXISTS public.recipe_ingredients
ALTER COLUMN unit TYPE ingredient_unit
USING unit::ingredient_unit;

ALTER TABLE IF EXISTS public.recipe_ingredients
ADD COLUMN ingredient_id BIGINT NOT NULL REFERENCES ingredients(id);