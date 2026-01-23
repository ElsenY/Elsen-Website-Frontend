import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'sonner';
import Head from 'next/head';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const inknutAntiqua = localFont({
  src: './fonts/InknutAntiqua-Black.ttf',
  variable: '--font-inknut-black',
  weight: '100 900',
});

const inriaSerif = localFont({
  src: './fonts/InriaSerif-Regular.ttf',
  variable: '--font-inriaSerif-regular',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Elsen Yacub',
  description: 'Elsen Yacub',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Elsen Yacub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistMono.variable} ${inknutAntiqua.variable} ${geistSans.variable} ${inriaSerif.variable} antialiased bg-[#14191f] dark`}
      >
        <main>{children}</main>
        <Toaster richColors/>
      </body>
    </html>
  );
}
