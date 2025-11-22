'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, BoltIcon, SparklesIcon, CheckCircleIcon, LockClosedIcon, DevicePhoneMobileIcon, GlobeAltIcon, ArrowRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';

const features = [
  {
    title: 'Zero-knowledge vault',
    description: 'Only you can read what you store. Data is encrypted before it hits our servers.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Autofill-ready',
    description: 'Retrieve strong credentials anywhere and copy with a single tap.',
    icon: BoltIcon,
  },
  {
    title: 'Smart sharing',
    description: 'Share login bundles with teammates without revealing the actual secret.',
    icon: SparklesIcon,
  },
];

const trustBadges = [
  { icon: LockClosedIcon, text: 'AES-256 Encryption' },
  { icon: DevicePhoneMobileIcon, text: 'Multi-Device Sync' },
  { icon: GlobeAltIcon, text: 'Zero-Knowledge Architecture' },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
    <main className="relative isolate px-6 pb-24 pt-12 sm:px-12 lg:px-24">
      {/* Animated background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-400/20 opacity-70 blur-3xl mix-blend-multiply dark:opacity-30" />
        <div className="animate-blob animation-delay-2000 absolute top-60 -left-40 h-96 w-96 rounded-full bg-purple-400/20 opacity-70 blur-3xl mix-blend-multiply dark:opacity-30" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-40 left-1/2 h-96 w-96 rounded-full bg-pink-400/20 opacity-70 blur-3xl mix-blend-multiply dark:opacity-30" />
      </div>

      {/* Header */}
      <header className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 rounded-2xl border border-zinc-200/60 bg-white/80 px-4 py-4 shadow-lg shadow-brand-500/5 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 dark:border-zinc-800 dark:bg-zinc-900/70 sm:flex sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center">
          <p className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-lg font-bold uppercase tracking-[0.3em] text-transparent dark:from-brand-300 dark:to-brand-500">KeyHive</p>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 sm:flex">
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-brand-600 transition-colors dark:text-brand-400"
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
                className="block rounded-xl bg-brand-50 px-4 py-3 text-base font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
              >
                Home
              </Link>
              <Link
                href="/features"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
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
      <section className="relative mx-auto mt-12 flex max-w-6xl flex-col gap-16 lg:flex-row lg:items-center">
        <div className="space-y-8 lg:w-1/2">
          <h1 className="animate-fade-in-up bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-zinc-100 dark:to-zinc-400">
            The modern password manager that feels{' '}
            <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">
              invisible.
            </span>
          </h1>
          <p className="animate-fade-in-up animation-delay-400 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            KeyHive keeps every login, secret and recovery code accessible anywhere, anytime. Designed for security teams yet
            friendly for your family. Unlimited devices, instant sync, gorgeous UI.
          </p>
          
          {/* Trust badges */}
          <div className="animate-fade-in-up animation-delay-600 flex flex-wrap gap-4">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white/60 px-3 py-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:text-zinc-300">
                <badge.icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                {badge.text}
              </div>
            ))}
          </div>

          <div className="animate-fade-in-up animation-delay-800 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-600/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Create free account
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand-500 to-brand-400 transition-transform duration-300 group-hover:translate-x-0" />
            </Link>
            <Link
              href="/login"
              className="rounded-2xl border-2 border-zinc-200 px-8 py-4 text-base font-semibold text-zinc-700 transition-all duration-300 hover:scale-105 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-500 dark:hover:bg-brand-500/10"
            >
              I already have one
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up animation-delay-1000 grid grid-cols-3 gap-4 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:flex sm:gap-8">
            <div className="group cursor-default transition-transform duration-300 hover:scale-105">
              <p className="text-2xl font-bold bg-gradient-to-br from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400 sm:text-3xl">4.9/5</p>
              <p className="mt-1 text-xs sm:text-sm">Average satisfaction</p>
            </div>
            <div className="group cursor-default transition-transform duration-300 hover:scale-105">
              <p className="text-2xl font-bold bg-gradient-to-br from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400 sm:text-3xl">10M+</p>
              <p className="mt-1 text-xs sm:text-sm">Secrets secured</p>
            </div>
            <div className="group cursor-default transition-transform duration-300 hover:scale-105">
              <p className="text-2xl font-bold bg-gradient-to-br from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400 sm:text-3xl">120+</p>
              <p className="mt-1 text-xs sm:text-sm">Countries trusted</p>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="animate-fade-in-up animation-delay-400 relative lg:w-1/2">
          {/* Floating decoration */}
          <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-brand-400/30 to-purple-400/30 blur-2xl dark:from-brand-400/20 dark:to-purple-400/20" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-2xl dark:from-purple-400/20 dark:to-pink-400/20" />
          
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:shadow-2xl dark:border-zinc-700/50 dark:bg-zinc-800/90">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-purple-500/5 to-transparent dark:from-brand-500/10 dark:via-purple-500/5 dark:to-transparent" />
            <div className="relative space-y-6">
              {/* Vault Health Card */}
              <div className="animate-float flex items-center justify-between rounded-xl border border-zinc-200/60 bg-white p-5 text-sm font-semibold text-zinc-700 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-zinc-600/50 dark:bg-zinc-700/80 dark:text-white">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
                  <p>Vault health</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 dark:bg-green-400" />
                  <p className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text font-bold text-transparent dark:from-green-400 dark:to-green-300">100% secure</p>
                </div>
              </div>

              {/* Activity Card */}
              <div className="animate-float animation-delay-1000 rounded-xl border border-zinc-200/60 bg-white p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-zinc-600/50 dark:bg-zinc-700/80">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-300">Latest activity</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-200">
                  <li className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-600/50">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400" />
                      <span>Chrome extension synced</span>
                    </div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-400">Just now</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-600/50">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                      <span>2 new passwords added</span>
                    </div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-400">3 min ago</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-600/50">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-purple-500 dark:bg-purple-400" />
                      <span>Dark web scan clean</span>
                    </div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-400">Today</span>
                  </li>
                </ul>
              </div>

              {/* Team Vault Card */}
              <div className="animate-float animation-delay-2000 rounded-xl border border-zinc-200/60 bg-gradient-to-br from-white to-zinc-50 p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-zinc-600/50 dark:from-zinc-700/80 dark:to-zinc-700/60">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-300">Share access</p>
                <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">Team Vault · 8 members</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Invite teammates securely with one-time keys.</p>
                <div className="mt-4 flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-brand-400 to-purple-400 dark:border-zinc-700"
                      style={{ zIndex: 5 - i }}
                    />
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-600 dark:text-zinc-200">
                    +3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto mt-32 max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Everything you need for{' '}
            <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">
              password security
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Built with cutting-edge security and designed for simplicity
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg shadow-brand-500/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/20 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-brand-500"
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative">
                <div className="inline-flex rounded-2xl bg-gradient-to-br from-brand-100 to-purple-100 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110 dark:from-brand-500/20 dark:to-purple-500/20">
                  <feature.icon className="h-10 w-10 text-brand-600 dark:text-brand-400" />
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
          <div className="absolute inset-0 bg-grid-light opacity-30 dark:bg-grid-dark" />
          <div className="relative text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl lg:text-4xl">
              Ready to secure your digital life?
            </h2>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Join thousands of users who trust KeyHive with their passwords
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-600/50 sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get started for free
                  <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand-500 to-brand-400 transition-transform duration-300 group-hover:translate-x-0" />
              </Link>
            </div>
            <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
              No credit card required • Free forever • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
