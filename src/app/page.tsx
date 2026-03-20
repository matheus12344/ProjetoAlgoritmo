import { Metadata } from 'next'
import Header from '@/components/Header'
import { Hero } from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import BookSection from '@/components/BookSection'
import FAQ from '@/components/FAQ'
import BlogPreview from '@/components/BlogPreview'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Psicólogo em Guarulhos — André Fiker | Terapia Comportamental e Atendimento Online',
  description: 'André Fiker - Psicólogo Clínico especialista em Terapia Comportamental. Atendimento presencial em Guarulhos e online. Agende sua sessão.',
  keywords: 'psicólogo guarulhos, terapia comportamental, terapia cognitiva, atendimento online, psicólogo online, terapia de ansiedade, terapia de casal, TCC, análise do comportamento',
  authors: [{ name: 'André Fiker' }],
  creator: 'André Fiker',
  publisher: 'André Fiker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.andrefiker.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Psicólogo em Guarulhos — André Fiker | Terapia Comportamental',
  description: 'André Fiker - Psicólogo Clínico especialista em Terapia Comportamental. Atendimento presencial em Guarulhos e online para todo o Brasil.',
    url: 'https://www.andrefiker.com.br',
  siteName: 'André Fiker - Psicólogo',
    locale: 'pt_BR',
    type: 'website',
    images: [
        {
        url: '/images/andre-fiker-psicologo.jpg',
        width: 1200,
        height: 630,
        alt: 'André Fiker - Psicólogo Clínico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psicólogo em Guarulhos — André Fiker | Terapia Comportamental',
  description: 'André Fiker - Psicólogo Clínico especialista em Terapia Comportamental. Atendimento presencial em Guarulhos e online para todo o Brasil.',
    images: ['/images/andre-fiker-psicologo.jpg'],
  },
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
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "Person"],
            "name": "André Fiker - Psicólogo",
            "image": "https://www.andrefiker.com.br/images/andre-fiker-psicologo.jpg",
            "telephone": "+55 11 96182-0112",
            "email": "contato@andrefiker.com.br",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Dr. Ramos de Azevedo, 159, conjunto 2112",
              "addressLocality": "Guarulhos",
              "addressRegion": "SP",
              "addressCountry": "BR",
              "postalCode": "07020-000"
            },
            "openingHours": "Mo-Fr 09:00-19:00",
            "url": "https://www.andrefiker.com.br",
            "sameAs": [
              "https://www.doctoralia.com.br/andre-fiker",
              "https://www.instagram.com/andrefiker.psicologo"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "52",
              "bestRating": "5",
              "worstRating": "1"
            },
            "priceRange": "$$",
            "paymentAccepted": ["PIX", "Transferência", "Débito"],
            "currenciesAccepted": "BRL",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Serviços Psicológicos",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Terapia Individual",
                    "description": "Atendimento psicológico individual para ansiedade, depressão e outros quadros"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Terapia de Casal",
                    "description": "Atendimento psicológico para casais"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Atendimento Online",
                    "description": "Atendimento psicológico online via plataforma segura"
                  }
                }
              ]
            },
            "knowsAbout": [
              "Terapia Comportamental",
              "Terapia Cognitivo-Comportamental",
              "Análise do Comportamento",
              "Mindfulness",
              "Ansiedade",
              "Depressão",
              "Relacionamentos"
            ],
            "jobTitle": "Psicólogo Clínico",
            "worksFor": {
              "@type": "Organization",
              "name": "Clínica André Fiker"
            },
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "PUC SP",
                "sameAs": "https://www.pucsp.br/"
              },
              {
                "@type": "EducationalOrganization", 
                "name": "ITCR",
                "sameAs": "https://www.itcr.com.br/"
              }
            ],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Graduação",
                "name": "Psicologia",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Conselho Regional de Psicologia - CRP 06"
                }
              },
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Especialização",
                "name": "Terapia Comportamental"
              }
            ]
          })
        }}
      />
      
      <Header />
      <Hero />
      <About />
  <Services />
  <BookSection />
  <Testimonials />
      <FAQ />
      <BlogPreview />
      <Footer />
    </main>
  )
}