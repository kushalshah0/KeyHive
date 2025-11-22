# Email Verification and Password Reset

This document explains the email verification and password reset features implemented in KeyHive.

## Features

### 1. Email Verification
- **Automatic on Signup**: When users sign up, they receive a verification email
- **24-hour Token Expiry**: Verification links expire after 24 hours
- **Resend Option**: Users can request a new verification email if needed
- **Welcome Email**: Users receive a welcome email after successful verification

### 2. Password Reset
- **Forgot Password Flow**: Users can request a password reset link
- **1-hour Token Expiry**: Reset links expire after 1 hour for security
- **Secure Token Generation**: Uses crypto.randomBytes for secure tokens
- **Email Enumeration Protection**: Doesn't reveal if an email exists in the system

## User Flow

### Email Verification Flow
1. User signs up at `/signup`
2. Account is created with `isVerified: false`
3. Verification email is sent with a unique token
4. User clicks the link in the email
5. Token is validated at `/verify-email`
6. Account is marked as verified
7. Welcome email is sent
8. User is redirected to login

### Password Reset Flow
1. User clicks "Forgot password?" on login page
2. User enters email at `/forgot-password`
3. Reset email is sent (if account exists)
4. User clicks the link in the email
5. User enters new password at `/reset-password`
6. Password is updated and tokens are cleared
7. User is redirected to login

## API Endpoints

### POST `/api/auth/verify-email`
Verifies a user's email address.

**Request Body:**
```json
{
  "token": "verification-token-from-email"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully! You can now log in."
}
```

### POST `/api/auth/resend-verification`
Resends verification email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification email sent! Please check your inbox."
}
```

### POST `/api/auth/forgot-password`
Initiates password reset process.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "If an account exists with this email, a password reset link has been sent."
}
```

### POST `/api/auth/reset-password`
Resets user password.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "newPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully! You can now log in with your new password."
}
```

## Frontend Pages

### `/verify-email`
- Handles email verification from link
- Shows loading, success, or error state
- Auto-redirects to login on success

### `/resend-verification`
- Form to resend verification email
- Accessible from login page
- Shows success/error messages

### `/forgot-password`
- Form to request password reset
- Accessible from login page via "Forgot password?" link
- Shows success/error messages

### `/reset-password`
- Form to enter new password
- Requires valid token in URL
- Shows password and confirm password fields
- Validates password strength (min 8 characters)

## Database Schema

### User Model Updates
```typescript
{
  name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;                    // NEW
  verificationToken?: string;             // NEW
  verificationTokenExpiry?: Date;         // NEW
  resetPasswordToken?: string;            // NEW
  resetPasswordTokenExpiry?: Date;        // NEW
  createdAt: Date;
}
```

## Email Templates

All emails use a consistent branded template with:
- KeyHive header with gradient
- Clear call-to-action buttons
- Expiry warnings
- Security notices
- Footer with branding

### Template Types
1. **Verification Email**: Sent on signup
2. **Welcome Email**: Sent after verification
3. **Password Reset Email**: Sent on forgot password request

## Configuration

### Environment Variables

Add to your `.env.local`:

```bash
# App URL (for email links)
NEXT_PUBLIC_APP_URL=https://keyhive.qzz.io

# SMTP Configuration (required for emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
```

### Gmail Setup
1. Enable 2-Step Verification in Google Account
2. Generate App Password at https://myaccount.google.com/apppasswords
3. Use the App Password (not regular Gmail password)

## Security Features

- **Secure Token Generation**: Uses `crypto.randomBytes(32)` for tokens
- **Token Expiry**: Verification (24h), Reset (1h)
- **Email Enumeration Protection**: Doesn't reveal if email exists
- **Password Validation**: Minimum 8 characters
- **Automatic Token Cleanup**: Tokens removed after use
- **HTTPS Required**: Email links use HTTPS

## Testing

### Test Email Verification
1. Sign up with a new account
2. Check email for verification link
3. Click link and verify account
4. Log in with verified account

### Test Password Reset
1. Go to login page
2. Click "Forgot password?"
3. Enter your email
4. Check email for reset link
5. Click link and enter new password
6. Log in with new password

### Test Resend Verification
1. Sign up but don't verify
2. Go to login page
3. Click "Resend" link under login form
4. Enter your email
5. Check for new verification email

## Troubleshooting

### Emails Not Sending
- Check SMTP credentials in `.env.local`
- Verify App Password is correct (for Gmail)
- Check server logs for SMTP errors
- Ensure SMTP_FROM matches authenticated user

### Verification Link Not Working
- Check if token has expired (24h limit)
- Verify NEXT_PUBLIC_APP_URL is correct
- Check browser console for errors
- Try requesting a new verification email

### Reset Link Not Working
- Check if token has expired (1h limit)
- Verify NEXT_PUBLIC_APP_URL is correct
- Try requesting a new reset link

## Future Enhancements

Potential improvements:
- [ ] Rate limiting on email sends
- [ ] Email verification required before login
- [ ] Email change verification
- [ ] Remember verification status in session
- [ ] Admin panel to manually verify users
- [ ] Email delivery status tracking
- [ ] Multi-factor authentication (MFA)
