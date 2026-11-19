import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep live development assets isolated from production builds and previews.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  transpilePackages: [],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.didm.in",
      },
      {
        protocol: "https",
        hostname: "didm.in",
      },
    ],
  },
  async redirects() {
    return [
      ...["master-in-digital-marketing-course", "digital-marketing-artificial-intelligence", "customized-digital-marketing-course", "gen-ai-knowledge-camp"].map(slug => ({ source: `/${slug}`, destination: `/programs/${slug}`, permanent: true })),
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/enrollnow",
        destination: "/enquire",
        permanent: true,
      },
      {
        source: "/enroll",
        destination: "/enquire",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/digital-marketing-course",
        destination: "/programs/master-in-digital-marketing-course",
        permanent: true,
      },
      {
        source: "/advanced-digital-marketing-course",
        destination: "/programs/advanced-digital-marketing-course",
        permanent: true,
      },
      {
        source: "/online-digital-marketing-course",
        destination: "/programs/online-digital-marketing-course",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/trainer",
        destination: "/trainers",
        permanent: true,
      },
      {
        source: "/trainee-reviews",
        destination: "/trainers#trainee-reviews",
        permanent: true,
      },
      {
        source: "/reviews",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/placement",
        destination: "/outcomes",
        permanent: true,
      },
      {
        source: "/placements",
        destination: "/outcomes",
        permanent: true,
      },
      {
        source: "/150-reasons-to-join-digital-marketing-course-didm",
        destination: "/why-choose-didm",
        permanent: true,
      },
      {
        source: "/100-reasons-to-join-digital-marketing-course-didm",
        destination: "/why-choose-didm",
        permanent: true,
      },
      {
        source: "/life-didm",
        destination: "/life-at-didm",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-successful-batch-images",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/didm-certifications",
        destination: "/certifications",
        permanent: true,
      },
      {
        source: "/didm-media-coverage",
        destination: "/media-coverage",
        permanent: true,
      },
      // Campus redirects from legacy flat URLs
      {
        source: "/digital-marketing-course-in-dwarka",
        destination: "/centres/dwarka",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-gurgaon",
        destination: "/centres/gurgaon",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-kalkaji",
        destination: "/centres/kalkaji",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-noida",
        destination: "/centres/noida",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-pitampura",
        destination: "/centres/pitampura",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-preet-vihar",
        destination: "/centres/preet-vihar",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-rajouri-garden",
        destination: "/centres/rajouri-garden",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-satya-niketan",
        destination: "/centres/satya-niketan",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-south-extension",
        destination: "/centres/satya-niketan",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-dehradun",
        destination: "/centres/dehradun",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-mumbai",
        destination: "/centres/mumbai",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-haldwani-rudarpur",
        destination: "/centres/haldwani-rudarpur",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-meerut",
        destination: "/centres/meerut",
        permanent: true,
      },
      {
        source: "/digital-marketing-course-in-jaipur",
        destination: "/centres/jaipur",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
