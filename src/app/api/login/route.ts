import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { comparePassword, setSession } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';

const isDev = process.env.NODE_ENV !== 'production';

const formatLoginError = (error: unknown) => {
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
  return 'Unable to complete login. Please try again shortly.';
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = loginSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const { email, password } = parsed.data;
    await connectToDatabase();
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    await setSession({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
      requiresVerification: !user.isVerified,
    });
  } catch (error) {
    console.error('Login error', error);
    return NextResponse.json({ error: formatLoginError(error) }, { status: 500 });
  }
}

