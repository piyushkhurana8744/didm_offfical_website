import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Careers at DIDM | Contact at 8800505151",
  description:
    "Interested in building rewarding Career in Digital Marketing? Join Delhi Institute of Digital Marketing (DIDM). Contact at 8800505151",
  alternates: {
    canonical: "https://www.didm.in/careers",
  },
  openGraph: {
    title: "Digital Marketing Careers at DIDM | Contact at 8800505151",
    description:
      "Interested in building rewarding Career in Digital Marketing? Join Delhi Institute of Digital Marketing (DIDM). Contact at 8800505151",
    url: "https://www.didm.in/careers",
    siteName: "DIDM - Delhi Institute of Digital Marketing",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

