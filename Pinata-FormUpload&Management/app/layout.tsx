import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const montserrat = localFont({
  src: './fonts/montserrat.woff',
  variable: '--font-geist-sans',
  weight: '1200',
});

export const metadata: Metadata = {
  title: 'Pinata-FileManagement',
  description: 'Made by @mainishanhoon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        {children}
        <Toaster richColors closeButton theme="light" />
      </body>
    </html>
  );
}
