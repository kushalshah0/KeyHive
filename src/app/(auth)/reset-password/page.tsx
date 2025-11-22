'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthNavbar from '@/components/auth-navbar';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('Invalid reset link');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error || 'Failed to reset password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <>
        <AuthNavbar />
        <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl text-center dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Invalid Reset Link</h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">This password reset link is invalid or has expired.</p>
              <Link
                href="/forgot-password"
                className="mt-6 inline-block rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500"
              >
                Request New Link
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (success) {
    return (
      <>
        <AuthNavbar />
        <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl text-center dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Password Reset!</h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">Your password has been successfully reset.</p>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">Redirecting to login...</p>
              <Link
                href="/login"
                className="mt-6 inline-block rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthNavbar />
      <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Reset Password
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Enter your new password below.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1.5 block w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1.5 block w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-500"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-brand-600 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Resetting…' : 'Reset Password'}
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
    </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <>
        <AuthNavbar />
        <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-zinc-200 rounded dark:bg-zinc-700 mb-4"></div>
              <div className="h-4 bg-zinc-200 rounded dark:bg-zinc-700 mb-2"></div>
            </div>
          </div>
        </div>
      </>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
