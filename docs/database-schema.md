# Supabase database schema

# ingredients

id
name
foodex2

# food_categories

id
name

# foods

id
livsmedels_id
name
protein
carbs
fat
sugar
fiber
category_id (FK food_categories)

# food_ingredients

food_id (FK foods)
ingredient_id (FK ingredients)
percentage
cooking

# recipes

id
author_id (FK users)
name
description
cooking_time
prep_time
portions
img_path
status (public, private)
created_at
updated_at

# recipe_images ?

Add later?

# recipe_ingredients

id
recipe_id (FK recipes)
food_id (FK foods)
display_name
unit
quantity

# recipe_instructions

id
recipe_id (FK recipes)
step
description

# recipe_reviews

id
recipe_id (FK recipes)
rating
comment
author_id
created_at
updated_at

# meals

id
user_id (FK users)
recipe_id (FK recipes)
meal_type
date
created_at

# groceries

id
user_id (FK users)
food_id (FK foods)
amount
name
unit
checked
