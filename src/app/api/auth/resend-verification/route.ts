import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { sendVerificationEmail, generateToken } from '@/lib/email';

// Rate limiting: Store last request time per email (in-memory)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 60 seconds

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Rate limiting check
    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(email.toLowerCase());
    
    if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW) {
      const remainingTime = Math.ceil((RATE_LIMIT_WINDOW - (now - lastRequestTime)) / 1000);
      return NextResponse.json(
        { error: `Please wait ${remainingTime} seconds before requesting another email` },
        { status: 429 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, a verification link has been sent.',
      });
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: 'This email is already verified' },
        { status: 400 }
      );
    }

    // Generate new verification token
    const verificationToken = generateToken();
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, user.name, verificationToken);

    // Update rate limit
    rateLimitMap.set(email.toLowerCase(), now);

    // Clean up old entries from rate limit map (keep last hour only)
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value > 3600000) { // 1 hour
        rateLimitMap.delete(key);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent! Please check your inbox.',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email. Please try again.' },
      { status: 500 }
    );
  }
}
