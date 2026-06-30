ALTER TABLE IF EXISTS households
ADD COLUMN invite_code uuid NOT NULL DEFAULT gen_random_uuid ();