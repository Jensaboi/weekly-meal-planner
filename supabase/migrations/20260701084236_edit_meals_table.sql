ALTER TABLE meals
ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE meals
ALTER COLUMN user_id SET DEFAULT NULL;

ALTER TABLE meals
ADD CONSTRAINT meals_owner_check
CHECK (
  (user_id IS NOT NULL AND household_id IS NULL) OR
  (user_id IS NULL AND household_id IS NOT NULL)
);