import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { PasswordEntry } from '@/models/PasswordEntry';
import { PasswordBoard } from '@/components/password-board';
import { LogoutButton } from '@/components/logout-button';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  await connectToDatabase();
  const entries = await PasswordEntry.find({ userId: user.id }).sort({ createdAt: -1 }).lean();

  const initialEntries = entries.map((entry: any) => ({
    id: entry._id.toString(),
    label: entry.label,
    username: entry.username,
    passwordValue: entry.passwordValue,
    url: entry.url ?? undefined,
    note: entry.note ?? undefined,
  }));

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 sm:px-8">
      <header className="flex flex-col gap-4 rounded-3xl border border-zinc-200/70 bg-white/80 px-6 py-5 text-sm shadow-xl shadow-brand-500/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-brand-600 dark:text-brand-400">KeyHive Dashboard</p>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Welcome back, {user.name.split(' ')[0]}.</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Access and organize all your stored passwords from one secure vault.</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>

      <PasswordBoard initialEntries={initialEntries} />
    </div>
  );
}

