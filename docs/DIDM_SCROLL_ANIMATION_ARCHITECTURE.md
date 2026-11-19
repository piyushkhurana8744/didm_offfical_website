# DIDM — SCROLL ANIMATION & THREE.JS TECHNICAL ARCHITECTURE
**Document ID:** `DOC-DIDM-SCROLL-ARCH-2026-V1`  
**Date:** November 13, 2026  
**Status:** Approved for Implementation  
**Project:** Delhi Institute of Digital Marketing  

---

## 1. Mathematical Architecture for Realistic Curved Page Turning

A flat plane rotating rigidly looks like a cardboard door. Real paper bends, curls, and peels off the page stack.

### Mathematical Formulation of Page Curvature
Let a turning page be represented by a segmented plane geometry of width $W$, height $H$, with $N_x \times N_y$ subdivision segments (e.g. $36 \times 16$ vertices). The spine hinge is located along the line $x = 0$.

For each vertex with rest coordinate $(x_0, y_0, 0)$ where $x_0 \in [0, W]$ and normalized distance $u = x_0 / W \in [0, 1]$:

When the page turns from the right side ($0^\circ$) to the left side ($-180^\circ$):
1. **Turn Progress $\tau \in [0, 1]$:** Governed by the scrubbed scroll signal.
2. **Angle Function $\theta(u, \tau)$:**
   $$\theta(u, \tau) = -\pi \cdot S(\tau, u)$$
   where $S(\tau, u)$ is an easing function that delays the outer edge ($u \to 1$) relative to the spine ($u \to 0$), producing a dynamic lag.
3. **Lift and Parabolic Bending $z(u, \tau)$:**
   $$z(u, \tau) = A \cdot \sin(\pi \tau) \cdot \sin(\pi u)^{0.85}$$
   where $A$ is the maximum page lift amplitude (e.g. $0.4 \times W$). This lifts the center of the page toward the camera during the midpoint of the turn ($\tau \approx 0.5$).
4. **Cylindrical Roll Correction:**
   $$x(\tau, u) = \cos(\theta) \cdot x_0$$
   $$z_{\text{total}} = z(u, \tau) + \sin(\theta) \cdot x_0 \cdot 0.2$$

This produces an authentic, organic page turn with natural paper tension, inner gutter curvature, and realistic arrival on the opposite stack.

---

## 2. PBR Material & Studio Lighting Design

### Lighting Rig
- **Key Light:** Directional light at position $(4, 6, 5)$, intensity $1.4$, warm white (`#fffdfa`), casting soft PCF shadows (`shadow-mapSize-width={2048}`).
- **Fill Light:** Directional light at position $(-4, 3, 2)$, intensity $0.6$, soft cool fill (`#f0f4f8`).
- **Rim / Accent Light:** Subtle gold-tinted rim light at $(0, -2, -4)$, intensity $0.5$ (`#ffd700`) to highlight the book spine and page edges.
- **Ambient Light:** Soft hemispheric ambient light (`#ffffff`, `#e5e5e5`), intensity $0.75$.

### Physical Materials
- **Hardcover:** `MeshPhysicalMaterial` with:
  - `color`: `#8b1515` (DIDM Crimson)
  - `roughness`: 0.38
  - `metalness`: 0.05
  - `clearcoat`: 0.3
  - `clearcoatRoughness`: 0.4
- **Gold Foil Inlay:**
  - `color`: `#d4af37`
  - `metalness`: 0.85
  - `roughness`: 0.2
- **Paper Pages:**
  - `color`: `#fdfbf7` (Warm ivory)
  - `roughness`: 0.85
  - `metalness`: 0.0
  - Double-sided rendering with custom front/back texture coordinates.

---

## 3. Dynamic Texture Generation via High-Resolution Canvas

To guarantee razor-sharp typography at any viewport zoom without loading heavy multi-megabyte image textures:
- Dedicated off-screen HTML5 Canvases ($2048 \times 2048$) render:
  - **Cover Texture:** Crimson background with fine linen weave, gold debossed DIDM crest, laurel wreath, and typography.
  - **Spread 1 Texture:** Table of Contents, ISO 9001:2015 stamp, MSME badge, Chapter 1 Overview.
  - **Spread 2 Texture:** Search engine architecture, Google Ads campaign hierarchy diagram, Meta performance funnel.
  - **Spread 3 Texture:** AI tools matrix (ChatGPT, Midjourney, Claude, GA4), conversion tracking diagram.
- Textures are instantiated once and cached in Three.js `CanvasTexture` instances with `generateMipmaps = true` and `minFilter = THREE.LinearMipmapLinearFilter`.

---

## 4. GSAP ScrollTrigger Synchronization

```ts
// Normalized progress signal drives the 3D scene:
ScrollTrigger.create({
  trigger: containerRef.current,
  start: "top top",
  end: "+=250%",
  pin: true,
  scrub: 0.6, // Smooth momentum without lag
  anticipatePin: 1,
  onUpdate: (self) => {
    // self.progress goes from 0.0 to 1.0 smoothly
    targetProgressRef.current = self.progress;
  },
});
```

- In React Three Fiber's `useFrame`, the book interpolation uses exponential dampening (`THREE.MathUtils.damp`) for silky 60 FPS transitions regardless of scroll input device (wheel, trackpad, or touch flick).
- Scrolling backwards reverses `self.progress` seamlessly with identical physics.

---

## 5. Performance Budget & Resource Disposal

- **Draw Calls:** Maintained at $\le 12$ draw calls per frame.
- **Triangle Count:** Total scene geometry $\le 18,000$ triangles.
- **Resource Disposal:** On component unmount, all geometries, textures, materials, and WebGL render targets are explicitly disposed to prevent GPU memory leaks.
- **Visibility Detection:** Uses `IntersectionObserver` to halt `requestAnimationFrame` render loop whenever the section scrolls off-screen.

