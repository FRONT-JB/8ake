import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/widgets/header';
import { TiltedScroll } from '@repo/ui/components/tilted-scroll';
import { cn } from '@repo/ui/lib/utils';

import '@repo/ui/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web',
  description: 'Web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={cn(inter.className, 'flex h-full bg-stone-50 justify-between')}>
        <div className="min-w-0 mr-1 sticky border top-0 w-[40%] h-screen bg-white md:flex flex-col items-center justify-center overflow-hidden hidden">
          <TiltedScroll />
        </div>

        <main className="flex-1 h-screen flex flex-col bg-white pb-2 border gap-2">
          <Header />

          {children}
        </main>
      </body>
    </html>
  );
}
