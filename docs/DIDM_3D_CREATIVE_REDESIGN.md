> Historical 3D implementation evidence. The 3D experiences were removed from the public website at the owner’s request on 13 November 2026; this document does not describe the current UI.

# DIDM interactive digital learning campus

## Art direction

An original, daylight miniature academy on a warm ivory landscape, with DIDM red architectural trim, muted teal glazing, wood desks, planted courtyards and compact wayfinding. The main building has an entrance, steps, windows, mullions, columns and a branded canopy. It represents a conceptual learning campus, explicitly distinguished from real branch photography.

The first homepage viewport pairs readable course positioning and two HTML CTAs with a substantial animated campus. Original DIDM campaign artwork remains below the new hero, with a single primary H1 and contained banner artwork.

## Recognizable activity

- SEO: a search/research screen and workspace.
- Social: a creative backdrop, ring light and camera/phone stand.
- Advertising: a dual-screen campaign desk.
- AI: a larger workflow workstation and device.
- Analytics: a reporting screen and dimensional comparison bars.
- Students: original procedural hierarchies with a head, hair, face, torso, backpack, separate pivoting arms and legs, trousers and shoes. Students translate through the environment, swing opposing limbs, stop, turn and pose toward learning devices, then walk back. These are original procedural animations, not licensed or rigged GLB animation clips. Do not describe them as motion capture or character animation blending.
- Screen bars animate independently. Campus interaction changes actual mesh materials and platform elevation. Camera position and look target interpolate after selection.

## Reusable system

`ImmersiveScene` handles capability, reduced motion, lazy mounting, visibility, loading posters, error boundaries and context loss. The dynamic Canvas loads only for a supported device when its section enters view. `LearningCampusScene` and `ProgramWorldScene` share materials, original geometry, typography, lighting, camera behavior and characters. `Accessible3DNavigation` supplies real buttons, live detail text and links outside WebGL.

Desktop uses DPR 1.35 and a single 1024 shadow map. Mobile uses DPR 1, no dynamic shadows and no antialiasing. A measured low-FPS quality controller can drop DPR and shadows. No external models, HDR environments, downloaded fonts or large textures block the initial campus. Still posters come from the actual local browser rendering, not an offline illustration.

## Page integration

The Master course's 52 original brochure titles and order come from the existing `course.syllabus`; all remain selectable in HTML and in the 3D roadmap. The student follows the winding learning path toward the chosen checkpoint. Keyboard arrow behavior is scoped to the checkpoint controls instead of capturing arrows globally.

The DMI course uses its six existing syllabus phases; no new duration or module facts were introduced. Advanced, Gen AI and Online have program-specific workspaces and real course links. Centres use three existing, verified branch photographs as texture panels, with their correct centre links. Other real branch photography remains in the original content. About uses only the existing 2014 establishment, published 2021 awards and 2026 team meet. Career scenes describe learning, portfolio building and support without employment guarantees.

Trainers, stories, media, news listing, galleries, campus life and journal have smaller scene accents. No 3D was added to legal pages, enquiry/contact forms or long-form article routes. Each integrated page has one Canvas. No global route-wide render loop is added.

## Experience limits

These are deliberately stylized procedural miniatures. Real-hardware graphics quality and mobile loading still require owner review. Local Chrome emulation does not validate physical Android/iOS devices, Safari, mobile thermal behavior or cellular networks. See the browser verification and performance documents for measured results and explicit limits.
