import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { PlanBar } from "@/components/PlanBar";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { DIDMCourseCounsellor } from "@/components/counsellor/DIDMCourseCounsellor";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { DIDM_MEDIA } from "@/data/didm-media";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.didm.in"),
  title: "DIDM | Delhi Institute of Digital Marketing",
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "DIDM: Delhi Institute of Digital Marketing",
    description: "Learn digital marketing and practical AI workflows with classroom options and dedicated placement support.",
    type: "website",
    locale: "en_IN",
    siteName: "DIDM",
    images: [{ url: DIDM_MEDIA.officialLogo.path, width: DIDM_MEDIA.officialLogo.width, height: DIDM_MEDIA.officialLogo.height, alt: DIDM_MEDIA.officialLogo.alt }],
  },
  twitter: { card: "summary_large_image", title: "DIDM | Delhi Institute of Digital Marketing", description: "Explore DIDM digital marketing programs, learning centres and admissions guidance.", images: [DIDM_MEDIA.officialLogo.path] },
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
    logo: `https://www.didm.in${DIDM_MEDIA.officialLogo.path}`,
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
      <body suppressHydrationWarning className="min-h-screen flex flex-col antialiased selection:bg-brand-red selection:text-white overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScrollProvider>
          <PlanBar />
          <Navbar />
          <main id="main" className="flex-1 pb-16 xl:pb-0">
            {children}
          </main>
          <Footer />
          <StickyMobileBar />
          <DIDMCourseCounsellor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

