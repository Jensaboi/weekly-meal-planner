CREATE OR REPLACE VIEW groceries_view AS
SELECT 
  g.*,
  i.name,
  i.livsmedel_id
FROM groceries g
LEFT JOIN ingredients i ON g.ingredient_id = i.id;