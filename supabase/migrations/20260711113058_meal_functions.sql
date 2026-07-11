CREATE OR REPLACE FUNCTION create_meal_and_groceries(
    portions NUMERIC,
    recipe_id BIGINT,
    meal_type meal_type,
    date date
)
RETURNS VOID
LANGUAGE plpgsql
AS $$ 
DECLARE
  user_id UUID;
  household_id BIGINT;
  meal_id BIGINT;
  recipe_portions NUMERIC;
  ingredient RECORD;
BEGIN
  -- 1. Get household_id
  SELECT 
    household_id 
  INTO household_id
  FROM household_members 
  WHERE user_id = auth.uid();

  -- 2. Check owner of the meal.
  IF household_id IS NULL THEN
      user_id := auth.uid();
  ELSE
      user_id := NULL;
  END IF;

  -- 3. create meal
  INSERT INTO meals(user_id, household_id, recipe_id, meal_type, portions, date)
  VALUES (user_id, household_id, recipe_id, meal_type, portions, date)
  RETURNING id INTO meal_id;

  -- 4. get recipe_portions
  SELECT 
    portions 
  INTO recipe_portions
  FROM recipes
  WHERE id = recipe_id;

  -- 5. get and loop over ingredients
  FOR ingredient IN

      SELECT
          ri.*,
          i.name,
          i.livsmedel_id
      FROM recipe_ingredients ri
      JOIN ingredients i
          ON ri.ingredient_id = i.id
      WHERE ri.recipe_id = recipe_id

  LOOP

  -- 6. Insert ingredients into groceries
      INSERT INTO groceries ( meal_id, ingredient_id, amount, unit, added_by)
      VALUES (
          meal_id,
          ingredient.ingredient_id,
          ingredient.amount * portions / recipe_portions,
          ingredient.unit,
          "meal"
      );

  END LOOP;

END;
$$;