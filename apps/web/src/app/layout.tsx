import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { PlanBar } from "@/components/PlanBar";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "DIDM: Delhi Institute of Digital Marketing | Premium AI & Growth Marketing",
  description:
    "India's premier AI-powered digital marketing institute. 50,000+ alumni, 650+ hiring partners, 13 physical centres & live online campus. Master MIDM, DMI Diploma & modern AI tools.",
  keywords: [
    "digital marketing course",
    "digital marketing institute in delhi",
    "DIDM",
    "MIDM",
    "AI digital marketing",
    "performance marketing course",
    "SEO training",
  ],
  authors: [{ name: "Delhi Institute of Digital Marketing" }],
  openGraph: {
    title: "DIDM: Delhi Institute of Digital Marketing",
    description: "Master digital marketing & generative AI tools with guaranteed 100% placement support.",
    type: "website",
    locale: "en_IN",
    siteName: "DIDM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization JSON-LD
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://www.didm.in/#org",
    name: "Delhi Institute of Digital Marketing",
    alternateName: "DIDM",
    url: "https://www.didm.in",
    logo: "https://res.cloudinary.com/dnfz4jwam/image/upload/v1793791834/didm-logo-reg_m1wbe9.png",
    telephone: "+91-8800505151",
    email: "info@didm.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 12, 3rd Floor, Satya Niketan, opp. Sri Venkateswara College",
      addressLocality: "New Delhi",
      postalCode: "110021",
      addressCountry: "IN",
    },
    award: [
      "ASSOCHAM Fair Business Practices Award",
      "WASME SME Excellence Award 2021",
      "International Fame Award 2021",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-brand-red selection:text-white overflow-x-hidden">
        <Suspense fallback={null}>
          <PlanBar />
        </Suspense>
        <Suspense fallback={<div className="h-[68px]" />}>
          <Navbar />
        </Suspense>
        <main id="main" className="flex-1 pb-16 xl:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}

