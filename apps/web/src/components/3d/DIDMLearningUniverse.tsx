"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { ImmersiveScene } from "./ImmersiveScene";
import { Accessible3DNavigation } from "./Accessible3DNavigation";
import { CAMPUS_LABS } from "./scene-data";
export function DIDMLearningUniverse() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="learning-universe" className="campus-hero">
      <div className="campus-topline">
        <span>DELHI INSTITUTE OF DIGITAL MARKETING</span>
        <span>LEARN. PRACTISE. CREATE.</span>
      </div>
      <div className="campus-hero-grid">
        <div className="campus-editorial">
          <span className="campus-eyebrow">
            <i /> YOUR NEXT CHAPTER STARTS HERE
          </span>
          <h1>
            Build skills.
            <br /><span className="campus-mobile-space" aria-hidden="true">&nbsp;</span>Find your <em>digital future.</em>
          </h1>
          <p className="campus-intro">
            AI-powered digital marketing courses in Delhi &amp; across India.
            Turn curiosity into practical skills, with expert mentors and
            hands-on learning.
          </p>
          <div className="campus-actions">
            <Link href="/enquire" className="campus-primary">
              Book a free demo <ArrowUpRight size={18} />
            </Link>
            <Link href="#courses" className="campus-secondary">
              Explore courses <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="campus-note">
            <span>SEO &amp; SOCIAL</span>
            <span>PERFORMANCE MARKETING</span>
            <span>GENERATIVE AI</span>
          </div>
          <div className="campus-discover">
            <span className="campus-arrow">↗</span>
            <p>
              <strong>Your learning journey, brought to life.</strong>
              <br />
              Step inside our interactive digital campus.
            </p>
          </div>
        </div>
        <div className="campus-world">
          <div className="campus-world-heading">
            <span>
              <i /> THE DIGITAL LEARNING CAMPUS
            </span>
            <span>01 / EXPLORE</span>
          </div>
          <ImmersiveScene
            stops={CAMPUS_LABS}
            active={active}
            onSelect={setActive}
          />
          <Accessible3DNavigation
            stops={CAMPUS_LABS}
            active={active}
            onSelect={setActive}
          />
          <p className="campus-art-note">
            An original miniature learning environment · Explore our real
            campuses <Link href="/centres">here ↗</Link>
          </p>
        </div>
      </div>
      <div className="campus-footer">
        <span>FROM YOUR FIRST IDEA TO YOUR NEXT OPPORTUNITY.</span>
        <Link href="/programs/master-in-digital-marketing-course">
          Discover the Master course <MoveUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
