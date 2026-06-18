# Supabase database schema

# ingredients, future table

id
name
foodex2
cooking

# food_categories, future table

id
name

# foods, future table

id
livsmedels_id
name
protein
carbs
fat
sugar
fiber
category_id (FK food_categories)

# food_ingredients, future table

food_id not null(FK foods)
ingredient_id not null(FK ingredients)
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
status (public, private)
created_at
updated_at

# recipe_ingredients

id
recipe_id (FK recipes)
food_id nullable (FK foods)
name
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

# recipe_images

id
recipe_id
is_default
img_path
created_at

# recipe_categories

id
type ('dietary' | 'cuisine' | 'course' | 'holiday' | 'method')
name

# recipe_categories_map

category_id
recipe_id

# meals

id
user_id (FK users)
household_id nullable
recipe_id (FK recipes)
meal_type
date
created_at

# groceries

id
user_id (FK users)
household_id nullable( FK households)
name
quantity
unit
is_checked

# households

id
name
created_at
updated_at
creator_id

# household_members

id
household_id
user_id
