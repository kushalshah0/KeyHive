import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

export const passwordEntrySchema = z.object({
  label: z.string().min(2).max(80),
  username: z.string().min(2).max(80),
  passwordValue: z.string().min(4).max(128),
  url: z.union([z.string().url(), z.literal(''), z.undefined()]).optional(),
  note: z.union([z.string().max(200), z.literal(''), z.undefined()]).optional(),
});

