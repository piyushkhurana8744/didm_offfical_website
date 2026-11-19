"use client";

import * as THREE from "three";

/**
 * Procedural PBR Canvas Texture Generator for DIDM 3D Hardcover Book.
 * Creates ultra-sharp 2048x2048 textures with zero network latency.
 */

// Helper to draw delicate corner ornaments
function drawCornerOrnament(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, size);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(size * 0.4, size * 0.4, size * 0.25, 0, Math.PI * 2);
  ctx.fillStyle = "#d4af37";
  ctx.fill();

  ctx.restore();
}

/**
 * 1. Front Cover Texture: Deep crimson with gold foil debossing & DIDM Crest
 */
export function createCoverTexture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d")!;

  // Deep crimson gradient background with subtle luxury leather vignette
  const grad = ctx.createRadialGradient(1024, 1024, 200, 1024, 1024, 1400);
  grad.addColorStop(0, "#8f1717");
  grad.addColorStop(0.65, "#751010");
  grad.addColorStop(1, "#520909");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 2048);

  // Subtle linen / buckram texture overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.035)";
  for (let i = 0; i < 2048; i += 4) {
    ctx.fillRect(i, 0, 1, 2048);
    ctx.fillRect(0, i, 2048, 1);
  }

  // Double gold foil border
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 5;
  ctx.strokeRect(100, 100, 1848, 1848);

  ctx.lineWidth = 2;
  ctx.strokeRect(125, 125, 1798, 1798);

  // Four corner ornaments
  drawCornerOrnament(ctx, 130, 130, 60, 0);
  drawCornerOrnament(ctx, 1918, 130, 60, Math.PI / 2);
  drawCornerOrnament(ctx, 1918, 1918, 60, Math.PI);
  drawCornerOrnament(ctx, 130, 1918, 60, (Math.PI * 3) / 2);

  // Central Gold Laurel Wreath & Crest
  ctx.save();
  ctx.translate(1024, 580);

  // Laurel wreath arc
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 160, 0.25 * Math.PI, 0.75 * Math.PI, true);
  ctx.stroke();

  // Draw stylized leaves
  for (let a = -130; a <= -50; a += 15) {
    const rad = (a * Math.PI) / 180;
    const lx = Math.cos(rad) * 165;
    const ly = Math.sin(rad) * 165;
    ctx.beginPath();
    ctx.ellipse(lx, ly, 18, 8, rad + 0.4, 0, Math.PI * 2);
    ctx.fillStyle = "#d4af37";
    ctx.fill();
  }
  for (let a = 230; a >= 150; a -= 15) {
    const rad = (a * Math.PI) / 180;
    const lx = Math.cos(rad) * 165;
    const ly = Math.sin(rad) * 165;
    ctx.beginPath();
    ctx.ellipse(lx, ly, 18, 8, rad - 0.4, 0, Math.PI * 2);
    ctx.fillStyle = "#d4af37";
    ctx.fill();
  }

  // Inner Crest Shield
  ctx.beginPath();
  ctx.moveTo(0, -90);
  ctx.lineTo(75, -50);
  ctx.lineTo(75, 45);
  ctx.quadraticCurveTo(75, 105, 0, 135);
  ctx.quadraticCurveTo(-75, 105, -75, 45);
  ctx.lineTo(-75, -50);
  ctx.closePath();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = "#d4af37";
  ctx.stroke();

  // Central "DIDM" Monogram in Shield
  ctx.fillStyle = "#f3e5ab";
  ctx.font = "bold 58px 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("DIDM", 0, 20);
  ctx.restore();

  // Gold Typography - Header
  ctx.textAlign = "center";
  ctx.fillStyle = "#f7d774";
  ctx.font = "600 38px 'Times New Roman', serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("DELHI INSTITUTE OF DIGITAL MARKETING", 1024, 860);

  ctx.fillStyle = "#d4af37";
  ctx.font = "400 24px 'Times New Roman', serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("EST. 2014 • 10 YEARS OF ACADEMIC EXCELLENCE", 1024, 915);

  // Ornamental Divider Line with Diamond
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(600, 960);
  ctx.lineTo(980, 960);
  ctx.moveTo(1068, 960);
  ctx.lineTo(1448, 960);
  ctx.stroke();

  ctx.save();
  ctx.translate(1024, 960);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(-10, -10, 20, 20);
  ctx.restore();

  // Book Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 82px 'Times New Roman', serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("MASTER IN", 1024, 1100);

  ctx.fillStyle = "#fce8a6";
  ctx.font = "900 96px 'Times New Roman', serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("DIGITAL MARKETING", 1024, 1220);

  // Subtitle
  ctx.fillStyle = "#e0cfb3";
  ctx.font = "500 36px 'Helvetica Neue', Arial, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("THE 52-MODULE ROADMAP", 1024, 1315);

  ctx.fillStyle = "#c29d38";
  ctx.font = "400 28px 'Helvetica Neue', Arial, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("PRACTICAL AGENCY SIMULATION • LIVE AD BUDGETS", 1024, 1370);

  // Bottom Accreditations Bar
  ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(320, 1600, 1408, 120);

  ctx.fillStyle = "#f5d77f";
  ctx.font = "bold 26px 'Helvetica Neue', Arial, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("ISO 9001:2015 CERTIFIED  •  MINISTRY OF MSME  •  ASSOCHAM RECOGNIZED", 1024, 1670);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * 2. Inside Left Spread (Front Inside Cover): Credentials & Academic Welcome
 */
export function createInsideCoverTexture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d")!;

  // Warm ivory background with subtle paper texture
  ctx.fillStyle = "#faf6ef";
  ctx.fillRect(0, 0, 2048, 2048);

  // Inner border
  ctx.strokeStyle = "#8b1515";
  ctx.lineWidth = 3;
  ctx.strokeRect(100, 100, 1848, 1848);

  ctx.strokeStyle = "#e0d3c1";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(120, 120, 1808, 1808);

  // Header
  ctx.textAlign = "center";
  ctx.fillStyle = "#8b1515";
  ctx.font = "bold 52px 'Times New Roman', serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("DELHI INSTITUTE OF DIGITAL MARKETING", 1024, 250);

  ctx.fillStyle = "#666666";
  ctx.font = "500 28px 'Helvetica Neue', Arial, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("OFFICIAL ACADEMIC CURRICULUM • ESTABLISHED 2014", 1024, 305);

  // Divider
  ctx.strokeStyle = "#8b1515";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(350, 350);
  ctx.lineTo(1698, 350);
  ctx.stroke();

  // Mission Statement Text
  ctx.textAlign = "left";
  ctx.fillStyle = "#222222";
  ctx.font = "32px 'Times New Roman', serif";
  const lines = [
    "Welcome to the official curriculum of India's leading digital marketing institute.",
    "",
    "At DIDM, education transcends theoretical lecturing. Our programs are engineered",
    "on real agency workflows: managing live Google Ads budgets, deploying Meta Pixel",
    "Conversion APIs, mastering programmatic search engine optimization algorithms,",
    "and harnessing modern generative artificial intelligence workflows.",
    "",
    "Over the past 10 years, DIDM has successfully empowered over 70,000+ candidates",
    "across 14 physical campuses in Delhi NCR and across India. With an unmatched",
    "80% practical execution model, every module prepares students, entrepreneurs,",
    "and corporate leaders to achieve measurable digital marketing success."
  ];

  let y = 460;
  for (const line of lines) {
    ctx.fillText(line, 220, y);
    y += 46;
  }

  // 3 Pillar Trust Cards
  const pillars = [
    { title: "80% Practical", desc: "Live client ad campaigns & portfolio projects" },
    { title: "52 Modules", desc: "Comprehensive full-stack digital marketing" },
    { title: "30+ Certs", desc: "Google, Meta, Hubspot & MSME credentials" }
  ];

  pillars.forEach((p, idx) => {
    const px = 220 + idx * 540;
    ctx.fillStyle = "#f0e6d6";
    ctx.fillRect(px, 1150, 500, 220);

    ctx.strokeStyle = "#8b1515";
    ctx.lineWidth = 2;
    ctx.strokeRect(px, 1150, 500, 220);

    ctx.fillStyle = "#8b1515";
    ctx.font = "bold 36px 'Times New Roman', serif";
    ctx.fillText(p.title, px + 30, 1220);

    ctx.fillStyle = "#444444";
    ctx.font = "24px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(p.desc, px + 30, 1280);
  });

  // Institutional Seals (Stamps)
  ctx.textAlign = "center";
  ctx.fillStyle = "#7a1212";
  ctx.font = "bold 30px 'Times New Roman', serif";
  ctx.fillText("CERTIFIED & ACCREDITED BY", 1024, 1550);

  ctx.fillStyle = "#333333";
  ctx.font = "bold 26px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("ISO 9001:2015 QUALITY MANAGEMENT  •  MINISTRY OF MSME, GOVT. OF INDIA", 1024, 1610);
  ctx.fillText("ASSOCHAM MOST PROMISING BRAND  •  GOOGLE PREMIER PARTNER", 1024, 1660);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * 3. Spread 1: Chapter 1 — Foundational Strategy & Digital Ecosystem
 */
export function createSpread1Texture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#fdfbf7";
  ctx.fillRect(0, 0, 2048, 2048);

  // Delicate page borders
  ctx.strokeStyle = "#e8dfd3";
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 80, 1888, 1888);

  // Header Tag
  ctx.fillStyle = "#8b1515";
  ctx.font = "bold 28px 'Helvetica Neue', Arial, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("MODULE GROUP 01  •  CURRICULUM OVERVIEW", 140, 160);

  // Chapter Title
  ctx.fillStyle = "#1a1a1a";
  ctx.font = "bold 64px 'Times New Roman', serif";
  ctx.fillText("The Foundations of Modern Digital Strategy", 140, 245);

  ctx.fillStyle = "#666666";
  ctx.font = "30px 'Times New Roman', serif";
  ctx.fillText("Architecting high-converting digital customer journeys from awareness to purchase.", 140, 305);

  // Divider
  ctx.strokeStyle = "#8b1515";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(140, 350);
  ctx.lineTo(1900, 350);
  ctx.stroke();

  // 4 Core Competency Boxes
  const competencies = [
    {
      num: "01",
      title: "Digital Marketing Ecosystem",
      desc: "Comprehensive understanding of multi-channel funnels, organic vs paid synergies, and modern consumer touchpoints."
    },
    {
      num: "02",
      title: "Audience & Market Research",
      desc: "Creating buyer personas, competitive intelligence gathering, market segmentation, and keyword demand mapping."
    },
    {
      num: "03",
      title: "Conversion-Focused Web Architecture",
      desc: "Designing high-converting landing pages, user experience heuristics, call-to-action optimization, and speed auditing."
    },
    {
      num: "04",
      title: "Brand Storytelling & Content Strategy",
      desc: "Developing persuasive brand narratives, organic social hooks, editorial calendars, and value-driven lead magnets."
    }
  ];

  competencies.forEach((c, idx) => {
    const cy = 420 + idx * 260;

    // Card background
    ctx.fillStyle = "#f5eee4";
    ctx.fillRect(140, cy, 1760, 220);

    ctx.strokeStyle = "#8b1515";
    ctx.lineWidth = 2;
    ctx.strokeRect(140, cy, 1760, 220);

    // Number badge
    ctx.fillStyle = "#8b1515";
    ctx.fillRect(140, cy, 90, 220);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(c.num, 185, cy + 125);

    // Text content
    ctx.textAlign = "left";
    ctx.fillStyle = "#111111";
    ctx.font = "bold 38px 'Times New Roman', serif";
    ctx.fillText(c.title, 265, cy + 75);

    ctx.fillStyle = "#444444";
    ctx.font = "28px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(c.desc, 265, cy + 140);
  });

  // Footer page number
  ctx.textAlign = "right";
  ctx.fillStyle = "#888888";
  ctx.font = "bold 24px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("DIDM CURRICULUM  •  PAGE 01", 1900, 1920);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * 4. Spread 2: Chapter 2 — Search Engine Optimization & Paid Performance Ads
 */
export function createSpread2Texture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#fdfbf7";
  ctx.fillRect(0, 0, 2048, 2048);

  ctx.strokeStyle = "#e8dfd3";
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 80, 1888, 1888);

  // Header Tag
  ctx.fillStyle = "#8b1515";
  ctx.font = "bold 28px 'Helvetica Neue', Arial, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("MODULE GROUP 02  •  PERFORMANCE & SEARCH", 140, 160);

  // Chapter Title
  ctx.fillStyle = "#1a1a1a";
  ctx.font = "bold 64px 'Times New Roman', serif";
  ctx.fillText("Performance Marketing & Search Excellence", 140, 245);

  ctx.fillStyle = "#666666";
  ctx.font = "30px 'Times New Roman', serif";
  ctx.fillText("Managing live ad budgets on Google Ads, Meta Ads Manager, and mastering organic search.", 140, 305);

  ctx.strokeStyle = "#8b1515";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(140, 350);
  ctx.lineTo(1900, 350);
  ctx.stroke();

  // Dual Column Layout: Left Column SEO, Right Column Paid Ads
  // Left Column (SEO)
  ctx.fillStyle = "#f3eee5";
  ctx.fillRect(140, 420, 850, 1200);
  ctx.strokeStyle = "#8b1515";
  ctx.lineWidth = 2;
  ctx.strokeRect(140, 420, 850, 1200);

  ctx.fillStyle = "#8b1515";
  ctx.font = "bold 40px 'Times New Roman', serif";
  ctx.fillText("Search Engine Optimization (SEO)", 190, 500);

  const seoPoints = [
    "• Technical Site Audits & Core Web Vitals",
    "• Keyword Intent Clustering & Semantic Search",
    "• On-Page Optimization (Meta, H1, Schema.org)",
    "• Off-Page Link Architecture & Outreach",
    "• Local SEO & Google Business Profile Domination",
    "• Competitor Backlink Scraping & Gap Analysis",
    "• Algorithm Updates (Helpful Content, BERT, MUM)"
  ];
  let sy = 580;
  ctx.fillStyle = "#333333";
  ctx.font = "28px 'Helvetica Neue', Arial, sans-serif";
  for (const pt of seoPoints) {
    ctx.fillText(pt, 190, sy);
    sy += 80;
  }

  // Right Column (Google & Meta Ads)
  ctx.fillStyle = "#f3eee5";
  ctx.fillRect(1050, 420, 850, 1200);
  ctx.strokeStyle = "#8b1515";
  ctx.lineWidth = 2;
  ctx.strokeRect(1050, 420, 850, 1200);

  ctx.fillStyle = "#8b1515";
  ctx.font = "bold 40px 'Times New Roman', serif";
  ctx.fillText("Paid Ads & Performance Scale", 1100, 500);

  const adsPoints = [
    "• Google Search, Performance Max & Display",
    "• Quality Score Maximization & Bidding Logic",
    "• Meta Conversion API (CAPI) Integration",
    "• High-ROAS Lookalike & Retargeting Funnels",
    "• YouTube Video Campaigns & Ad Sequencing",
    "• E-commerce Shopping Ads & Catalog Feeds",
    "• A/B Testing Ad Copy, Hooks, and Visual Creatives"
  ];
  let ay = 580;
  ctx.fillStyle = "#333333";
  ctx.font = "28px 'Helvetica Neue', Arial, sans-serif";
  for (const pt of adsPoints) {
    ctx.fillText(pt, 1100, ay);
    ay += 80;
  }

  // Footer page number
  ctx.textAlign = "right";
  ctx.fillStyle = "#888888";
  ctx.font = "bold 24px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("DIDM CURRICULUM  •  PAGE 02", 1900, 1920);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * 5. Spread 3: Chapter 3 — Generative AI Automation & Web Analytics
 */
export function createSpread3Texture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#fdfbf7";
  ctx.fillRect(0, 0, 2048, 2048);

  ctx.strokeStyle = "#e8dfd3";
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 80, 1888, 1888);

  // Header Tag
  ctx.fillStyle = "#8b1515";
  ctx.font = "bold 28px 'Helvetica Neue', Arial, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("MODULE GROUP 03  •  AI & MARKETING ANALYTICS", 140, 160);

  // Chapter Title
  ctx.fillStyle = "#1a1a1a";
  ctx.font = "bold 64px 'Times New Roman', serif";
  ctx.fillText("Generative AI & Marketing Analytics", 140, 245);

  ctx.fillStyle = "#666666";
  ctx.font = "30px 'Times New Roman', serif";
  ctx.fillText("10x your campaign velocity with cutting-edge AI tools and data-driven GA4 measurement.", 140, 305);

  ctx.strokeStyle = "#8b1515";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(140, 350);
  ctx.lineTo(1900, 350);
  ctx.stroke();

  // AI & Analytics Highlights
  const topics = [
    {
      title: "Generative AI Prompt Engineering",
      desc: "Master prompts for ChatGPT, Claude, and Midjourney to craft high-converting ad copies, scripts, and campaign graphics in minutes."
    },
    {
      title: "Google Analytics 4 (GA4) Architecture",
      desc: "Implement custom event measurement, cross-domain user tracking, exploration reports, and data-driven attribution models."
    },
    {
      title: "Google Tag Manager (GTM) Pipelines",
      desc: "Deploy client-side & server-side container tags, dataLayer push events, and custom conversion triggers without developer dependencies."
    },
    {
      title: "Live Agency Simulation & 100% Placement",
      desc: "Execute actual campaigns with certified industry mentors, build a portfolio of verified results, and interview with 500+ hiring partners."
    }
  ];

  topics.forEach((t, idx) => {
    const ty = 420 + idx * 260;

    ctx.fillStyle = "#f7f2ea";
    ctx.fillRect(140, ty, 1760, 220);

    ctx.strokeStyle = "#8b1515";
    ctx.lineWidth = 2;
    ctx.strokeRect(140, ty, 1760, 220);

    ctx.fillStyle = "#8b1515";
    ctx.font = "bold 38px 'Times New Roman', serif";
    ctx.textAlign = "left";
    ctx.fillText(t.title, 190, ty + 75);

    ctx.fillStyle = "#444444";
    ctx.font = "28px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(t.desc, 190, ty + 140);
  });

  // Footer page number
  ctx.textAlign = "right";
  ctx.fillStyle = "#888888";
  ctx.font = "bold 24px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("DIDM CURRICULUM  •  PAGE 03", 1900, 1920);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * 6. Page Stack Edge Texture: Realistic horizontal ivory paper striations
 */
export function createPageEdgeTexture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#f5eee4";
  ctx.fillRect(0, 0, 512, 512);

  // Micro paper layers
  for (let y = 0; y < 512; y += 3) {
    const shade = Math.floor(235 + Math.random() * 15);
    ctx.fillStyle = `rgb(${shade}, ${shade - 6}, ${shade - 14})`;
    ctx.fillRect(0, y, 512, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 24);
  return texture;
}

