CREATE VIEW meal_card AS
SELECT 
  m.*,
  rc.author_id,
  rc.name,
  rc.description,
  rc.cooking_time,
  rc.prep_time,
  rc.portions,
  rc.visibility,
  rc.avg_rating,
  rc.total_reviews,
  rc.categories,
  rc.image
FROM meals m
LEFT JOIN recipe_card rc ON rc.id = m.recipe_id;
