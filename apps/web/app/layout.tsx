import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
      <body
        className={cn(
          inter.className,
          'container max-w-screen-lg flex h-full gap-1 bg-stone-50 justify-between'
        )}
      >
        <div className="min-w-0 sticky border font-mono top-0 w-[40%] h-screen bg-white flex flex-col items-center justify-center">
          <TiltedScroll />
        </div>

        <main className="flex-1 h-screen bg-white p-2 border">{children}</main>
      </body>
    </html>
  );
}
