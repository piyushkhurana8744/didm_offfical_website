import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "30+ Digital Marketing Certifications - DIDM",
  description:
    "DIDM - 30+ Digital Marketing Certifications will give everything you need to succeed in the world of digital marketing and advertising. Contact DIDM at 8800505151",
  alternates: {
    canonical: "https://www.didm.in/didm-certifications",
  },
  openGraph: {
    title: "30+ Digital Marketing Certifications - DIDM",
    description:
      "DIDM - 30+ Digital Marketing Certifications will give everything you need to succeed in the world of digital marketing and advertising. Contact DIDM at 8800505151",
    url: "https://www.didm.in/didm-certifications",
    siteName: "DIDM - Delhi Institute of Digital Marketing",
    type: "website",
  },
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

