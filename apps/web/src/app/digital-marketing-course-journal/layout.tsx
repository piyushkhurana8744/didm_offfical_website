import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Course Journal - DIDM",
  description:
    "Digital Marketing Course Journal will provide every details that DIDM offers includings its vision, mission and other activities. Contact DIDM at 8800505151",
  alternates: {
    canonical: "https://www.didm.in/digital-marketing-course-journal",
  },
  openGraph: {
    title: "Digital Marketing Course Journal - DIDM",
    description:
      "Digital Marketing Course Journal will provide every details that DIDM offers includings its vision, mission and other activities. Contact DIDM at 8800505151",
    url: "https://www.didm.in/digital-marketing-course-journal",
    siteName: "DIDM - Delhi Institute of Digital Marketing",
    type: "website",
  },
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

