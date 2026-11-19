"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Compass, CalendarDays, BookOpen, Columns2 } from "lucide-react";
import type { ReactNode } from "react";

const journeys = [
  { href: "/programs", label: "Explore programs", icon: BookOpen },
  { href: "/compare", label: "Compare courses", icon: Columns2 },
  { href: "/course-finder", label: "Find your direction", icon: Compass },
  { href: "/upcoming-batches", label: "Plan your schedule", icon: CalendarDays },
];

/** Presentation only: server-rendered children and existing integration boundaries are preserved. */
export function PublicExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return children;
  const isHome = pathname === "/";
  const isEnquiry = pathname === "/enquire" || pathname === "/contact";
  return (
    <div className="didm-public" data-public-route={pathname}>
      {!isHome && (
        <nav className="public-journey-nav" aria-label="Plan your learning journey">
          <div>{journeys.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
              <Icon size={14} aria-hidden="true" /><span>{label}</span>
            </Link>
          ))}</div>
        </nav>
      )}
      {children}
      {!isHome && !isEnquiry && (
        <section className="public-next-step" aria-labelledby="next-step-title">
          <div><p className="public-eyebrow">YOUR NEXT CHAPTER</p>
            <h2 id="next-step-title">Let’s find your way forward.</h2>
            <p>Explore the curriculum, talk through your goals and choose your next step with clarity.</p>
          </div>
          <div className="public-next-actions">
            <Link className="student-primary" href="/enquire">Talk to a counsellor <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link className="public-secondary" href="/course-finder">Find my course <Compass size={16} aria-hidden="true" /></Link>
          </div>
        </section>
      )}
    </div>
  );
}
