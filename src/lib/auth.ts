import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';

const SESSION_COOKIE = 'pm_session';

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
}

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return secret;
};

export const hashPassword = (plain: string) => bcrypt.hash(plain, 12);

export const comparePassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

const signToken = (payload: SessionPayload) =>
  jwt.sign(payload, getJwtSecret(), {
    expiresIn: '7d',
  });

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, getJwtSecret()) as SessionPayload;
  } catch {
    return null;
  }
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
};

export const setSession = async (payload: SessionPayload) => {
  const token = signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
};

export const requireSession = async () => {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return session;
};

export const getCurrentUser = async () => {
  const session = await getSession();
  if (!session) return null;
  await connectToDatabase();
  const user = await User.findById(session.userId).lean();
  if (!user) return null;
  return {
    id: (user as any)._id.toString(),
    name: (user as any).name,
    email: (user as any).email,
  };
};

