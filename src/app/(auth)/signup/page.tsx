import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';
import { AuthNavbar } from '@/components/auth-navbar';

export default function SignupPage() {
  return (
    <>
      <AuthNavbar />
      <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-8 sm:px-6 lg:px-8">
        <AuthForm mode="signup" />
      </div>
    </>
  );
}

