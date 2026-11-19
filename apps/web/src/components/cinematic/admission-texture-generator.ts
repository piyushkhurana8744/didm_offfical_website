"use client";

import * as THREE from "three";

/**
 * Procedural PBR Canvas Texture Generator for the DIDM Admission Folder.
 */

export function createFolderCoverTexture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Crimson folder background
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, "#7a1212");
  grad.addColorStop(1, "#520909");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle linen texture
  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  for (let i = 0; i < 1024; i += 4) {
    ctx.fillRect(i, 0, 1, 1024);
    ctx.fillRect(0, i, 1024, 1);
  }

  // Gold foil perimeter border
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, 904, 904);

  // DIDM Crest
  ctx.save();
  ctx.translate(512, 360);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#f3e5ab";
  ctx.font = "bold 38px 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("DIDM", 0, 0);
  ctx.restore();

  // Typography
  ctx.textAlign = "center";
  ctx.fillStyle = "#fce8a6";
  ctx.font = "bold 36px 'Times New Roman', serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("DELHI INSTITUTE OF DIGITAL MARKETING", 512, 540);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 48px 'Times New Roman', serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("ADMISSION DOSSIER", 512, 620);

  ctx.fillStyle = "#d4af37";
  ctx.font = "500 24px 'Helvetica Neue', Arial, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("BATCH ADMISSION & CAREER COUNSELLING • 2026", 512, 675);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export function createApplicationSheetTexture(): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#faf7f0";
  ctx.fillRect(0, 0, 1024, 1024);

  // Top header bar
  ctx.fillStyle = "#8b1515";
  ctx.fillRect(50, 50, 924, 90);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.fillText("DIDM OFFICIAL ADMISSION APPLICATION", 512, 108);

  // Application fields mockup
  ctx.textAlign = "left";
  ctx.fillStyle = "#222222";
  ctx.font = "bold 24px 'Helvetica Neue', Arial, sans-serif";

  const fields = [
    "Candidate Name: _________________________________________",
    "Contact Phone: __________________________________________",
    "Email Address: __________________________________________",
    "Selected Program: [✓] Master in Digital Marketing (MIDM)",
    "Preferred Campus: [✓] Nearest Delhi NCR Campus (14 Branches)",
    "Training Mode:    [✓] Classroom In-Person  [✓] Hybrid Agency Floor",
    "Batch Timing:     [✓] Weekday Morning     [✓] Weekend Professional"
  ];

  let y = 220;
  for (const f of fields) {
    ctx.fillText(f, 90, y);
    y += 75;
  }

  // Stamp
  ctx.strokeStyle = "#8b1515";
  ctx.lineWidth = 3;
  ctx.strokeRect(650, 780, 280, 120);

  ctx.fillStyle = "#8b1515";
  ctx.font = "bold 26px 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.fillText("VERIFIED SEAT", 790, 830);
  ctx.font = "18px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("ADMISSIONS 2026", 790, 865);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

