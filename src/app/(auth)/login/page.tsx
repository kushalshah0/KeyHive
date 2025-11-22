import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/" className="mb-8 text-sm font-semibold text-brand-600 transition hover:text-brand-500 dark:text-brand-400">
        ← Back to home
      </Link>
      <AuthForm mode="login" />
    </div>
  );
}

