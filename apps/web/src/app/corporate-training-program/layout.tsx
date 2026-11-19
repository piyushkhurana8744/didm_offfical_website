import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Training Program - DIDM | Contact at 8800505151",
  description:
    "DIDM - India's most promising brand in digital marketing. For the Corporate Training Program. Contact DIDM at 8800505151",
  alternates: {
    canonical: "https://www.didm.in/corporate-training-program",
  },
  openGraph: {
    title: "Corporate Training Program - DIDM | Contact at 8800505151",
    description:
      "DIDM - India's most promising brand in digital marketing. For the Corporate Training Program. Contact DIDM at 8800505151",
    url: "https://www.didm.in/corporate-training-program",
    siteName: "DIDM - Delhi Institute of Digital Marketing",
    type: "website",
  },
};

export default function CorporateTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

