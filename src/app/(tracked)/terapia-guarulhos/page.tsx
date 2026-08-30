import { Metadata } from "next";
import LandingPageClient from "./LandingPageClient";

export const metadata: Metadata = {
  title: "Terapia Comportamental e TCC em Guarulhos | Adultos",
  description: "Terapia Comportamental e TCC para adultos. Atendimento particular no Centro de Guarulhos ou online, com sessões individuais de 50 minutos.",
  keywords: ["psicólogo guarulhos", "psicólogo TCC guarulhos", "terapia cognitivo comportamental guarulhos", "terapia comportamental guarulhos", "psicólogo particular guarulhos", "psicoterapia guarulhos"],
  alternates: {
    canonical: "https://www.andrefiker.com.br/terapia-guarulhos",
  },
  openGraph: {
    title: "Terapia Comportamental e TCC em Guarulhos | André Fiker",
    description: "Terapia Comportamental e TCC para adultos. Atendimento particular no Centro de Guarulhos ou online, com sessões de 50 minutos.",
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
    "description": "Psicoterapia particular para adultos com Terapia Comportamental e TCC em Guarulhos e online.",
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
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <LandingPageClient />
    </>
  );
}
