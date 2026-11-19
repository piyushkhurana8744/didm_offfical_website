import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "@/styles/creative.css";
import "@/styles/campaign.css";
import "@/styles/editorial.css";
import "@/styles/premium-restoration.css";
import "@/styles/student-experience.css";
import "@/styles/public-excellence.css";
import { PublicExperience } from "@/components/public/PublicExperience";
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
    "Explore digital marketing and AI learning at DIDM. Compare programs, discover training centres and speak with admissions about your learning goals.",
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
      <body suppressHydrationWarning className="premium-ui-restored min-h-screen flex flex-col antialiased selection:bg-brand-red selection:text-white overflow-x-hidden">
        <a className="skip-to-content" href="#main">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScrollProvider>
          <PlanBar />
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 pb-16 xl:pb-0">
            <PublicExperience>{children}</PublicExperience>
          </main>
          <Footer />
          <StickyMobileBar />
          <DIDMCourseCounsellor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

