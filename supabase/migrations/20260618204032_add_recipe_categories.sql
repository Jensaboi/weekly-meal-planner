CREATE TYPE recipe_type AS ENUM ('dietary', 'cuisine', 'course', 'holiday', 'method');

CREATE TABLE IF NOT EXISTS recipe_categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type recipe_type NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipe_categories_map (
  category_id BIGINT NOT NULL REFERENCES recipe_categories(id),
  recipe_id BIGINT NOT NULL REFERENCES recipes(id)
);
