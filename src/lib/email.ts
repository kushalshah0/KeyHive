import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Create reusable transporter
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Generate a secure random token
export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Email template wrapper
const emailTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #1b88f2 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
      .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
      .footer { text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px; }
      .button { display: inline-block; background: linear-gradient(135deg, #1b88f2 0%, #1976d2 100%); color: white !important; padding: 14px 32px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
      .button:hover { opacity: 0.9; }
      .info-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #1b88f2; margin: 15px 0; }
      .warning-box { background: #fef3c7; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b; margin: 15px 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin: 0; font-size: 32px; letter-spacing: 0.3em;">KEYHIVE</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Password security built for humans</p>
      </div>
      <div class="content">
        <h2 style="color: #1b88f2; margin-top: 0;">${title}</h2>
        ${content}
        <div class="footer">
          © 2024 KeyHive. All rights reserved.<br>
          If you didn't request this email, please ignore it.
        </div>
      </div>
    </div>
  </body>
</html>
`;

// Send verification email
export const sendVerificationEmail = async (email: string, name: string, token: string) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://keyhive.qzz.io'}/verify-email?token=${token}`;
  
  const content = `
    <p>Hi ${name},</p>
    <p>Thank you for signing up for KeyHive! To complete your registration and start securing your passwords, please verify your email address.</p>
    <div style="text-align: center;">
      <a href="${verificationUrl}" class="button">Verify Email Address</a>
    </div>
    <p>Or copy and paste this link into your browser:</p>
    <div class="info-box">
      <a href="${verificationUrl}" style="color: #1b88f2; word-break: break-all;">${verificationUrl}</a>
    </div>
    <div class="warning-box">
      <strong>⏰ This link will expire in 24 hours.</strong>
    </div>
    <p>Once verified, you'll have full access to KeyHive's secure password management features.</p>
  `;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"KeyHive" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verify Your KeyHive Account',
    html: emailTemplate(content, 'Verify Your Email'),
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string, name: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://keyhive.qzz.io'}/reset-password?token=${token}`;
  
  const content = `
    <p>Hi ${name},</p>
    <p>We received a request to reset your password for your KeyHive account. Click the button below to create a new password:</p>
    <div style="text-align: center;">
      <a href="${resetUrl}" class="button">Reset Password</a>
    </div>
    <p>Or copy and paste this link into your browser:</p>
    <div class="info-box">
      <a href="${resetUrl}" style="color: #1b88f2; word-break: break-all;">${resetUrl}</a>
    </div>
    <div class="warning-box">
      <strong>⏰ This link will expire in 1 hour.</strong>
    </div>
    <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
    <p>For security reasons, we recommend changing your password if you didn't make this request.</p>
  `;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"KeyHive" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset Your KeyHive Password',
    html: emailTemplate(content, 'Reset Your Password'),
  });
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email: string, name: string) => {
  const content = `
    <p>Hi ${name},</p>
    <p>Welcome to KeyHive! 🎉 Your email has been verified and your account is now fully activated.</p>
    <p>You can now enjoy all the features KeyHive has to offer:</p>
    <ul style="line-height: 2;">
      <li>🔐 Secure password storage with military-grade encryption</li>
      <li>🔄 Automatic password generation</li>
      <li>📱 Access from any device</li>
      <li>🚀 Quick password retrieval</li>
    </ul>
    <div style="text-align: center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://keyhive.qzz.io'}/dashboard" class="button">Go to Dashboard</a>
    </div>
    <p>If you have any questions or need help getting started, feel free to reach out to us at <a href="mailto:support@keyhive.qzz.io" style="color: #1b88f2;">support@keyhive.qzz.io</a></p>
  `;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"KeyHive" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: 'Welcome to KeyHive! 🎉',
    html: emailTemplate(content, 'Welcome to KeyHive!'),
  });
};
