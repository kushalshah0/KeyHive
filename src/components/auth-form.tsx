'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';

type Mode = 'login' | 'signup';

export const AuthForm = ({ mode }: { mode: Mode }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const copy = mode === 'login' ? { title: 'Welcome back', action: 'Login' } : { title: 'Create an account', action: 'Sign up' };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const endpoint = mode === 'login' ? '/api/login' : '/api/signup';
      const payload = mode === 'login' ? { email: formValues.email, password: formValues.password } : formValues;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? 'Something went wrong');
        return;
      }

      const data = await response.json();
      
      // Redirect to verify email page for signup with email parameter
      if (mode === 'signup') {
        router.push(`/verify-email?email=${encodeURIComponent(formValues.email)}`);
        router.refresh();
        return;
      }
      
      // Show verification warning for login if not verified
      if (mode === 'login' && data.requiresVerification) {
        router.push(`/verify-email?email=${encodeURIComponent(formValues.email)}`);
        router.refresh();
        return;
      }
      
      router.push('/dashboard');
      router.refresh();
    });
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-2xl shadow-brand-500/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">{copy.title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {mode === 'login' ? 'Sign in to access your encrypted vault.' : 'Join other teams moving off spreadsheets.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === 'signup' && (
          <label className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Full name
            <input
              required
              type="text"
              value={formValues.name}
              onChange={(event) => setFormValues((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder="Ada Lovelace"
            />
          </label>
        )}
        <label className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          Email address
          <input
            required
            type="email"
            value={formValues.email}
            onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            placeholder="user@keyhive.qzz.io"
          />
        </label>
        <label className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          Password
          <input
            required
            type="password"
            value={formValues.password}
            onChange={(event) => setFormValues((prev) => ({ ...prev, password: event.target.value }))}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            placeholder="••••••••"
            minLength={8}
          />
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        
        {mode === 'login' && (
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
              Forgot password?
            </Link>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl bg-brand-600 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? 'Processing…' : copy.action}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        {mode === 'login' ? (
          <>
            Need an account?{' '}
            <Link href="/signup" className="font-semibold text-brand-600 dark:text-brand-300">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already with us?{' '}
            <Link href="/login" className="font-semibold text-brand-600 dark:text-brand-300">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

