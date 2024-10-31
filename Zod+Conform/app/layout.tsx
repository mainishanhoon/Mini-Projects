import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const montserrat = localFont({
  src: './fonts/Montserrat.woff',
  variable: '--font-geist-sans',
  weight: '1200',
});

export const metadata: Metadata = {
  title: 'Zod + Conform',
  description: 'Made by @mainishanhoon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} font-bold tracking-wide`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
