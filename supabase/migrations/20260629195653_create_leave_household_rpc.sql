ALTER TABLE households_members
ADD CONSTRAINT households_members_user_id_unique
UNIQUE (user_id);

ALTER TABLE households
ADD CONSTRAINT households_creator_id_unique
UNIQUE (creator_id);

CREATE OR REPLACE FUNCTION leave_household ()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
 -- 1. Delete household
  DELETE FROM households
  WHERE creator_id = auth.uid();

  -- 2. Delete from household_members
  DELETE FROM households_members
  WHERE user_id = auth.uid();

END;
$$;
