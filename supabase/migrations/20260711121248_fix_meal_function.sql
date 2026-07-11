DROP FUNCTION create_meal_and_groceries;

CREATE OR REPLACE FUNCTION create_meal_and_groceries(
    p_portions NUMERIC,
    p_recipe_id BIGINT,
    p_meal_type meal_type,
    p_date DATE
)
RETURNS VOID
LANGUAGE plpgsql
AS $$ 
DECLARE
  v_user_id UUID;
  v_household_id BIGINT;
  v_meal_id BIGINT;
  v_recipe_portions NUMERIC;
  ingredient RECORD;
BEGIN

  -- 1. Get household_id
  SELECT hm.household_id
  INTO v_household_id
  FROM household_members hm
  WHERE hm.user_id = auth.uid();


  -- 2. Decide ownership
  IF v_household_id IS NULL THEN
      v_user_id := auth.uid();
  ELSE
      v_user_id := NULL;
  END IF;


  -- 3. Create meal
  INSERT INTO meals (
      user_id,
      household_id,
      recipe_id,
      meal_type,
      portions,
      date
  )
  VALUES (
      v_user_id,
      v_household_id,
      p_recipe_id,
      p_meal_type,
      p_portions,
      p_date
  )
  RETURNING id INTO v_meal_id;


  -- 4. Get recipe's original portions
  SELECT r.portions
  INTO v_recipe_portions
  FROM recipes r
  WHERE r.id = p_recipe_id;


  -- 5. Loop through ingredients
  FOR ingredient IN

      SELECT
          ri.ingredient_id,
          ri.amount,
          ri.unit,
          i.name,
          i.livsmedel_id
      FROM recipe_ingredients ri
      JOIN ingredients i
          ON ri.ingredient_id = i.id
      WHERE ri.recipe_id = p_recipe_id

  LOOP


      -- 6. Insert groceries
      INSERT INTO groceries (
          meal_id,
          ingredient_id,
          amount,
          unit,
          added_by
      )
      VALUES (
          v_meal_id,
          ingredient.ingredient_id,
          ingredient.amount * p_portions / v_recipe_portions,
          ingredient.unit,
          'meal'
      );


  END LOOP;

END;
$$;