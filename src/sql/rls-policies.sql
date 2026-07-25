-- =================================================================
-- Row Level Security — scoped by the `app.role` session variable
-- =================================================================
-- Because Better Auth (not Supabase Auth) manages sessions, there is no
-- Supabase-signed JWT for auth.uid()-based policies to read. Authorization
-- happens primarily in Next.js route handlers via requireRole(); these
-- policies are the second layer, and they trust `app.role` / `app.user_id`
-- because those are only ever set inside the withRole() transaction helper
-- (lib/db.ts), never taken from client input.
--
-- IMPORTANT: only the application's Postgres role (the one DATABASE_URL
-- connects as) should have direct table access. Do not expose this
-- connection string or a broader role to the browser or to Make.com;
-- Make.com should go through its own narrowly-scoped Postgres/Supabase
-- credentials or the REST routes, not this connection.

CREATE OR REPLACE FUNCTION app_role() RETURNS text AS $$
  SELECT current_setting('app.role', true);
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION app_user_id() RETURNS text AS $$
  SELECT current_setting('app.user_id', true);
$$ LANGUAGE sql STABLE;

-- ---------------------------------------------------------------
-- applicants
-- ---------------------------------------------------------------
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

CREATE POLICY applicants_select ON applicants
  FOR SELECT
  USING (app_role() IN ('admissions_officer', 'bursar', 'admin'));

CREATE POLICY applicants_update ON applicants
  FOR UPDATE
  USING (app_role() IN ('admissions_officer', 'admin'))
  WITH CHECK (app_role() IN ('admissions_officer', 'admin'));

-- Inserts/deletes are reserved for the agent's service credentials, not
-- staff roles, so no INSERT/DELETE policy is granted here for staff.

-- ---------------------------------------------------------------
-- conversations
-- ---------------------------------------------------------------
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY conversations_select ON conversations
  FOR SELECT
  USING (app_role() IN ('admissions_officer', 'bursar', 'admin'));

-- Staff may only ever insert messages as themselves (sender = 'human');
-- agent-authored messages are written using separate service credentials.
CREATE POLICY conversations_insert_human ON conversations
  FOR INSERT
  WITH CHECK (
    app_role() IN ('admissions_officer', 'bursar', 'admin')
    AND sender = 'human'
  );

-- ---------------------------------------------------------------
-- tours
-- ---------------------------------------------------------------
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

CREATE POLICY tours_select ON tours
  FOR SELECT
  USING (app_role() IN ('admissions_officer', 'admin'));

CREATE POLICY tours_update ON tours
  FOR UPDATE
  USING (app_role() IN ('admissions_officer', 'admin'))
  WITH CHECK (app_role() IN ('admissions_officer', 'admin'));

-- ---------------------------------------------------------------
-- applications
-- ---------------------------------------------------------------
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY applications_select ON applications
  FOR SELECT
  USING (app_role() IN ('admissions_officer', 'admin'));

CREATE POLICY applications_update ON applications
  FOR UPDATE
  USING (app_role() IN ('admissions_officer', 'admin'))
  WITH CHECK (app_role() IN ('admissions_officer', 'admin'));

-- ---------------------------------------------------------------
-- payments — bursar-only writes, wider read for context on other pages
-- ---------------------------------------------------------------
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY payments_select ON payments
  FOR SELECT
  USING (app_role() IN ('admissions_officer', 'bursar', 'admin'));

CREATE POLICY payments_update ON payments
  FOR UPDATE
  USING (app_role() IN ('bursar', 'admin'))
  WITH CHECK (app_role() IN ('bursar', 'admin'));

-- ---------------------------------------------------------------
-- escalation_tasks — role-routed: only the assigned role (or admin)
-- may resolve a task; both roles may read across the board for context
-- ---------------------------------------------------------------
ALTER TABLE escalation_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY escalation_tasks_select ON escalation_tasks
  FOR SELECT
  USING (app_role() IN ('admissions_officer', 'bursar', 'admin'));

CREATE POLICY escalation_tasks_update ON escalation_tasks
  FOR UPDATE
  USING (
    app_role() = 'admin'
    OR (app_role() = assigned_role AND status = 'pending')
  )
  WITH CHECK (
    app_role() = 'admin'
    OR app_role() = assigned_role
  );

-- ---------------------------------------------------------------
-- knowledge_base_articles — admissions officers and admins maintain it;
-- everyone (including the agent's own read path) can read it
-- ---------------------------------------------------------------
ALTER TABLE knowledge_base_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY kb_select ON knowledge_base_articles
  FOR SELECT
  USING (true);

CREATE POLICY kb_insert ON knowledge_base_articles
  FOR INSERT
  WITH CHECK (app_role() IN ('admissions_officer', 'admin'));

CREATE POLICY kb_update ON knowledge_base_articles
  FOR UPDATE
  USING (app_role() IN ('admissions_officer', 'admin'))
  WITH CHECK (app_role() IN ('admissions_officer', 'admin'));

CREATE POLICY kb_delete ON knowledge_base_articles
  FOR DELETE
  USING (app_role() IN ('admissions_officer', 'admin'));
