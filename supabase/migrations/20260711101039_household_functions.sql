CREATE OR REPLACE FUNCTION leave_household ()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
 -- 1. Delete household
  DELETE FROM households
  WHERE creator_id = auth.uid();

  -- 2. Delete from household_members
  DELETE FROM household_members
  WHERE user_id = auth.uid();

END;
$$;

CREATE OR REPLACE FUNCTION create_household(
  name TEXT
)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  household_id BIGINT;
BEGIN
 -- 1. create household
  INSERT INTO households (name, creator_id)
  VALUES (name, auth.uid())
  RETURNING id INTO household_id;

  -- 2. add member
  INSERT INTO household_members (household_id, user_id, role)
  VALUES (household_id, auth.uid(), 'owner');
  -- 3. return result
  RETURN household_id;
END;
$$;

CREATE OR REPLACE FUNCTION join_household (
  code TEXT
)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  household_id BIGINT;
BEGIN
  -- 1. Get household
  SELECT id
  INTO household_id
  FROM households
  WHERE invite_code = code;

  -- Check that the household exists
  IF household_id IS NULL THEN
    RAISE EXCEPTION 'Invalid invite code';
  END IF;

  -- 2. Add member
  INSERT INTO household_members (household_id, user_id, role)
  VALUES (household_id, auth.uid(), 'member');

  RETURN household_id;
END;
$$;