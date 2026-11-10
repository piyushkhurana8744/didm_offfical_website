# DIDM Course Roadmap — Game-Style Walking Character Animation Engine

**Date:** 2026-11-05  
**Component:** `apps/web/src/components/course/CourseLearningStudio.tsx` & `apps/web/src/components/roadmap/StudentJourneyAvatar.tsx`  
**Route Integration:** Master in Digital Marketing (`/programs/master-in-digital-marketing-course`, `/programs/midm`) and all 23 DIDM program routes (`/programs/[slug]`).

---

## 1. Overview & Adventure Game Experience

The DIDM interactive course roadmap has been elevated into an **adventure-game overland world map**:
- **Continuous Path Travel:** The student character physically walks along the curved SVG road between checkpoints. No teleportation or jumping across straight lines.
- **Dynamic Tangent & Orientation:** Path tangents are computed in real time (`lookPt.x - pt.x`) to flip the student avatar (`facing: "left" | "right"`) so the character always looks in the actual direction of walking.
- **Physical Walk Cycle:** Oscillating radians drive leg angles ($\pm 22^\circ$), arm counter-swings, torso bobbing (2–3px vertical bounce), and ground shadow pulsing.
- **Progressive Trail Highlighting:** The glowing `#C8102E` illuminated road trail is keyed directly to the character's exact travelled distance `d` via SVG `strokeDasharray`, syncing the glowing road beneath the avatar's feet.
- **Seamless Retargeting:** Rapid clicking or switching targets immediately computes a new trajectory from the avatar's current physical position without glitching or resetting to zero.
- **Single-View Studio:** Designed to comfortably fit inside a 1440x900 viewport without requiring scrolling down to read the active module.

---

## 2. Mathematical Architecture

### 2.1 The Master Adventure Path
The road curve is drawn inside an 850x560 coordinate space:
```svg
M 110 85 C 300 68, 520 72, 710 105 C 785 118, 795 218, 710 248 C 520 288, 300 238, 130 315 C 55 350, 65 448, 160 482 C 320 522, 540 478, 740 498
```
This produces 3 winding tiers across the landscape:
1. **Tier 1 (Top):** From Base Camp `(110, 85)` across the upper ridge to `(710, 105)`.
2. **Tier 2 (Middle):** Sweeping curve down and westward across the middle valley to `(130, 315)`.
3. **Tier 3 (Bottom):** Sweeping loop down and eastward across the lower plain to Career Capstone `(740, 498)`.

### 2.2 Path Distance & Coordinate Sampling
For $N$ modules in a course syllabus:
$$d_i = \left(0.04 + \frac{i}{N - 1} \times 0.92\right) \times L$$
where $L = \text{path.getTotalLength()}$.
Each checkpoint is placed at:
$$\mathbf{P}_i = \text{path.getPointAtLength}(d_i)$$
This mathematically guarantees that 100% of checkpoints reside precisely on the centerline of the road.

### 2.3 Continuous Motion & Walk Cycle (`requestAnimationFrame`)
When transitioning between module $A$ and module $B$:
1. $d_{\text{start}} = \text{currentDistRef.current}$
2. $d_{\text{target}} = d_B$
3. $\Delta d = d_{\text{target}} - d_{\text{start}}$
4. Duration $T = \max\left(550, \min\left(1300, \frac{|\Delta d|}{420} \times 1000\right)\right)$ ms.
5. In each RAF frame at elapsed time $t \in [0, 1]$:
   $$\text{eased}(t) = \begin{cases} 2t^2 & t < 0.5 \\ 1 - \frac{(-2t + 2)^2}{2} & t \ge 0.5 \end{cases}$$
   $$d_{\text{current}} = d_{\text{start}} + \Delta d \cdot \text{eased}(t)$$
   $$\mathbf{P}_{\text{avatar}} = \text{path.getPointAtLength}(d_{\text{current}})$$
6. Path Tangent:
   $$\Delta x = \text{path.getPointAtLength}(d_{\text{current}} + \delta).x - \mathbf{P}_{\text{avatar}}.x$$
   If $\Delta x > 0.4 \implies \text{facing} = \text{"right"}$, if $\Delta x < -0.4 \implies \text{facing} = \text{"left"}$.
7. Walk Cycle Cadence:
   $$\theta_{\text{walk}} \mathrel{+}= \frac{|\Delta d|}{T} \times 0.45$$
   $$\text{legAngle} = \sin(\theta_{\text{walk}}) \times 22^\circ$$
   $$\text{bobbingY} = -|\sin(\theta_{\text{walk}})| \times 3\text{px}$$

---

## 3. Interaction & Accessibility Verification

| Feature / Test Case | Expected Behavior | Verification Status |
|---|---|---|
| **Forward Walking** | Character walks smoothly along curve from Module 1 $\to$ 2 $\to$ 3 | Verified via RAF interpolation |
| **Backward Walking** | Character flips facing and walks backwards along the curve when selecting an earlier checkpoint | Verified ($\Delta d < 0$ and tangent detection) |
| **Rapid Retargeting** | Clicking multiple checkpoints mid-walk retargets smoothly without snapping or desyncing | Verified ($d_{\text{start}}$ captures live frame position) |
| **Responsive Road & Avatar** | Road and avatar scale seamlessly across desktop and mobile screens | Verified (viewBox + percentage anchor coordinates) |
| **Direct Scrubber Pills** | Clicking scrubber buttons commands avatar to walk to that module | Verified |
| **Keyboard Navigation** | `[←]` and `[→]` keys walk avatar to previous/next modules | Verified (with input/textarea exclusion) |
| **Reduced Motion** | Instantly positions character and path without walking loop when `prefers-reduced-motion` is active | Verified |
| **Production Build** | Compiles with 0 errors across 69 static & dynamic routes | Verified (`pnpm --filter web build` exit code 0) |

---

## 4. Live Testing Instructions

To experience the adventure-game walking character animation live:
1. Open `http://localhost:3001/programs/master-in-digital-marketing-course` (or `/programs/midm`).
2. Navigate to the **Curriculum World Map** (`#learning-studio`).
3. Click **Next** or click **Module 04 (Meta Ads Mastery)**:
   - Notice the student character turns and physically walks along the winding road curve.
   - Observe the walking legs, swaying arms, and body bobbing.
   - Watch the glowing red road trail illuminate in lockstep with the student's sneakers.
   - Observe the module detail panel on the right highlighting the tangible classroom deliverables and tools mastered.
4. Click **Module 01 (Web Infrastructure)**:
   - Notice the character immediately flips left and walks backwards along the curve.
