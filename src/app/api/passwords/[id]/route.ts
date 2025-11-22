import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { PasswordEntry } from '@/models/PasswordEntry';
import { getSession } from '@/lib/auth';
import { passwordEntrySchema } from '@/lib/validators';

type RouteContext = { params: { id: string } } | { params: Promise<{ id: string }> };

const getParams = async (context: RouteContext) => {
  const maybePromise = context.params as Promise<{ id: string }>;
  if (maybePromise && typeof maybePromise.then === 'function') {
    return maybePromise;
  }
  return Promise.resolve(context.params as { id: string });
};

export async function PUT(request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await getParams(context);

  const payload = await request.json();
  // Convert empty strings to undefined for optional fields
  const cleanedPayload = {
    ...payload,
    url: payload.url && payload.url.trim() !== '' ? payload.url : undefined,
    note: payload.note && payload.note.trim() !== '' ? payload.note : undefined,
  };
  const parsed = passwordEntrySchema.safeParse(cleanedPayload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();
  const entry = await PasswordEntry.findOneAndUpdate(
    { _id: id, userId: session.userId },
    { ...parsed.data, url: parsed.data.url || undefined, note: parsed.data.note || undefined },
    { new: true }
  );

  if (!entry) {
    return NextResponse.json({ error: 'Password entry not found' }, { status: 404 });
  }

  return NextResponse.json({
    password: {
      id: entry._id.toString(),
      label: entry.label,
      username: entry.username,
      passwordValue: entry.passwordValue,
      url: entry.url,
      note: entry.note,
    },
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await getParams(context);

  await connectToDatabase();
  await PasswordEntry.deleteOne({ _id: id, userId: session.userId });
  return NextResponse.json({ success: true });
}

