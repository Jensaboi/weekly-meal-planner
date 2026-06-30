CREATE TYPE role_type AS ENUM('owner', 'admin', 'member');

ALTER TABLE IF EXISTS households_members
ADD COLUMN role role_type NOT NULL;

ALTER TABLE IF EXISTS households
ADD CONSTRAINT id_constraint UNIQUE(id, creator_id);