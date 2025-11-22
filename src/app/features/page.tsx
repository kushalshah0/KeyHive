'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, BoltIcon, SparklesIcon, LockClosedIcon, KeyIcon, DevicePhoneMobileIcon, CloudArrowUpIcon, UserGroupIcon, ChartBarIcon, Bars3Icon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';

const features = [
  {
    title: 'Zero-knowledge Encryption',
    description: 'Your data is encrypted on your device before it reaches our servers. We never have access to your passwords.',
    icon: ShieldCheckIcon,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Lightning Fast Autofill',
    description: 'Instantly fill passwords across all your devices and browsers with a single click.',
    icon: BoltIcon,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Smart Password Generator',
    description: 'Create strong, unique passwords for every account with our intelligent generator.',
    icon: SparklesIcon,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Secure Sharing',
    description: 'Share passwords with team members without revealing the actual credentials.',
    icon: UserGroupIcon,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Multi-Device Sync',
    description: 'Access your vault seamlessly across desktop, mobile, and browser extensions.',
    icon: DevicePhoneMobileIcon,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Automatic Backup',
    description: 'Never lose your data with automatic encrypted backups to the cloud.',
    icon: CloudArrowUpIcon,
    color: 'from-cyan-500 to-teal-500',
  },
  {
    title: 'Advanced Security',
    description: 'Two-factor authentication, biometric login, and security breach alerts.',
    icon: LockClosedIcon,
    color: 'from-red-500 to-rose-500',
  },
  {
    title: 'Password Health',
    description: 'Monitor and improve your password security with detailed health reports.',
    icon: ChartBarIcon,
    color: 'from-violet-500 to-purple-500',
  },
  {
    title: 'Master Password',
    description: 'One master password is all you need to access your entire encrypted vault.',
    icon: KeyIcon,
    color: 'from-amber-500 to-yellow-500',
  },
];

export default function FeaturesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <main className="relative isolate px-6 pb-24 pt-12 sm:px-12 lg:px-24">
      {/* Animated background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-400/20 opacity-70 blur-3xl mix-blend-multiply dark:opacity-30" />
        <div className="animate-blob animation-delay-2000 absolute top-60 -left-40 h-96 w-96 rounded-full bg-purple-400/20 opacity-70 blur-3xl mix-blend-multiply dark:opacity-30" />
      </div>

      {/* Header */}
      <header className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 rounded-2xl border border-zinc-200/60 bg-white/80 px-4 py-4 shadow-lg shadow-brand-500/5 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 dark:border-zinc-800 dark:bg-zinc-900/70 sm:flex sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center">
          <Link href="/">
            <p className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-lg font-bold uppercase tracking-[0.3em] text-transparent dark:from-brand-300 dark:to-brand-500">KeyHive</p>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 sm:flex">
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium text-brand-600 transition-colors dark:text-brand-400"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
            >
              Contact
            </Link>
          </nav>
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-500/40"
            >
              <span className="relative z-10">Sign in</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand-500 to-brand-400 transition-transform duration-300 group-hover:translate-x-0" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation - hamburger button */}
        <div className="flex items-center justify-end gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="inline-flex w-11 items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-zinc-600 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-5">
              <Bars3Icon 
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
              />
              <XMarkIcon 
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Content (expands header) */}
        {isMobileMenuOpen && (
          <div className="col-span-full animate-fade-in-down border-t border-zinc-200/60 pt-4 dark:border-zinc-800 sm:hidden">
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
              >
                Home
              </Link>
              <Link
                href="/features"
                onClick={closeMobileMenu}
                className="block rounded-xl bg-brand-50 px-4 py-3 text-base font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
              >
                Contact
              </Link>
            </nav>

            {/* Divider */}
            <div className="my-4 border-t border-zinc-200 dark:border-zinc-800" />

            {/* CTA Buttons */}
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-center text-base font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-500 dark:hover:bg-brand-500/10"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={closeMobileMenu}
                className="block w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:shadow-brand-500/40"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto mt-12 max-w-6xl text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400 sm:hidden"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="mt-8 bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-zinc-100 dark:to-zinc-400">
          Powerful Features for{' '}
          <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">
            Complete Security
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          Everything you need to manage, protect, and share your passwords securely across all your devices.
        </p>
      </section>

      {/* Features Grid */}
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/70"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
              
              <div className="relative">
                <div className={`inline-flex rounded-2xl bg-gradient-to-br ${feature.color} p-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto mt-32 max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-brand-50/30 to-purple-50/30 p-8 shadow-2xl dark:border-zinc-800 dark:from-zinc-900 dark:via-brand-900/20 dark:to-purple-900/20 sm:p-12">
          <div className="relative text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl lg:text-4xl">
              Ready to experience KeyHive?
            </h2>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Start securing your passwords today with our powerful features
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-600/50 sm:w-auto"
              >
                <span className="relative z-10">Get started for free</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand-500 to-brand-400 transition-transform duration-300 group-hover:translate-x-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
