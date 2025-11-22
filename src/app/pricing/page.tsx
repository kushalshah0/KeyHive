'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckIcon, Bars3Icon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individuals getting started',
    features: [
      'Unlimited passwords',
      'Single device access',
      'Basic password generator',
      'Email support',
      'AES-256 encryption',
    ],
    cta: 'Get started',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Personal',
    price: '$4.99',
    period: '/month',
    description: 'Everything you need for personal use',
    features: [
      'Everything in Free',
      'Unlimited devices',
      'Priority support',
      'Password health reports',
      'Secure sharing',
      'Two-factor authentication',
      'Automatic backups',
    ],
    cta: 'Start free trial',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Family',
    price: '$9.99',
    period: '/month',
    description: 'Protect your entire family',
    features: [
      'Everything in Personal',
      'Up to 6 family members',
      'Family sharing vault',
      'Individual vaults for each member',
      'Admin controls',
      'Priority support',
    ],
    cta: 'Start free trial',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Business',
    price: '$7.99',
    period: '/user/month',
    description: 'For teams and organizations',
    features: [
      'Everything in Family',
      'Unlimited team members',
      'Advanced admin controls',
      'Team activity reports',
      'SSO integration',
      'API access',
      'Dedicated support',
      'Custom onboarding',
    ],
    cta: 'Contact sales',
    href: '/contact',
    highlighted: false,
  },
];

export default function PricingPage() {
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
              className="text-sm font-medium text-brand-600 transition-colors dark:text-brand-400"
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
              <Link href="/" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                Home
              </Link>
              <Link href="/features" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                Features
              </Link>
              <Link href="/pricing" onClick={closeMobileMenu} className="block rounded-xl bg-brand-50 px-4 py-3 text-base font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                Pricing
              </Link>
              <Link href="/about" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                About
              </Link>
              <Link href="/contact" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                Contact
              </Link>
            </nav>
            <div className="my-4 border-t border-zinc-200 dark:border-zinc-800" />
            <div className="space-y-2">
              <Link href="/login" onClick={closeMobileMenu} className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-center text-base font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-500 dark:hover:bg-brand-500/10">
                Sign in
              </Link>
              <Link href="/signup" onClick={closeMobileMenu} className="block w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:shadow-brand-500/40">
                Get started
              </Link>
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
          Simple, Transparent{' '}
          <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">
            Pricing
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          Choose the plan that works best for you. All plans include our core security features.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto mt-20 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:scale-105 ${
                plan.highlighted
                  ? 'border-brand-500 bg-gradient-to-br from-brand-50 to-purple-50 shadow-2xl shadow-brand-500/20 dark:from-brand-900/20 dark:to-purple-900/20 dark:border-brand-500'
                  : 'border-zinc-200 bg-white/80 shadow-lg dark:border-zinc-800 dark:bg-zinc-900/70'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-brand-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-sm text-zinc-500 dark:text-zinc-400">{plan.period}</span>}
                </div>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{plan.description}</p>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-brand-600 dark:text-brand-400" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 block w-full rounded-xl py-3 text-center text-base font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40'
                    : 'border-2 border-zinc-200 text-zinc-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-500 dark:hover:bg-brand-500/10'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="mx-auto mt-32 max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
          Have questions?
        </h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Check out our FAQ or contact our support team for help choosing the right plan.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-xl border-2 border-zinc-200 px-8 py-3 text-base font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-500 dark:hover:bg-brand-500/10"
        >
          Contact us
        </Link>
      </section>
    </main>
  );
}
