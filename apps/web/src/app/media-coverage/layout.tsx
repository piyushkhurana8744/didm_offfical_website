import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIDM Media Coverage & Achievements | Delhi Institute of Digital Marketing",
  description:
    "Explore Delhi Institute of Digital Marketing (DIDM) media coverage, 3x ASSOCHAM honors, Noida Education Conclave Award 2026, Economic Times & Hindustan Times coverage, and authentic event archives.",
  alternates: {
    canonical: "https://www.didm.in/didm-media-coverage",
  },
  openGraph: {
    title: "DIDM Media Coverage & Achievements | Delhi Institute of Digital Marketing",
    description:
      "Explore Delhi Institute of Digital Marketing (DIDM) media coverage, 3x ASSOCHAM honors, Noida Education Conclave Award 2026, Economic Times & Hindustan Times coverage, and authentic event archives.",
    url: "https://www.didm.in/didm-media-coverage",
    siteName: "DIDM - Delhi Institute of Digital Marketing",
  },
};

export default function MediaCoverageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

