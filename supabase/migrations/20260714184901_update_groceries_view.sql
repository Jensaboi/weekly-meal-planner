DROP VIEW IF EXISTS groceries_view;

CREATE OR REPLACE VIEW groceries_view AS
SELECT 
  g.*,
  i.name,
  i.livsmedel_id,
  m.meal_type,
  m.date AS meal_date,
  r.name AS meal_name
FROM groceries g
LEFT JOIN ingredients i ON g.ingredient_id = i.id
LEFT JOIN meals m ON g.meal_id = m.id
LEFT JOIN recipes r ON m.recipe_id = r.id;