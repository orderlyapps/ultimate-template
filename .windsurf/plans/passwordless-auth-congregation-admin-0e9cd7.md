# Passwordless User Registration & Congregation Admin System

Implement passwordless authentication with congregation-based role management (admin/editor) and granular permissions enforced via Supabase RLS, using the existing `publisher` table with new role columns.

---

## Overview

### User Flow
1. **You (super admin)** create an account for a new user → they become a congregation admin
2. **Congregation admin** creates their congregation
3. **Congregation admin** adds publishers and can create accounts for them (making them admins or editors)
4. **Admins** can only manage users within their own congregation
5. **Editors** have granular permissions (e.g., edit publisher details, edit assignments)
6. **Super admins can invite other super admins** — super admin invites are not tied to a publisher or congregation; acceptance creates a `user_account` row with `is_super_admin = true` only (no publisher linkage).

### Authentication Method
- **Admin-delivered email OTP; user never provides an email.** The "email" is a synthetic internal identifier the user never sees.
- On invite creation, an edge function pre-creates a Supabase auth user with a synthetic email (`{random-uuid}@invite.local`), then mints a 6-digit OTP via `auth.admin.generateLink({ type: 'magiclink', email })`. **No email is sent** — `admin.generateLink` only returns tokens.
- The admin sees the 6-digit code in-app and delivers it to the user out-of-band (SMS, iMessage, in person) along with a claim URL `app.com/invite/<token>`.
- User opens URL, enters code. Client fetches the synthetic email via `get_invite_context(token)` RPC, then calls `supabase.auth.verifyOtp({ email, token: otp, type: 'email' })`. Session established.
- Client then calls `accept_invite(token)` RPC to link auth user to publisher (or flag as super admin).
- **Account recovery is admin-mediated**: if a user loses their session/device, the admin regenerates an OTP via `regenerate_invite_otp(token)` (for pending invites) or `regenerate_user_otp(user_id)` (for accepted users).

---

## Phase 1: Database Schema (SQL Files)

### Modified Tables

#### `publisher` table (add columns)
Add role and user linking to the existing publisher table.

| New Column | Type | Notes |
|------------|------|-------|
| `user_id` | uuid | FK to `auth.users(id)`, nullable, unique |
| `role` | text | 'admin', 'editor', or null (no account) |

**Existing columns remain unchanged:**
- `id`, `first_name`, `middle_name`, `last_name`, `display_name`
- `congregation_id`, `standing`, `type`, `gender`, `family_id`, `group_id`

### New Tables

#### 1. `user_account`
Stores super admin flag and account metadata.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK, references `auth.users(id)` |
| `created_at` | timestamptz | default now() |
| `created_by` | uuid | FK to `user_account.id` (nullable for super admin) |
| `is_super_admin` | boolean | default false (only you) |

#### 2. `editor_permission`
Granular permissions for editors. Links to publisher (not a separate member table).

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `publisher_id` | uuid | FK to `publisher.id` |
| `congregation_id` | uuid | FK to `congregation.id` (denormalized for RLS performance) |
| `permission` | text | See permission list below |
| `granted` | boolean | default `true`, set `false` to revoke default permissions |
| `created_at` | timestamptz | |

**Unique constraint**: `(publisher_id, permission)`
**Index**: `congregation_id` (for RLS queries), `publisher_id`

**Consistency trigger**: When `publisher.congregation_id` changes, update `editor_permission.congregation_id` for all rows with that `publisher_id`.

#### 3. `invite`
For manual invite link sharing. Denormalized for easy access during invite acceptance (no auth context).

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `token` | text | unique, random URL-safe string (the `:token` in the claim URL) |
| `auth_user_id` | uuid | FK to `auth.users(id)`, not null — pre-created auth user this invite will authenticate (holds the synthetic email) |
| `publisher_id` | uuid | FK to `publisher.id`, **nullable** (null for super admin invites) |
| `congregation_id` | uuid | FK to `congregation.id`, **nullable** (null for super admin invites) |
| `role` | text | 'admin', 'editor', or 'super_admin' (denormalized) |
| `is_super_admin` | boolean | default `false`; when `true`, `publisher_id` and `congregation_id` must be null |
| `created_by` | uuid | FK to `user_account.id` (who generated the invite) |
| `expires_at` | timestamptz | invite-level expiry (e.g. 7 days); OTP itself has separate Supabase-managed expiry (~1h) |
| `used_at` | timestamptz | nullable |
| `created_at` | timestamptz | default now() |

**Index**: `token` (unique), `expires_at` (for cleanup queries)

**Check constraint**: `(is_super_admin = true AND publisher_id IS NULL AND congregation_id IS NULL) OR (is_super_admin = false AND publisher_id IS NOT NULL AND congregation_id IS NOT NULL)`

**Note**: `invite` rows are typically used once and then marked `used_at`. If a publisher moves congregations before accepting, the invite becomes invalid (congregation mismatch). This is acceptable — admin should generate a new invite.

### Synthetic Email Strategy

Users never provide an email. The Supabase `auth.users.email` column is populated with a server-generated value of the form `{random-uuid}@invite.local` purely to satisfy Supabase Auth's identifier requirement.

- **Reserved domain**: Use `invite.local` (guaranteed non-routable). Never use a real domain.
- **Generation**: `crypto.randomUUID() + '@invite.local'`, generated server-side in edge functions.
- **Stability**: One synthetic email per user, stable for life. On OTP regeneration, the same `auth.users` row is reused — only a new OTP is minted against the existing email.
- **Admin UI**: filter out `@invite.local` emails from any admin views; show publisher name / "super admin" labels instead.
- **Never exposed to end users.** Only referenced internally and via the pre-auth `get_invite_context` RPC (safe — it's an opaque identifier, not PII; `verifyOtp` still requires the correct 6-digit code).

### Permission Types (for `editor_permission.permission`)

Based on existing schema tables:

| Permission | Description | Tables Affected | Default |
|------------|-------------|-----------------|---------|
| `publisher.edit` | Edit publisher details | `publisher` | No |
| `group.edit` | Edit service groups | `group` | No |
| `midweek.edit` | Edit midweek meeting | `midweek_assignment`, `midweek_meeting_data`, `midweek_participation` | No |
| `weekend.edit` | Edit weekend meeting | `weekend_assignment`, `weekend_participation` | No |
| `speaker.edit` | Edit speakers/outlines | `speaker_assignment`, `speaker_availability`, `speaker_outline`, `outline` | No |
| `av.edit` | Edit AV assignments | `av_assignment`, `av_participation` | No |
| `cleaning.edit` | Edit cleaning schedule | `clean_major`, `clean_minor` | No |
| `event.edit` | Edit events | `event` | No |
| `map.edit` | Edit territory maps | `map`, `map_master` | No |
| `not_at_home.edit` | Edit not-at-home records | `not_at_home` | **Yes** (all members) |
| `address.edit` | Edit street/suburb data | `street`, `suburb` | **Yes** (all members) |
| `do_not_call.edit` | Edit do not call records | `do_not_call` | No |

**Default permissions model**: `not_at_home.edit` and `address.edit` are granted by default to ALL congregation members. To revoke, add an `editor_permission` row with a `revoked` flag.

**Schema addition for revocation**:
Add `granted` boolean column (default `true`) to `editor_permission` table. When `granted = false`, the permission is explicitly revoked.

This allows:
- Default ON: No row needed, permission is implicit
- Explicit grant: Row with `granted = true` (for non-default permissions)
- Explicit revoke: Row with `granted = false` (to override defaults)

### RLS Policies

#### Helper function: `get_user_congregation_ids()`
Returns array of congregation_ids where user is a member (via publisher.user_id).
- Mark as `STABLE` for query planner optimization
- Requires index on `publisher.user_id`

#### Helper function: `is_admin_of(congregation_id)`
Returns true if user has role='admin' for that congregation.
- Mark as `STABLE`

#### Helper function: `has_permission(congregation_id, permission)`
Returns true if user is admin OR has the specific editor_permission (with `granted = true`).
- Mark as `STABLE`

```sql
CREATE OR REPLACE FUNCTION public.has_permission(
  p_congregation_id UUID,
  p_permission TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_is_admin BOOLEAN;
  v_is_default_permission BOOLEAN;
  v_explicit_grant RECORD;
BEGIN
  -- Check if user is admin of this congregation
  SELECT EXISTS (
    SELECT 1 FROM publisher
    WHERE user_id = v_user_id
      AND congregation_id = p_congregation_id
      AND role = 'admin'
  ) INTO v_is_admin;

  IF v_is_admin THEN
    RETURN TRUE;
  END IF;

  -- Check if this is a default-on permission
  v_is_default_permission := p_permission IN ('not_at_home.edit', 'address.edit');

  -- Look for explicit grant/revoke
  SELECT * INTO v_explicit_grant
  FROM editor_permission ep
  JOIN publisher p ON ep.publisher_id = p.id
  WHERE p.user_id = v_user_id
    AND ep.congregation_id = p_congregation_id
    AND ep.permission = p_permission;

  IF FOUND THEN
    -- Explicit row exists: return its granted value
    RETURN v_explicit_grant.granted;
  ELSE
    -- No explicit row: default-on permissions return TRUE, others return FALSE
    RETURN v_is_default_permission;
  END IF;
END;
$$;
```

**Logic**:
- Admin → always TRUE
- Default-on permission (`not_at_home.edit`, `address.edit`) → TRUE unless explicitly revoked (`granted = false`)
- Non-default permission → FALSE unless explicitly granted (`granted = true`)

#### `user_account` table
- **SELECT**: User can read own record OR is super admin
- **INSERT**: Only via invite acceptance flow (service role)
- **UPDATE**: User can update own record
- **DELETE**: Super admin only

#### `editor_permission` table
- **SELECT**: User is admin of the congregation OR is the publisher (can see own permissions)
- **INSERT/UPDATE/DELETE**: User is admin of the publisher's congregation

#### `congregation` table
- **SELECT**: User is member of congregation OR is super admin
- **INSERT**: User is super admin (checked FIRST, before any congregation membership check)
- **UPDATE/DELETE**: User is admin of this congregation OR super admin

**Note**: INSERT policy must check `is_super_admin` from `user_account` table before calling `get_user_congregation_ids()`, since a super admin creating a new congregation won't have any existing memberships.

#### `publisher` table
- **SELECT**: User is member of publisher's congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `publisher.edit` permission

#### `group` table
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `group.edit` permission

#### `midweek_assignment`, `midweek_meeting_data`, `midweek_participation`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `midweek.edit` permission

#### `weekend_assignment`, `weekend_participation`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `weekend.edit` permission

#### `speaker_assignment`, `speaker_availability`, `speaker_outline`, `outline`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `speaker.edit` permission

#### `av_assignment`, `av_participation`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `av.edit` permission

#### `clean_major`, `clean_minor`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `cleaning.edit` permission

#### `event`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `event.edit` permission

#### `map`, `map_master`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `map.edit` permission

#### `not_at_home`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: `has_permission(congregation_id, 'not_at_home.edit')` returns TRUE

#### `street`, `suburb`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: `has_permission(congregation_id, 'address.edit')` returns TRUE

#### `do_not_call`
- **SELECT**: User is member of congregation
- **INSERT/UPDATE/DELETE**: User is admin OR has `do_not_call.edit` permission

#### `editor_permission` table
- **SELECT/INSERT/UPDATE/DELETE**: User is admin of the publisher's congregation

#### `invite` table
- **SELECT**: deny to `authenticated` and `anon`. Pre-auth invite context is exposed only via the `get_invite_context(token)` RPC (SECURITY DEFINER), which returns the synthetic email + display context.
- **INSERT/UPDATE/DELETE**: deny to `authenticated` and `anon`. All writes go through the service-role edge functions (`create_invite`, `regenerate_invite_otp`), which enforce authorization manually:
  - If `is_super_admin = false`: caller must be admin of the publisher's congregation.
  - If `is_super_admin = true`: caller must be a super admin.

### Invite Token Expiry

**Enforcement mechanism**: Application-level check at invite acceptance.
- Query validates `expires_at > now()` and `used_at IS NULL`
- Optional: Supabase cron job to clean up expired/used invites after 30 days

### Required Indexes

```sql
CREATE INDEX idx_publisher_user_id ON publisher(user_id);
CREATE INDEX idx_publisher_congregation_id ON publisher(congregation_id);
CREATE INDEX idx_editor_permission_congregation_id ON editor_permission(congregation_id);
CREATE INDEX idx_editor_permission_publisher_id ON editor_permission(publisher_id);
CREATE UNIQUE INDEX idx_invite_token ON invite(token);
CREATE INDEX idx_invite_expires_at ON invite(expires_at);
```

---

## Phase 2: UI Pages & Components

### Page Placement

**Profile page** (`/settings/profile`) for congregation admins:
- `/settings/profile/admin` → Admin dashboard
- `/settings/profile/admin/users` → User management
- `/settings/profile/admin/users/add` → Add user
- `/settings/profile/admin/users/:publisherId/permissions` → Edit permissions
- `/settings/profile/admin/congregation` → Congregation settings

**Super admin** (visible link in Profile for super admins):
- `/settings/profile/super-admin` → Super admin dashboard
- `/settings/profile/super-admin/congregations` → All congregations
- `/settings/profile/super-admin/users` → All users
- `/settings/profile/super-admin/users/add` → Add congregation admin
- `/settings/profile/super-admin/super-admins` → List super admins
- `/settings/profile/super-admin/super-admins/add` → Add super admin (generate super admin invite)

**Standalone routes**:
- `/invite/:token` → Invite acceptance (no auth required)
- `/onboarding` → New user onboarding

### New Pages (in `src/routes/pages/settings/profile/`)

#### 1. `/settings/profile/super-admin` - Super Admin Dashboard
**File**: `src/routes/pages/settings/profile/super-admin/SuperAdmin.tsx`
- List all congregations
- Create new congregation admin accounts
- View all users across congregations

#### 2. `/settings/profile/super-admin/congregations` - All Congregations
**File**: `src/routes/pages/settings/profile/super-admin/congregations/Congregations.tsx`
- List all congregations
- Actions: View details, Delete

#### 3. `/settings/profile/super-admin/users` - All Users
**File**: `src/routes/pages/settings/profile/super-admin/users/Users.tsx`
- List all users across all congregations
- Create new congregation admin (first user for a congregation)

#### 4. `/settings/profile/super-admin/users/add` - Add Congregation Admin (Multi-step wizard)
**File**: `src/routes/pages/settings/profile/super-admin/users/add/AddUser.tsx`

**Step 1**: Create or select congregation
**Step 2**: Create publisher (first/last name, etc.)
**Step 3**: Review and generate invite link

This is a multi-step wizard due to complexity of creating congregation + publisher + invite in one flow.

#### 4a. `/settings/profile/super-admin/super-admins` - Super Admin List
**File**: `src/routes/pages/settings/profile/super-admin/super-admins/SuperAdmins.tsx`
- List all `user_account` rows where `is_super_admin = true`
- Show created_at, created_by
- Action: Add super admin, Revoke super admin (set `is_super_admin = false`; prevent revoking self; prevent revoking the last super admin)

#### 4b. `/settings/profile/super-admin/super-admins/add` - Add Super Admin
**File**: `src/routes/pages/settings/profile/super-admin/super-admins/add/AddSuperAdmin.tsx`
- Single-step form (optional label/note — not stored on invite by default)
- Generates an `invite` row with `is_super_admin = true`, `publisher_id = null`, `congregation_id = null`, `role = 'super_admin'`
- Displays resulting invite link via `InviteLinkDisplay`

#### 5. `/settings/profile/admin` - Congregation Admin Dashboard
**File**: `src/routes/pages/settings/profile/admin/Admin.tsx`
- Overview of congregation management
- Links to: User Management, Congregation Settings

#### 6. `/settings/profile/admin/users` - User Management
**File**: `src/routes/pages/settings/profile/admin/users/Users.tsx`
- List all publishers with accounts in current congregation
- Show role (admin/editor) and permissions summary
- Actions: Add user, Edit role, Remove user

#### 7. `/settings/profile/admin/users/add` - Add User
**File**: `src/routes/pages/settings/profile/admin/users/add/AddUser.tsx`
- Select existing publisher (required)
- Set role (admin/editor)
- If editor, select permissions
- Generate invite link/code

**Validation**: If selected publisher already has `user_id` set, show error "This publisher already has an account"

#### 8. `/settings/profile/admin/users/:publisherId/permissions` - Edit User Permissions
**File**: `src/routes/pages/settings/profile/admin/users/permissions/UserPermissions.tsx`
- Toggle individual permissions for an editor
- Only visible for editors (admins have all permissions)

#### 9. `/settings/profile/admin/congregation` - Congregation Settings
**File**: `src/routes/pages/settings/profile/admin/congregation/CongregationSettings.tsx`
- Edit congregation details
- Only for admins

### New Pages (standalone)

#### 10. `/invite/:token` - Accept Invite Page
**File**: `src/routes/pages/invite/Invite.tsx`
- User lands here from invite link (URL shared by admin alongside the 6-digit OTP)
- Calls `get_invite_context(token)` RPC → shows context:
  - Congregation invite: congregation name + role
  - Super admin invite: "You've been invited to become a super admin"
- User enters the 6-digit OTP the admin shared out-of-band
- No publisher linkage until OTP is verified and `accept_invite` runs

**Invite acceptance flow**:
1. Page loads, calls `get_invite_context(token)` RPC → receives `{ synthetic_email, role, is_super_admin, congregation_name?, invitee_name? }`.
2. Validates not expired / not used (RPC returns error otherwise).
3. User enters 6-digit OTP.
4. Client calls `supabase.auth.verifyOtp({ email: synthetic_email, token: otp, type: 'email' })`. Session established.
5. Client calls `accept_invite(token)` RPC → links `auth.uid()` to publisher (or sets super admin), marks invite used.
6. Redirects to home (or `/onboarding` if congregation admin with no congregation yet).

**Error states**:
- Invalid token → "Invite not found"
- Expired invite → "Invite has expired, contact your admin"
- Already used → "Invite has already been used"
- Publisher already has account → "This publisher already has an account"
- Wrong/expired OTP → "Invalid code — ask your admin to regenerate"

**Invite link format**: Copy-paste URL (e.g., `https://app.example.com/invite/abc123`) delivered alongside the 6-digit OTP via any channel the admin chooses.

#### 10a. `/recover/:userId` - Recover Access
**File**: `src/routes/pages/recover/Recover.tsx`
- Admin-initiated recovery flow for users who lost their session.
- Admin clicks "Send new code" on a user row → edge function `regenerate_user_otp` returns `{ otp, recover_url }` → admin shares both out-of-band.
- User visits `/recover/:userId`, enters the 6-digit OTP.
- Client calls a small RPC `get_user_synthetic_email(user_id)` (SECURITY DEFINER, returns only the synthetic email for the given user id) → then `supabase.auth.verifyOtp({ email, token: otp, type: 'email' })`.
- On success, redirects to home. No `accept_invite` call (user is already accepted).

**Security note**: `get_user_synthetic_email` exposes opaque synthetic emails by user id. Since they're non-PII and `verifyOtp` still requires a rate-limited 6-digit code, this is safe. Alternatively, encode the synthetic email directly in the recovery URL (base64) to avoid the extra RPC.

#### 11. `/onboarding` - New Admin Onboarding
**File**: `src/routes/pages/onboarding/Onboarding.tsx`
- For newly registered admins without a congregation
- Create congregation form

### Profile Page Update
Add "Admin" link to `/settings/profile` (visible only to admins/editors).
Add "Super Admin" link (visible only to super admins).

### New Components

#### Feature Components (`src/feature/admin/`)
- `user-list/UserList.tsx` - List of publishers with accounts
- `user-list-item/UserListItem.tsx` - Single user row with role badge
- `add-user-form/AddUserForm.tsx` - Form for adding users
- `permission-toggles/PermissionToggles.tsx` - Permission checkboxes grouped by category (uses `PERMISSIONS` constant)
- `role-select/RoleSelect.tsx` - Admin/Editor selector
- `invite-code-display/InviteCodeDisplay.tsx` - Show/copy the 6-digit OTP and claim URL with expiry countdown; includes "Regenerate code" action

#### Feature Components (`src/feature/super-admin/`)
- `congregation-list/CongregationList.tsx` - List all congregations
- `congregation-list-item/CongregationListItem.tsx` - Single congregation row
- `create-congregation-form/CreateCongregationForm.tsx` - Form to create congregation + admin

#### Hooks (`src/feature/admin/hooks/`)
- `useCurrentUserRole.ts` - Get current user's role in congregation
- `useUserPermissions.ts` - Get current user's permissions (returns `Permission[]`)
- `usePublishersWithAccounts.ts` - Query publishers with user_id set
- `useCanEdit.ts` - Check if user can edit specific resource
  - Interface: `useCanEdit(permission: Permission): boolean`
  - Calls `has_permission()` RPC (which handles default-on logic server-side)
  - Uses TanStack Query with appropriate `staleTime` to avoid caching stale permissions
  - Invalidate query on permission changes via `queryClient.invalidateQueries(['permissions'])`
- `useGenerateInvite.ts` - Calls `create_invite` edge function; returns `{ invite_token, otp }`
- `useRegenerateInviteOtp.ts` - Calls `regenerate_invite_otp` edge function for a pending invite
- `useRegenerateUserOtp.ts` - Calls `regenerate_user_otp` edge function for an already-accepted user who has lost their session

#### Constants (`src/constants/`)
- `permissions.ts` - Single source of truth for permission definitions

```typescript
export const PERMISSIONS = {
  PUBLISHER_EDIT: 'publisher.edit',
  GROUP_EDIT: 'group.edit',
  MIDWEEK_EDIT: 'midweek.edit',
  WEEKEND_EDIT: 'weekend.edit',
  SPEAKER_EDIT: 'speaker.edit',
  AV_EDIT: 'av.edit',
  CLEANING_EDIT: 'cleaning.edit',
  EVENT_EDIT: 'event.edit',
  MAP_EDIT: 'map.edit',
  NOT_AT_HOME_EDIT: 'not_at_home.edit',
  ADDRESS_EDIT: 'address.edit',
  DO_NOT_CALL_EDIT: 'do_not_call.edit',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const DEFAULT_PERMISSIONS: Permission[] = [
  PERMISSIONS.NOT_AT_HOME_EDIT,
  PERMISSIONS.ADDRESS_EDIT,
];
```

### Auth Updates (`src/services/app/auth/`)
- Update `useAuth.ts` to fetch user role/permissions after login
- Add `useIsSuperAdmin.ts` - Check if current user is super admin
- Add `RoleGuard.tsx` - Route guard checking role
- Add `PermissionGate.tsx` - Component wrapper for permission checks

---

## Phase 3: Implementation Order

### Step 1: Mock Data UI (No DB)
1. Create permissions constants file first
2. Create all pages with hardcoded mock data
3. Build all UI components
4. Test navigation and UX flow
5. **Pages to create**:
   - Profile page update (add Admin/Super Admin links)
   - Super admin: dashboard, congregations list, users list, add user (wizard)
   - Admin: dashboard, users list, add user, permissions, congregation settings
   - Invite acceptance page (with error states)
   - Onboarding page

### Step 2: SQL Migration Files + TanStack Schemas (together)
Create migration files in `supabase/migrations/` alongside TanStack schemas for validation:

1. `YYYYMMDDHHMMSS_add_publisher_role_columns.sql` - Add `user_id`, `role` to publisher + indexes
2. `YYYYMMDDHHMMSS_create_user_account.sql`
3. `YYYYMMDDHHMMSS_create_editor_permission.sql` - Includes `congregation_id`, `granted` columns
4. `YYYYMMDDHHMMSS_create_invite.sql` - Includes `congregation_id`, `role` columns
5. `YYYYMMDDHHMMSS_add_rls_policies.sql` - All policies + helper functions
6. `YYYYMMDDHHMMSS_add_indexes.sql` - All required indexes

**Simultaneously update/create TanStack schemas**:
- Update `publisher/publisherSchema.ts` - Add `user_id` and `role`
- Create `user_account/userAccountSchema.ts`
- Create `editor_permission/editorPermissionSchema.ts`
- Create `invite/inviteSchema.ts`

### Step 3: TanStack Collections
Create collections using the schemas:
- `user_account/userAccountCollection.ts`
- `editor_permission/editorPermissionCollection.ts`
- `invite/inviteCollection.ts`

### Step 4: Connect UI to Database
Replace mock data with real queries.

### Step 5: Auth Flow Integration
- Create edge functions for invite creation and OTP regeneration (service role)
- Create `get_invite_context` RPC and `accept_invite` RPC
- Implement invite acceptance flow (OTP entry, `verifyOtp`, `accept_invite`)
- Add role/permission checks to existing features

#### Edge Function: `create_invite`
**Location**: `supabase/functions/create_invite/index.ts`

Authorizes caller (admin of congregation for normal invites; super admin for super-admin invites), then:
1. Generates synthetic email: `${crypto.randomUUID()}@invite.local`.
2. `supabase.auth.admin.createUser({ email, email_confirm: true })` → gets `auth_user_id`.
3. `supabase.auth.admin.generateLink({ type: 'magiclink', email })` → gets `email_otp`.
4. Inserts `invite` row (`token`, `auth_user_id`, `publisher_id`/`congregation_id`/`is_super_admin`/`role`, `expires_at`, `created_by`).
5. Returns `{ invite_token, otp }` — one-time response; OTP is never stored in our DB.

#### Edge Function: `regenerate_invite_otp`
**Location**: `supabase/functions/regenerate_invite_otp/index.ts`

Same authorization as `create_invite`. For a pending (unused, unexpired) invite:
1. Looks up invite by token; reads `auth_user_id` → synthetic email.
2. `supabase.auth.admin.generateLink({ type: 'magiclink', email })` → new OTP (invalidates previous).
3. Returns `{ otp }`.

#### Edge Function: `regenerate_user_otp`
**Location**: `supabase/functions/regenerate_user_otp/index.ts`

For already-accepted users who have lost their session. Authorizes caller (admin of the user's congregation, or super admin for super-admin users). Given `publisher_id` or `user_account.id`:
1. Reads `auth.users.email` for that user (the synthetic email).
2. `supabase.auth.admin.generateLink({ type: 'magiclink', email })` → new OTP.
3. Returns `{ otp, recover_url }` where `recover_url` is `/recover/:user_id`.

#### RPC: `get_invite_context(p_token TEXT)`
`SECURITY DEFINER`, `STABLE`. Callable unauthenticated.

```sql
CREATE OR REPLACE FUNCTION public.get_invite_context(p_token TEXT)
RETURNS JSON
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invite RECORD;
  v_email TEXT;
  v_congregation_name TEXT;
  v_invitee_name TEXT;
BEGIN
  SELECT i.*, au.email AS synthetic_email INTO v_invite
  FROM invite i
  JOIN auth.users au ON au.id = i.auth_user_id
  WHERE i.token = p_token
    AND i.expires_at > NOW()
    AND i.used_at IS NULL;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'INVALID_OR_EXPIRED_INVITE');
  END IF;

  IF NOT v_invite.is_super_admin THEN
    SELECT name INTO v_congregation_name FROM congregation WHERE id = v_invite.congregation_id;
    SELECT first_name || ' ' || last_name INTO v_invitee_name FROM publisher WHERE id = v_invite.publisher_id;
  END IF;

  RETURN json_build_object(
    'success', true,
    'synthetic_email', v_invite.synthetic_email,
    'role', v_invite.role,
    'is_super_admin', v_invite.is_super_admin,
    'congregation_name', v_congregation_name,
    'invitee_name', v_invitee_name
  );
END;
$$;
```

**Security**: Exposing the synthetic email pre-auth is safe — it's an opaque internal identifier, not PII, and `verifyOtp` still requires the correct 6-digit code (rate-limited by Supabase).

#### Supabase Function: `accept_invite`

**Location**: `supabase/functions/accept_invite.sql`

```sql
CREATE OR REPLACE FUNCTION public.accept_invite(p_token TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER  -- runs with elevated privileges
SET search_path = public  -- prevent schema shadowing attacks
AS $$
DECLARE
  v_user_id UUID := auth.uid();  -- Get user ID securely from auth context
  v_invite RECORD;
  v_publisher RECORD;
BEGIN
  -- 0. Ensure user is authenticated
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'NOT_AUTHENTICATED');
  END IF;

  -- 1. Fetch and validate invite
  SELECT * INTO v_invite
  FROM invite
  WHERE token = p_token
    AND expires_at > NOW()
    AND used_at IS NULL;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'INVALID_OR_EXPIRED_INVITE');
  END IF;

  -- 2. Check user doesn't already have an account (applies to both flows)
  IF EXISTS (SELECT 1 FROM user_account WHERE id = v_user_id) THEN
    RETURN json_build_object('success', false, 'error', 'USER_ALREADY_HAS_ACCOUNT');
  END IF;

  -- 3. Branch: super admin invite vs congregation invite
  IF v_invite.is_super_admin THEN
    -- Super admin flow: no publisher, no congregation
    INSERT INTO user_account (id, created_at, created_by, is_super_admin)
    VALUES (v_user_id, NOW(), v_invite.created_by, true);
  ELSE
    -- Congregation flow: must have a publisher to link
    SELECT * INTO v_publisher
    FROM publisher
    WHERE id = v_invite.publisher_id;

    IF v_publisher.user_id IS NOT NULL THEN
      RETURN json_build_object('success', false, 'error', 'PUBLISHER_HAS_ACCOUNT');
    END IF;

    INSERT INTO user_account (id, created_at, created_by, is_super_admin)
    VALUES (v_user_id, NOW(), v_invite.created_by, false);

    UPDATE publisher
    SET user_id = v_user_id, role = v_invite.role
    WHERE id = v_invite.publisher_id;
  END IF;

  -- 4. Mark invite as used
  UPDATE invite
  SET used_at = NOW()
  WHERE id = v_invite.id;

  -- 5. Return success
  RETURN json_build_object(
    'success', true,
    'congregation_id', v_invite.congregation_id,  -- null for super admin
    'role', v_invite.role,
    'is_super_admin', v_invite.is_super_admin
  );
END;
$$;
```

**Parameters**:
- `p_token`: The invite token from URL

**Security**: Uses `auth.uid()` internally instead of accepting user ID as parameter. This prevents malicious callers from hijacking other users' accounts.

**Returns**:
- `{ success: true, congregation_id: uuid | null, role: string, is_super_admin: boolean }` on success
- `{ success: false, error: 'NOT_AUTHENTICATED' | 'INVALID_OR_EXPIRED_INVITE' | 'PUBLISHER_HAS_ACCOUNT' | 'USER_ALREADY_HAS_ACCOUNT' }` on failure

**Called from**: Client after `supabase.auth.verifyOtp` succeeds (session is established).

### Step 6: Testing
- Happy-path tests for invite flow
- RLS policy tests (can user X access resource Y?)
- Edge case tests (expired invite, used invite, publisher with existing account)

---

## File Structure Summary

```
src/constants/
└── permissions.ts

src/routes/pages/settings/profile/
├── Profile.tsx (update: add Admin/Super Admin links)
├── admin/
│   ├── Admin.tsx
│   ├── users/
│   │   ├── Users.tsx
│   │   ├── add/
│   │   │   └── AddUser.tsx
│   │   └── permissions/
│   │       └── UserPermissions.tsx
│   └── congregation/
│       └── CongregationSettings.tsx
└── super-admin/
    ├── SuperAdmin.tsx
    ├── congregations/
    │   └── Congregations.tsx
    ├── users/
    │   ├── Users.tsx
    │   └── add/
    │       └── AddUser.tsx (multi-step wizard)
    └── super-admins/
        ├── SuperAdmins.tsx
        └── add/
            └── AddSuperAdmin.tsx

src/routes/pages/
├── invite/
│   └── Invite.tsx
├── recover/
│   └── Recover.tsx
└── onboarding/
    └── Onboarding.tsx

src/feature/admin/
├── user-list/
│   └── UserList.tsx
├── user-list-item/
│   └── UserListItem.tsx
├── add-user-form/
│   └── AddUserForm.tsx
├── permission-toggles/
│   └── PermissionToggles.tsx
├── role-select/
│   └── RoleSelect.tsx
├── invite-code-display/
│   └── InviteCodeDisplay.tsx
└── hooks/
    ├── useCurrentUserRole.ts
    ├── useUserPermissions.ts
    ├── usePublishersWithAccounts.ts
    ├── useCanEdit.ts
    ├── useGenerateInvite.ts
    ├── useRegenerateInviteOtp.ts
    └── useRegenerateUserOtp.ts

src/feature/super-admin/
├── congregation-list/
│   └── CongregationList.tsx
├── congregation-list-item/
│   └── CongregationListItem.tsx
└── create-congregation-form/
    └── CreateCongregationForm.tsx

src/services/state/tanstack/db/
├── publisher/
│   └── publisherSchema.ts (update: add user_id, role)
├── user_account/
│   ├── userAccountSchema.ts
│   └── userAccountCollection.ts
├── editor_permission/
│   ├── editorPermissionSchema.ts
│   └── editorPermissionCollection.ts
└── invite/
    ├── inviteSchema.ts
    └── inviteCollection.ts

supabase/migrations/
├── YYYYMMDDHHMMSS_add_publisher_role_columns.sql
├── YYYYMMDDHHMMSS_create_user_account.sql
├── YYYYMMDDHHMMSS_create_editor_permission.sql
├── YYYYMMDDHHMMSS_create_invite.sql
├── YYYYMMDDHHMMSS_add_rls_policies.sql
└── YYYYMMDDHHMMSS_add_invite_rpcs.sql  # get_invite_context, accept_invite

supabase/functions/
├── create_invite/
│   └── index.ts
├── regenerate_invite_otp/
│   └── index.ts
└── regenerate_user_otp/
    └── index.ts
```
