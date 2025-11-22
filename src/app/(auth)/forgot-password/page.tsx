'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthNavbar from '@/components/auth-navbar';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail('');
      } else {
        setError(data.error || 'Failed to send reset email.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavbar />
      <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-2xl shadow-brand-500/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">Forgot your password?</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder="user@keyhive.qzz.io"
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {message && (
            <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand-600 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Sending…' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Remember your password?{' '}
          <Link href="/login" className="font-semibold text-brand-600 dark:text-brand-300">
            Log in
          </Link>
        </p>
        </div>
      </div>
    </>
  );
}
