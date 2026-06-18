
## Goal

Lock the `/admin` dashboard behind a one-time email token sent to **esmailmalik86@gmail.com** (super admin). Once inside, the super admin can grant other users `editor` / `viewer` privileges to manage products, prices, guides, etc.

## How access will work (user-facing)

1. User signs in normally at `/auth` (email + password).
2. On hitting `/admin`, if they don't already have a valid admin session token, they're shown a "Request access code" screen.
3. Clicking the button emails a 6-digit code (valid 10 min, single-use) **only to esmailmalik86@gmail.com** — no matter who clicked.
4. The super admin enters the code → gets a signed admin session (httpOnly cookie, 8 h) → dashboard unlocks.
5. Inside the dashboard, an existing "Users" tab lets the super admin grant `admin`, `editor`, or `viewer` roles to other signed-in users. Those users skip the email-code step (their role already grants access) but still need to be signed in.

Super admin = the single account whose email is `esmailmalik86@gmail.com`. Bootstrapping: first time that email signs up / signs in, they're auto-granted the `admin` role (replaces the current "Claim first-admin" button).

## What gets built

**Database (1 migration)**
- New table `admin_access_codes` (code_hash, expires_at, used_at, requested_by_user_id) with RLS — service role only.
- Settings row `super_admin_email = 'esmailmalik86@gmail.com'`.
- Trigger on `auth.users` insert: if email matches super admin email, insert `admin` role automatically.

**Email delivery**
- Use Lovable Emails (built-in). Requires an email domain — if none configured yet, the setup dialog will appear once and the rest continues automatically.
- New React Email template `admin-access-code.tsx` (branded, shows the 6-digit code, expiry, "ignore if you didn't request this").
- Hard-coded recipient = super admin email from settings (never the requester's email).

**Server functions (`src/lib/admin-access.functions.ts`)**
- `requestAdminCode()` — auth required; generates code, stores hash, emails super admin. Rate-limited (max 1 per 60 s, 5 per hour).
- `verifyAdminCode({ code })` — checks hash + expiry, marks used, sets `noyis_admin_session` httpOnly signed cookie (8 h). Only succeeds if caller's email == super admin email OR caller already has `admin`/`editor`/`viewer` role.
- `revokeAdminSession()` — clears cookie.

**Route protection**
- Update `src/routes/_authenticated/route.tsx` (or add `_authenticated/admin` guard) to additionally require: valid admin-session cookie **OR** user has a role in `user_roles`. Otherwise redirect to a new `/admin/unlock` page that shows the request-code / enter-code UI.
- Existing per-table RLS already enforces editor/admin writes — no change.

**Admin UI tweaks**
- Remove the "Claim first-admin role" button (replaced by the trigger).
- Add a small "Lock dashboard" button in the header that calls `revokeAdminSession`.
- Users tab unchanged in shape; it already supports role assignment.

## Out of scope
- SMS / TOTP / hardware-key MFA.
- Changing the super admin email through the UI (it lives in `settings` and can be edited via SQL if ever needed).

## Confirm before I build
1. **Email domain**: do you already have one configured in Lovable, or should I trigger the setup dialog as part of this work?
2. **Privileged roles for non-super-admins**: should `editor` and `viewer` users *also* be required to enter an email code each session (which would still go to esmailmalik86@gmail.com), or skip the code once they have a role assigned (my current plan)?
