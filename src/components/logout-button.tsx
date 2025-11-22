'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () =>
    startTransition(async () => {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    });

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
    >
      {isPending ? 'Signing out...' : 'Logout'}
    </button>
  );
};

