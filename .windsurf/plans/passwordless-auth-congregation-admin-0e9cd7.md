
after creating the new auth user a button should be provided for the admin to generate an OTP and have it prefilled into an sms message with the phone number if there is a match found in @publisher-local 

create a new component in @Profile.tsx  using a IonInputOtp component to allow the user to enter the otp that their admin should be able to generate.

This feature will require sql code being added to the remote supabase database. You will need to provide this code to me and I can add it manually.

i have two functions called create_publisher_auth_user and generate_publisher_otp. Let me know if I can delete them or you can update them if you need.

make a new plan but look at  @passwordless-auth-congregation-admin-0e9cd7.md for ideas on how to implement. DO NOT COPY @passwordless-auth-congregation-admin-0e9cd7.md . What I want is more simplified without the permissions for now

1. Database
Create an auth_otp_log table with columns: id (uuid), email (text), otp (text), created_at (timestamptz), used_at (timestamptz), sent_by_admin_at (timestamptz), sent_by_admin_id (uuid). Enable RLS on this table.

2. OTP Hook
Implement a Supabase send_email hook (Postgres function or Edge Function) that intercepts the OTP before it is emailed and inserts it into auth_otp_log instead. The hook should return { success: true } to suppress the real email.

3. RLS Policies
Write two RLS select policies: one allowing users to read only rows where id = auth.uid(), and one allowing users in an admins table to read all rows.

4. Cross-device login
On an authenticated device, query the latest unused OTP for the current user and either (A) display the 6-digit code on screen for the user to manually type on the second device, or (B) encode it into a deep link and render it as a QR code. Auto-hide after 60 seconds. On the second device, call supabase.auth.verifyOtp() with the token to complete login.

5. Admin delivery
An Admin is provided a button to retrieve an OTP for the user. Build an Edge Function that verifies the caller is in the admins table, fetches an unused OTP by ID from auth_otp_log, delivers it via a prefilled sms message, then stamps sent_by_admin_at and sent_by_admin_id on the row.

6. Security
Mark used_at = now() when an OTP is fetched for display or delivery. Delete rows older than 10 minutes via a scheduled Postgres job. Never expose the OTP table to unauthenticated requests.