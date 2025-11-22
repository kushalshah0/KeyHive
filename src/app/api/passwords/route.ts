import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { PasswordEntry } from '@/models/PasswordEntry';
import { getSession } from '@/lib/auth';
import { passwordEntrySchema } from '@/lib/validators';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const entries = await PasswordEntry.find({ userId: session.userId }).sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    passwords: entries.map((entry) => ({
      id: entry._id.toString(),
      label: entry.label,
      username: entry.username,
      passwordValue: entry.passwordValue,
      url: entry.url,
      note: entry.note,
      createdAt: entry.createdAt,
    })),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  // Convert empty strings to undefined for optional fields
  const cleanedPayload = {
    ...payload,
    url: payload.url && payload.url.trim() !== '' ? payload.url : undefined,
    note: payload.note && payload.note.trim() !== '' ? payload.note : undefined,
  };
  const parsed = passwordEntrySchema.safeParse(cleanedPayload);
  if (!parsed.success) {
    console.error('Validation error:', parsed.error.flatten());
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const entry = await PasswordEntry.create({
    ...parsed.data,
    url: parsed.data.url || undefined,
    note: parsed.data.note || undefined,
    userId: session.userId,
  });

  return NextResponse.json(
    {
      password: {
        id: entry._id.toString(),
        label: entry.label,
        username: entry.username,
        passwordValue: entry.passwordValue,
        url: entry.url,
        note: entry.note,
      },
    },
    { status: 201 },
  );
}

