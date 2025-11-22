'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EnvelopeIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon, Bars3Icon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';

const contactMethods = [
  {
    title: 'Email Support',
    description: 'Get help from our support team',
    contact: 'support@keyhive.com',
    icon: EnvelopeIcon,
  },
  {
    title: 'Sales Inquiries',
    description: 'Questions about plans or pricing',
    contact: 'sales@keyhive.com',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: 'Help Center',
    description: 'Browse our documentation',
    contact: 'Visit Help Center',
    icon: QuestionMarkCircleIcon,
  },
];

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message,
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-brand-600 transition-colors dark:text-brand-400"
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
              <Link href="/about" onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-zinc-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">About</Link>
              <Link href="/contact" onClick={closeMobileMenu} className="block rounded-xl bg-brand-50 px-4 py-3 text-base font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">Contact</Link>
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
          Get in{' '}
          <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">
            Touch
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Methods */}
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="group rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/70"
            >
              <div className="mx-auto inline-flex rounded-2xl bg-gradient-to-br from-brand-100 to-purple-100 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110 dark:from-brand-500/20 dark:to-purple-500/20">
                <method.icon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">{method.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{method.description}</p>
              <p className="mt-4 font-semibold text-brand-600 dark:text-brand-400">{method.contact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto mt-20 max-w-3xl">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Send us a message</h2>
          
          {/* Status Message */}
          {submitStatus.type && (
            <div
              className={`mt-6 rounded-xl p-4 ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Tell us more about your inquiry..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-brand-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Additional Info */}
      <section className="mx-auto mt-20 max-w-4xl text-center">
        <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-brand-50/30 to-purple-50/30 p-8 shadow-2xl dark:border-zinc-800 dark:from-zinc-900 dark:via-brand-900/20 dark:to-purple-900/20 sm:p-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Looking for immediate help?</h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Check out our comprehensive help center for instant answers to common questions.
          </p>
          <button className="mt-8 rounded-xl border-2 border-zinc-200 px-8 py-3 text-base font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-500 dark:hover:bg-brand-500/10">
            Visit Help Center
          </button>
        </div>
      </section>
    </main>
  );
}
