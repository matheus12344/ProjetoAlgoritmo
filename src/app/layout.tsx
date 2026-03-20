import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
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
  description: "André Fiker - Psicólogo Clínico especialista em Terapia Comportamental. Atendimento presencial em Guarulhos e online para todo o Brasil.",
  keywords: ['psicólogo guarulhos', 'terapia comportamental', 'terapia cognitiva', 'atendimento online', 'psicólogo online', 'terapia de ansiedade', 'terapia de casal', 'TCC'],
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
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'André Fiker - Psicólogo Clínico',
    description: 'Especialista em Terapia Comportamental. Atendimento presencial em Guarulhos e online.',
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
    description: 'Especialista em Terapia Comportamental. Atendimento presencial em Guarulhos e online.',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* Google tag (gtag.js) - AW-10966063764 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10966063764"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-10966063764');` }} />
        {/* Google Ads Conversion Tracking - WhatsApp Click */}
                <script dangerouslySetInnerHTML={{ __html: `
                          document.addEventListener('click', function(e) {
                                      var el = e.target.closest ? e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"], button') : null;
                                                  if (!el) return;
                                                              var isWA = false;
                                                                          if (el.tagName === 'A' && el.href && (el.href.indexOf('wa.me') !== -1 || el.href.indexOf('whatsapp.com') !== -1)) {
                                                                                        isWA = true;
                                                                                                    }
                                                                                                                if (el.tagName === 'BUTTON' && (el.textContent || '').match(/agendar|whatsapp/i)) {
                                                                                                                              isWA = true;
                                                                                                                                          }
                                                                                                                                                      if (isWA && typeof gtag === 'function') {
                                                                                                                                                                    gtag('event', 'conversion', {'send_to': 'AW-10966063764/eYEhCK_w8uYaEJS1g-0o'});
                                                                                                                                                                                }
                                                                                                                                                                                          }, true);
                                                                                                                                                                                                  `}} />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
