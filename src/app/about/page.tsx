'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, HeartIcon, RocketLaunchIcon, UsersIcon, Bars3Icon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';

const values = [
  {
    title: 'Security First',
    description: 'Your security is our top priority. We use industry-leading encryption and never compromise on protection.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'User Focused',
    description: 'We build tools that are powerful yet simple, making security accessible to everyone.',
    icon: HeartIcon,
  },
  {
    title: 'Innovation',
    description: 'We continuously improve and innovate to stay ahead of emerging security threats.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Community',
    description: 'We believe in building a community of security-conscious users who help each other stay safe.',
    icon: UsersIcon,
  },
];

export default function AboutPage() {
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
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
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
              className="text-sm font-medium text-brand-600 transition-colors dark:text-brand-400"
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

        {/* Mobile Navigation */}
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

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="col-span-full animate-fade-in-down border-t border-zinc-200/60 pt-4 dark:border-zinc-800 sm:hidden">
            <nav className="space-y-1">
              <Link href="/" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">Home</Link>
              <Link href="/features" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">Features</Link>
              <Link href="/pricing" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">Pricing</Link>
              <Link href="/about" onClick={closeMobileMenu} className="block rounded-xl bg-brand-50 px-4 py-3 text-base font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">About</Link>
              <Link href="/contact" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">Contact</Link>
            </nav>
            <div className="my-4 border-t border-zinc-200 dark:border-zinc-800" />
            <div className="space-y-2">
              <Link href="/login" onClick={closeMobileMenu} className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-center text-base font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-500 dark:hover:bg-brand-500/10">Sign in</Link>
              <Link href="/signup" onClick={closeMobileMenu} className="block w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:shadow-brand-500/40">Get started</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto mt-12 max-w-6xl text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400 sm:hidden">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="mt-8 bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-zinc-100 dark:to-zinc-400">
          About{' '}
          <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">
            KeyHive
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          We're on a mission to make password security simple and accessible for everyone.
        </p>
      </section>

      {/* Story Section */}
      <section className="mx-auto mt-20 max-w-4xl">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Our Story</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              KeyHive was born from a simple observation: people struggle with password security not because they don't care, but because existing solutions are too complicated.
            </p>
            <p>
              We set out to create a password manager that combines military-grade security with an interface so intuitive that anyone can use it. No compromises on security, no complexity for users.
            </p>
            <p>
              Today, KeyHive protects millions of passwords for users in over 120 countries. We're proud to help individuals, families, and businesses stay secure online.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto mt-20 max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-white">Our Values</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className="group rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/70"
            >
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-brand-100 to-purple-100 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110 dark:from-brand-500/20 dark:to-purple-500/20">
                <value.icon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="grid gap-8 rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-brand-50/30 to-purple-50/30 p-12 shadow-2xl dark:border-zinc-800 dark:from-zinc-900 dark:via-brand-900/20 dark:to-purple-900/20 md:grid-cols-3">
          <div className="text-center">
            <p className="text-5xl font-bold bg-gradient-to-br from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">10M+</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Passwords Protected</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold bg-gradient-to-br from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">120+</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Countries</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold bg-gradient-to-br from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">99.9%</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Uptime</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Join us in making the internet safer</h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Start protecting your digital life with KeyHive today
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-600/50"
        >
          Get started for free
        </Link>
      </section>
    </main>
  );
}
