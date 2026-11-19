import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College and University Session - DIDM | Contact at 8800505151",
  description:
    "DIDM - India's most promising brand in digital marketing. Master in digital marketing. Contact DIDM at 8800505151",
  alternates: {
    canonical: "https://www.didm.in/colleges-and-university-session",
  },
  openGraph: {
    title: "College and University Session - DIDM | Contact at 8800505151",
    description:
      "DIDM - India's most promising brand in digital marketing. Master in digital marketing. Contact DIDM at 8800505151",
    url: "https://www.didm.in/colleges-and-university-session",
    siteName: "DIDM - Delhi Institute of Digital Marketing",
    type: "website",
  },
};

export default function CollegesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

