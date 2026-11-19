import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Delhi Institute of Digital Marketing (DIDM) at 8800505151",
  description:
    "Get contact details for all the centers of Delhi Institute of Digital Marketing (DIDM) in Delhi and across India. Call central helpline at +91 8800505151.",
  alternates: {
    canonical: "https://www.didm.in/contact-us",
  },
  openGraph: {
    title: "Contact Us - Delhi Institute of Digital Marketing (DIDM) at 8800505151",
    description:
      "Get contact details for all the centers of Delhi Institute of Digital Marketing (DIDM) in Delhi and across India. Call central helpline at +91 8800505151.",
    url: "https://www.didm.in/contact-us",
    siteName: "DIDM - Delhi Institute of Digital Marketing",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

