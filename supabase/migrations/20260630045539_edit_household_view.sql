DROP VIEW IF EXISTS household_view;

CREATE VIEW household_view AS
SELECT 
  h.*,
  hm.user_id,
  -- members
  COALESCE(
    (
      SELECT json_agg(to_jsonb(m))
      FROM households_members m
      WHERE m.household_id = h.id
    ),
    '[]'::json
  ) AS members

FROM households h
JOIN households_members hm
ON hm.household_id = h.id;