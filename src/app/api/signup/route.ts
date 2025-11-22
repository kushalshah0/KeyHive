import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { hashPassword, setSession } from '@/lib/auth';
import { signupSchema } from '@/lib/validators';
import { sendVerificationEmail, generateToken } from '@/lib/email';

const isDev = process.env.NODE_ENV !== 'production';

const formatSignupError = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes('JWT_SECRET')) {
      return 'Server configuration error: JWT secret is missing.';
    }
    if (error.message.includes('MONGODB_URI') || error.message.includes('MongoDB connection failed')) {
      // In dev, show the full error message for debugging
      if (isDev) {
        return error.message;
      }
      return 'Server configuration error: Mongo connection is unavailable.';
    }
    if (isDev) {
      return error.message;
    }
  }
  return 'Unable to complete signup. Please try again shortly.';
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = signupSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 });
    }

    const { email, name, password } = parsed.data;
    await connectToDatabase();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    
    // Generate verification token
    const verificationToken = generateToken();
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const user = await User.create({ 
      name, 
      email: email.toLowerCase(), 
      passwordHash,
      isVerified: false,
      verificationToken,
      verificationTokenExpiry,
    });

    // Send verification email
    try {
      await sendVerificationEmail(user.email, user.name, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with signup even if email fails
    }

    await setSession({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
        },
        message: 'Account created! Please check your email to verify your account.',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Signup error', error);
    return NextResponse.json({ error: formatSignupError(error) }, { status: 500 });
  }
}

