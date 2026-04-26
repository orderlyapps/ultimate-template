# This is the workflows I want to provide.

## 1. Provide Initial Login

1. Provide a list of publishers that have an auth_id to the admin.
2. Next to each publisher provide a button that generates a OTP. 
3. Once the OTP is generated it should be displayed to the admin along with the option to send it via sms.
4. If the admin chooses to send open an sms with the OTP prefilled along with the phone number if matched in `src/services/state/tanstack/db/publisher-local`

## 2. Provide Sign in With Code

1. In the Profile page provide a Sign In With Code button that opens a modal and displays an Ionic OTP Input.
2. Once the code is entered sign the user in using an email using the publisher.id found using `src/feature/db/publisher/user-publisher/get-user-publisher/getUserPublisher.ts` + `@proclaimer.app`

## 3. Allow user to generate OTP for themself

1. Provide a button for the user to generate a OTP for themself using using an email using the publisher.id found using `src/feature/db/publisher/user-publisher/get-user-publisher/getUserPublisher.ts` + `@proclaimer.app`
2. The OTP should be displayed on the screen and the user can manually enter the OTP on another device to sign themself in

## Implementation Details
1. Database
Create an auth_otp_log table with columns: id (uuid), email (text), otp (text), created_at (timestamptz), used_at (timestamptz), sent_by_admin_at (timestamptz), sent_by_admin_id (uuid). Enable RLS on this table.

2. OTP Hook
Implement a Supabase send_email hook (Postgres function or Edge Function) that intercepts the OTP before it is emailed and inserts it into auth_otp_log instead. The hook should return { success: true } to suppress the real email.

3. RLS Policies
Write two RLS select policies: one allowing users to read only rows where id = auth.uid(), and one allowing users in an admins table to read all rows.

4. Cross-device login
On an authenticated device, query the latest unused OTP for the current user and display the 6-digit code on screen for the user to manually type on the second device. Auto-hide after 60 seconds. On the second device, call supabase.auth.verifyOtp() with the token to complete login.

5. Admin delivery
An Admin is provided a button to retrieve an OTP for the user. Build an Edge Function that verifies the caller is in the admins table, fetches an unused OTP by ID from auth_otp_log, delivers it via a prefilled sms message, then stamps sent_by_admin_at and sent_by_admin_id on the row.

6. Security
Mark used_at = now() when an OTP is fetched for display or delivery. Delete rows older than 10 minutes via a scheduled Postgres job. Never expose the OTP table to unauthenticated requests.

## NOTES

- Provide me with any code I need to manually add to my supabase database