CREATE VIEW household_view AS
SELECT 
  h.*,
  -- members
  COALESCE(
    (
      SELECT json_agg(to_jsonb(hm))
      FROM households_members hm
      WHERE hm.household_id = h.id
    ),
    '[]'::json
  ) AS members

FROM households h;