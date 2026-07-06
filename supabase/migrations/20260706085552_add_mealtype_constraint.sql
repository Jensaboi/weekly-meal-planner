ALTER TABLE IF EXISTS meals
ADD CONSTRAINT meal_type_check
CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack'));

ALTER TABLE IF EXISTS meals
ADD CONSTRAINT meal_type_unique_per_date
UNIQUE (date, meal_type);