DROP VIEW IF EXISTS meals_ingredients;

CREATE OR REPLACE VIEW meals_ingredients AS
SELECT 
    m.id AS meal_id,
    m.recipe_id,
    m.household_id,
    m.user_id,
    m.date,
    ri.name,
    ri.id AS ingredient_id,
    ri.unit,
    ri.quantity * (r.portions::numeric / m.portion) AS quantity
FROM meals m 
JOIN recipes r ON m.recipe_id = r.id
JOIN recipe_ingredients ri ON r.id = ri.recipe_id;