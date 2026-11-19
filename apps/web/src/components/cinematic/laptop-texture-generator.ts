"use client";

import * as THREE from "three";

/**
 * Procedural PBR Canvas Texture Generator for the DIDM 3D Digital Workspace (Laptop).
 */

export function createLaptopScreenTexture(activeTopic: string = "all"): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d")!;

  // Dark high-end agency dashboard theme
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, 1920, 1200);

  // Top App Bar
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 0, 1920, 80);

  // Window dots
  ctx.fillStyle = "#ff5f56";
  ctx.beginPath();
  ctx.arc(40, 40, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffbd2e";
  ctx.beginPath();
  ctx.arc(68, 40, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#27c93f";
  ctx.beginPath();
  ctx.arc(96, 40, 8, 0, Math.PI * 2);
  ctx.fill();

  // DIDM Agency Console Header
  ctx.fillStyle = "#b52828";
  ctx.font = "bold 26px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("DIDM AGENCY CONSOLE", 150, 48);

  ctx.fillStyle = "#8b949e";
  ctx.font = "18px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("LIVE PRACTICAL CAMPAIGN SIMULATION • BATCH 2026", 490, 48);

  // Left Sidebar
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 80, 320, 1120);

  const navItems = [
    { label: "Performance Overview", active: true },
    { label: "Google Ads Search", active: false },
    { label: "Meta Performance CAPI", active: false },
    { label: "SEO Keyword Matrix", active: false },
    { label: "GA4 Event Analytics", active: false },
    { label: "AI Copy & Creatives", active: false },
  ];

  navItems.forEach((item, idx) => {
    const ny = 120 + idx * 60;
    if (item.active) {
      ctx.fillStyle = "#b52828";
      ctx.fillRect(20, ny, 280, 45);
      ctx.fillStyle = "#ffffff";
    } else {
      ctx.fillStyle = "#8b949e";
    }
    ctx.font = "bold 18px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(item.label, 45, ny + 28);
  });

  // Main Dashboard Content Grid
  // Top KPI Metric Cards (4 Cards)
  const kpis = [
    { label: "Average ROAS", val: "4.85x", change: "+42% vs Benchmark", color: "#27c93f" },
    { label: "Conversion Rate", val: "6.24%", change: "+1.8% Post-Audit", color: "#27c93f" },
    { label: "Active Keyword Top 3", val: "184 Keywords", change: "Google Page #1", color: "#d4af37" },
    { label: "Ad Spend Executed", val: "₹12,45,000", change: "100% Live Budgets", color: "#b52828" },
  ];

  kpis.forEach((kpi, idx) => {
    const kx = 360 + idx * 370;
    ctx.fillStyle = "#161b22";
    ctx.fillRect(kx, 120, 340, 150);

    ctx.strokeStyle = "#30363d";
    ctx.lineWidth = 1;
    ctx.strokeRect(kx, 120, 340, 150);

    ctx.fillStyle = "#8b949e";
    ctx.font = "16px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(kpi.label, kx + 25, 160);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(kpi.val, kx + 25, 215);

    ctx.fillStyle = kpi.color;
    ctx.font = "bold 15px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(kpi.change, kx + 25, 250);
  });

  // Large Performance Chart
  ctx.fillStyle = "#161b22";
  ctx.fillRect(360, 310, 1450, 440);
  ctx.strokeStyle = "#30363d";
  ctx.lineWidth = 1;
  ctx.strokeRect(360, 310, 1450, 440);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("Real-Time Multi-Channel Acquisition & Revenue Growth", 400, 360);

  // Draw Line Chart Curves
  ctx.strokeStyle = "#b52828";
  ctx.lineWidth = 4;
  ctx.beginPath();
  const points = [
    [400, 680],
    [550, 640],
    [700, 580],
    [850, 610],
    [1000, 520],
    [1150, 460],
    [1300, 480],
    [1450, 420],
    [1600, 390],
    [1750, 370]
  ];
  points.forEach(([px, py], i) => {
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();

  // Draw chart fill
  ctx.lineTo(1750, 710);
  ctx.lineTo(400, 710);
  ctx.closePath();
  ctx.fillStyle = "rgba(181, 40, 40, 0.15)";
  ctx.fill();

  // Bottom 2 Sub-panels
  // Panel 1: Live Campaign Ad Creatives
  ctx.fillStyle = "#161b22";
  ctx.fillRect(360, 780, 700, 360);
  ctx.strokeStyle = "#30363d";
  ctx.lineWidth = 1;
  ctx.strokeRect(360, 780, 700, 360);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("Active Google & Meta Ad Variations (CTR: 4.2%)", 390, 830);

  ctx.fillStyle = "#8b949e";
  ctx.font = "16px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("Headline A: 'Crack 6 LPA Digital Marketing Jobs with DIDM'", 390, 880);
  ctx.fillText("Headline B: 'Master 52 Digital Marketing Modules & AI'", 390, 920);
  ctx.fillText("Headline C: '100% Placement Support Across 14 Campuses'", 390, 960);

  // Panel 2: Live AI Optimizations
  ctx.fillStyle = "#161b22";
  ctx.fillRect(1110, 780, 700, 360);
  ctx.strokeStyle = "#30363d";
  ctx.lineWidth = 1;
  ctx.strokeRect(1110, 780, 700, 360);

  ctx.fillStyle = "#27c93f";
  ctx.font = "bold 20px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("● AI Optimization Engine Active", 1140, 830);

  ctx.fillStyle = "#8b949e";
  ctx.font = "16px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("• Automated Bid Allocation shifted 24% budget to Search", 1140, 880);
  ctx.fillText("• Creative Copy refreshed with high-intent emotional hooks", 1140, 920);
  ctx.fillText("• CAPI server-side event match quality benchmarked at 9.4/10", 1140, 960);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export function createLaptopKeyboardTexture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext("2d")!;

  // Anodized space grey chassis base
  ctx.fillStyle = "#22252a";
  ctx.fillRect(0, 0, 1024, 768);

  // Keyboard well recess
  ctx.fillStyle = "#181a1d";
  ctx.fillRect(60, 40, 904, 420);

  // Keys grid
  ctx.fillStyle = "#2a2d34";
  const rows = 5;
  const cols = 14;
  const kw = 58;
  const kh = 68;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const kx = 80 + c * 64;
      const ky = 55 + r * 76;
      ctx.fillRect(kx, ky, kw, kh);
    }
  }

  // Spacebar
  ctx.fillRect(336, 55 + 4 * 76, 350, kh);

  // Trackpad
  ctx.fillStyle = "#282b31";
  ctx.strokeStyle = "#383c44";
  ctx.lineWidth = 2;
  ctx.fillRect(362, 500, 300, 220);
  ctx.strokeRect(362, 500, 300, 220);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

