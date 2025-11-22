'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';

export function AuthNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 mx-auto mt-6 max-w-6xl px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200/60 bg-white/80 px-4 py-4 shadow-lg shadow-brand-500/5 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 dark:border-zinc-800 dark:bg-zinc-900/70 sm:flex sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center">
            <Link href="/">
              <p className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-lg font-bold uppercase tracking-[0.3em] text-transparent dark:from-brand-300 dark:to-brand-500">
                KeyHive
              </p>
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
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-28 left-6 right-6 z-50 mx-auto max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 sm:hidden ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Home
          </Link>
          <Link
            href="/features"
            onClick={closeMobileMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            onClick={closeMobileMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            onClick={closeMobileMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Contact
          </Link>
          <div className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
          <Link
            href="/login"
            onClick={closeMobileMenu}
            className="mx-4 mt-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-500/30"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </>
  );
}

export default AuthNavbar;
