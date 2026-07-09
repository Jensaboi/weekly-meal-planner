DROP VIEW IF EXISTS meal_groceries;

CREATE OR REPLACE VIEW meal_groceries AS
SELECT 
    m.id AS meal_id,
    m.recipe_id,
    m.household_id,
    m.user_id,
    m.date AS meal_date,
    ri.name,
    ri.id AS ingredient_id,
    m.created_at as meal_created_at,
    m.updated_at as meal_updated_at,
    ri.unit,
    ri.quantity * (r.portions::numeric / m.portion) AS quantity
FROM meals m 
JOIN recipes r ON m.recipe_id = r.id
JOIN recipe_ingredients ri ON r.id = ri.recipe_id;