import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/widgets/header';
import { TiltedScroll } from '@repo/ui/components/tilted-scroll';
import { cn } from '@repo/ui/lib/utils';

import { Providers } from './providers';

import '@repo/ui/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '8ake',
  description: '8ake - Your Recipe App',
  manifest: '/manifest.json',
  icons: {
    apple: [{ url: '/icons/icon-192x192.png' }],
  },
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '8ake',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="8ake" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="8ake" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={cn(inter.className, 'flex h-full bg-stone-50 justify-between')}>
        <div className="min-w-0 mr-1 sticky border top-0 w-[40%] h-screen bg-white md:flex flex-col items-center justify-center overflow-hidden hidden">
          <TiltedScroll />
        </div>

        <main className="flex-1 h-screen flex flex-col bg-white pb-2 border gap-2">
          <Header />

          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
