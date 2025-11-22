import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pass-manager.local'),
  title: 'KeyHive – Modern password manager',
  description: 'A minimal password manager with instant syncing and secure storage.',
};

const currentYear = new Date().getFullYear();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white font-sans antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen bg-grid-light dark:bg-grid-dark">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(27,136,242,0.15),_transparent_45%)] dark:bg-[radial-gradient(circle_at_top,_rgba(27,136,242,0.3),_transparent_45%)]" />
            <div className="pb-20">{children}</div>
            <footer className="relative z-10 border-t border-zinc-200/70 bg-white/80 px-6 py-8 text-center text-sm text-zinc-500 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400">
              © {currentYear} KeyHive. Built for modern password security.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
