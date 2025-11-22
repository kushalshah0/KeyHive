import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to admin/support
    const adminMailOptions = {
      from: `"KeyHive Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1b88f2 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #6b7280; font-size: 14px; }
              .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e5e7eb; }
              .footer { text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">FROM</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">EMAIL</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">SUBJECT</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">MESSAGE</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  Received on ${new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      replyTo: email,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: `"KeyHive" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting KeyHive',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1b88f2 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px; }
              .button { display: inline-block; background: linear-gradient(135deg, #1b88f2 0%, #1976d2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px; letter-spacing: 0.3em;">KEYHIVE</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Password security built for humans</p>
              </div>
              <div class="content">
                <h2 style="color: #1b88f2; margin-top: 0;">Thank you for reaching out!</h2>
                <p>Hi ${name},</p>
                <p>We've received your message and will get back to you as soon as possible. Our team typically responds within 24 hours.</p>
                <p><strong>Your message:</strong></p>
                <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #1b88f2; margin: 15px 0;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
                <p>If you have any urgent concerns, please don't hesitate to reach out to us directly at <a href="mailto:support@keyhive.qzz.io" style="color: #1b88f2;">support@keyhive.qzz.io</a></p>
                <div style="text-align: center;">
                  <a href="https://keyhive.qzz.io" class="button">Visit KeyHive</a>
                </div>
                <div class="footer">
                  © 2024 KeyHive. All rights reserved.
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log('Contact form emails sent successfully:', {
      name,
      email,
      subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for your message! We\'ve sent you a confirmation email and will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
