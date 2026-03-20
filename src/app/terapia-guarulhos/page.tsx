import { Metadata } from "next";
import Script from "next/script";
import LandingPageClient from "./LandingPageClient";

export const metadata: Metadata = {
  title: "Psicólogo em Guarulhos | Terapia Comportamental | André Fiker",
  description: "Busca psicólogo em Guarulhos? André Fiker oferece terapia comportamental para adultos. Atendimento presencial e online. Especialista em ansiedade, depressão e TDAH. Agende sua consulta!",
  keywords: ["psicólogo guarulhos", "terapia comportamental guarulhos", "psicólogo particular guarulhos", "terapia online", "ansiedade guarulhos", "depressão guarulhos", "TDAH adultos guarulhos"],
  alternates: {
    canonical: "https://www.andrefiker.com.br/terapia-guarulhos",
  },
  openGraph: {
    title: "Psicólogo em Guarulhos | André Fiker - Terapia Comportamental",
    description: "Atendimento psicológico especializado em Guarulhos e Online. Recupere seu equilíbrio emocional com quem tem mais de 11 anos de experiência.",
    url: "https://www.andrefiker.com.br/terapia-guarulhos",
    siteName: "André Fiker Psicólogo",
    images: [
      {
        url: "/images/image1.jpg",
        width: 1200,
        height: 630,
        alt: "André Fiker - Psicólogo em Guarulhos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PsychologicalService",
    "name": "André Fiker - Psicólogo Clínico",
    "image": "https://www.andrefiker.com.br/images/image1.jpg",
    "description": "Psicólogo clínico especialista em Terapia Comportamental em Guarulhos.",
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Consultório de Psicologia André Fiker",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Guarulhos",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-23.4542",
        "longitude": "-46.5333"
      }
    },
    "serviceType": "Psychotherapy",
    "areaServed": {
      "@type": "City",
      "name": "Guarulhos"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://www.andrefiker.com.br/terapia-guarulhos"
    }
  };

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');`,
        }}
      />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <LandingPageClient />
    </>
  );
}
