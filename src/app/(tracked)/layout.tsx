import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "../globals.css";
import { ConsentManager } from "@/components/ConsentManager";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const sora = Sora({
  variable: "--font-sora", 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.andrefiker.com.br'),
  title: {
    default: 'André Fiker - Psicólogo Clínico | Terapia Comportamental',
    template: '%s | André Fiker'
  },
  description: "André Fiker, psicólogo clínico. Terapia Comportamental e TCC para adultos, com atendimento presencial em Guarulhos e online.",
  keywords: ['psicólogo guarulhos', 'terapia comportamental', 'terapia cognitiva', 'atendimento online', 'psicólogo online', 'terapia de ansiedade', 'TCC'],
  authors: [{ name: 'André Fiker' }],
  creator: 'André Fiker',
  publisher: 'André Fiker',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'André Fiker - Psicólogo Clínico',
    description: 'Terapia Comportamental e TCC para adultos. Atendimento presencial em Guarulhos e online.',
    url: 'https://www.andrefiker.com.br',
    siteName: 'André Fiker - Psicólogo',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'André Fiker - Psicólogo Clínico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'André Fiker - Psicólogo Clínico',
    description: 'Terapia Comportamental e TCC para adultos. Atendimento presencial em Guarulhos e online.',
    images: ['/images/og-image.jpg'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0B3D91',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <ConsentManager />
        <Toaster />
      </body>
    </html>
  );
}
