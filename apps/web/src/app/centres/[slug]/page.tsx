import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCentres, getCentreBySlug, SITE_BRAND } from "@/lib/content";
import { CentreDetailView } from "./CentreDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const centres = getAllCentres();
  return centres.map((centre) => ({
    slug: centre.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const centre = getCentreBySlug(slug);

  if (!centre) {
    return {
      title: "Centre Not Found | DIDM",
    };
  }

  const title = `Best Institute for Digital Marketing Course in ${centre.name} - DIDM`;
  const description = `Best Digital Marketing Course in ${centre.name} with 100% Placement Assistance. 50+ In-Depth Modules, Google-Certified Trainers, Live Projects, and Flexible Batches. Call ${centre.phones[0] || SITE_BRAND.phone}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.didm.in/centres/${centre.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.didm.in/centres/${centre.slug}`,
    },
  };
}

export default async function CentreDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const centre = getCentreBySlug(slug);

  if (!centre) {
    notFound();
  }

  const allCentres = getAllCentres();

  const centreJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: `DIDM ${centre.name}`,
    description: `Best Digital Marketing Institute in ${centre.name} with 100% Placement Support`,
    telephone: centre.phones[0] || SITE_BRAND.phone,
    email: centre.email || SITE_BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: centre.address,
      addressLocality: centre.city,
      addressRegion: centre.state,
      addressCountry: "IN",
    },
    openingHours: "Mo-Fr 09:00-21:00, Sa-Su 09:00-19:00",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(centreJsonLd) }}
      />
      <CentreDetailView centre={centre} allCentres={allCentres} />
    </>
  );
}
