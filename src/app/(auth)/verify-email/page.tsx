'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthNavbar from '@/components/auth-navbar';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    // Store email for resend functionality
    if (email) {
      setUserEmail(decodeURIComponent(email));
    }

    // If no token, show the "check your email" message
    if (!token) {
      setStatus('pending');
      setMessage('We\'ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to verify email.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  // Cooldown timer effect
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    if (resendCooldown > 0 || resending) return;

    setResending(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification email sent! Please check your inbox.');
        setResendCooldown(60); // 60 second cooldown
      } else {
        setMessage(data.error || 'Failed to resend verification email. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <AuthNavbar />
      <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
            <div className="text-center">
              {status === 'loading' && (
                <>
                  <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Verifying your email...</h1>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">Please wait while we verify your account.</p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                    <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Email Verified!</h1>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">{message}</p>
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">Redirecting to login...</p>
                  <Link
                    href="/login"
                    className="mt-6 inline-block rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500"
                  >
                    Go to Login
                  </Link>
                </>
              )}

              {status === 'pending' && (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Check Your Email</h1>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">{message}</p>
                  <div className="mt-4 rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/10">
                    <p className="text-sm text-blue-900 dark:text-blue-300">
                      <strong>Didn't receive the email?</strong> Check your spam folder or request a new verification link.
                    </p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleResendEmail}
                      disabled={resending || resendCooldown > 0 || !userEmail}
                      className="w-full rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {resending ? 'Sending...' : resendCooldown > 0 ? `Wait ${resendCooldown}s` : 'Resend Verification Email'}
                    </button>
                    <Link
                      href="/login"
                      className="block rounded-2xl border-2 border-zinc-300 px-6 py-3 font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-500"
                    >
                      Back to Login
                    </Link>
                  </div>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Verification Failed</h1>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">{message}</p>
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleResendEmail}
                      disabled={resending || resendCooldown > 0 || !userEmail}
                      className="w-full rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {resending ? 'Sending...' : resendCooldown > 0 ? `Wait ${resendCooldown}s` : 'Resend Verification Email'}
                    </button>
                    <Link
                      href="/login"
                      className="block rounded-2xl border-2 border-zinc-300 px-6 py-3 font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-500"
                    >
                      Back to Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
