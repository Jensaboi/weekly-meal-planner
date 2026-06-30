DROP FUNCTION IF EXISTS create_household_and_add_owner;

CREATE OR REPLACE FUNCTION create_household_and_add_owner(
  name TEXT,
  user_id uuid
)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  household_id BIGINT;
BEGIN
 -- 1. create household
  INSERT INTO households (name, creator_id)
  VALUES (name, user_id)
  RETURNING id INTO household_id;

  -- 2. add member
  INSERT INTO household_members (household_id, user_id, role)
  VALUES (household_id, user_id, 'owner');
  -- 3. return result
  RETURN household_id;
END;
$$;