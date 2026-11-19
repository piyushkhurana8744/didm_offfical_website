import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIDM - News and Events",
  description:
    "Get all the latest news and events update around the world as well as breaking stories in the DIDM News and Events section.",
  alternates: {
    canonical: "https://www.didm.in/news-and-events",
  },
  openGraph: {
    title: "DIDM - News and Events",
    description:
      "Get all the latest news and events update around the world as well as breaking stories in the DIDM News and Events section.",
    url: "https://www.didm.in/news-and-events",
    siteName: "DIDM - Delhi Institute of Digital Marketing",
  },
};

export default function NewsAndEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

