CREATE OR REPLACE VIEW meal_groceries_grouped AS
SELECT 
  mg.ingredient_id,
  mg.unit,
  SUM(mg.quantity) as quantity
FROM meal_groceries mg
GROUP BY mg.ingredient_id, mg.unit;
