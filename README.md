# DIDM Official Website (Premium AI) - Next.js & Turborepo

Production-grade, high-performance website for **Delhi Institute of Digital Marketing (DIDM)**, built according to the **"Premium AI"** Developer Handoff specification.

## 🚀 Tech Stack

- **Turborepo** (`turbo`): Monorepo workspace architecture
- **Next.js 15 (App Router)**: Hybrid Server & Client Components, Turbopack support
- **TypeScript**: Full type safety across site data, schemas, and components
- **Tailwind CSS**: Custom token system implementing DIDM's exact brand specifications
- **Lucide React**: Clean, accessible iconography
- **SEO & AI Search**: Complete Schema.org JSON-LD (`EducationalOrganization`, `Course`, `FAQPage`, `Article`), OpenGraph tags, and `/llms.txt` for AI crawlers (Perplexity, ChatGPT, Gemini).

---

## 🎨 Theme & Design System

The visual identity follows DIDM's signature **Red & White** aesthetic with an AI indigo accent:

| Token | Light Theme | Dark Theme | Purpose |
|---|---|---|---|
| `--red` | `#C8102E` | `#FF4A65` | DIDM Primary Brand Red, CTA buttons, italic serif emphasis |
| `--red-ink` | `#A50D26` | `#FF6B82` | Red hover states, alert icons |
| `--red-soft` | `#FDF0F2` | `#2A1218` | Soft red badges, active indicators |
| `--bg` | `#FBFAF7` / `#FFFFFF` | `#0A0A0E` | Page background |
| `--surface` | `#FFFFFF` | `#131319` | Cards, panels, navigation |
| `--ai` | `#4F46E5` | `#818CF8` | AI-specific features (Course Advisor, AI tags) |
| `--ink` | `#0E0E12` | `#F3F2EE` | Primary typography |

---

## 📄 Pages Included (14 Complete Pages)

1. **Home (`/`)**: Hero with Aurora glow, interactive 3-step AI Course Advisor, 3 free entry points, 4 flagship program cards, career pathways tabs (5 categories), learning methodology (4 steps), outcomes stats, hiring partners, learner stories, DIDM at a glance fact sheet, FAQ, and final CTA band.
2. **Programs Directory (`/programs`)**: 4 flagship career courses + 3 modular short-term skill bootcamps, and a "How to Choose" decision guide.
3. **MIDM Course Detail (`/program?p=midm`)**: Comprehensive program page with key facts, 8-module deep syllabus accordion, 2-month agency internship breakdown, transparent fee schedule with 0% EMI options, and FAQ.
4. **Compare Matrix (`/compare`)**: Side-by-side comparison table (MIDM vs DMI vs Advanced vs Professional) with 6-phase deep dive of the 1-Year DMI Diploma.
5. **Outcomes Report (`/outcomes`)**: Verified placement statistics, sample batch placement table with salary packages, and the 4-step placement methodology.
6. **Student Stories (`/stories`)**: Filterable review cards by category (Job Switch, Fresh Graduate, Business Owner, Freelancer) with external Google & Justdial rating badges.
7. **Centres Directory (`/centres`)**: Live instant search and region filter chips across all 13 physical centres + live online campus.
8. **Dwarka Centre Page (`/centre/dwarka`)**: Detailed branch showcase with address, metro station, upcoming batches, lab facilities, and contact details.
9. **About DIDM (`/about`)**: Institute mission, core principles (live budgets, no fake promises), leadership, national awards (ASSOCHAM, WASME, International Fame, ISO 9001:2015), and central headquarters information.
10. **Free Learning Hub (`/learn`)**: Featured marketing playbook, filterable tabs for In-Depth Guides, AI Prompt Templates, Free Micro-lessons, and newsletter subscription.
11. **Guide Blueprint (`/article`)**: Full technical architecture article with executive summary, code/prompt samples, and conversion benchmarks.
12. **Counseling & Demo Booking (`/enquire`)**: What to expect in a demo, central phone helpline card, interactive form with program/centre pre-selection, validation, and instant confirmation state.
13. **Corporate & Teams (`/organisations`)**: Enterprise marketing team upskilling, AI transformation workshops, and hire pre-vetted DIDM graduates (zero employer fees).
14. **Custom 404 (`/_not-found`)**: Clean error page with 4 suggested navigation routes.

---

## ⚡ Interactive Features

- **AI Course Advisor**: 3-step recommendation engine (Goal → Time → Format) + intelligent keyword Q&A bar.
- **Saved Plan Bar**: Top notification banner that persists the visitor's chosen course in `localStorage`.
- **Live Centre Finder**: Real-time instant search by locality, metro station, or landmark, with region filtering.
- **Counseling Booking Form**: URL parameter pre-filling (`?p=midm&c=dwarka`), real-time field validation, and interactive submission confirmation.
- **Theme Toggle**: Light / Dark mode toggle with persistent preference in `localStorage`.
- **Mobile Sticky Action Bar**: Appears on mobile devices (`<= 768px`) with direct Call (`88005 05151`), WhatsApp, and Book Demo actions.
- **Interactive Syllabus Accordions**: Expandable curriculum modules with topics, tools, and capstone assignments.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server (Turbopack)
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
pnpm build
```

### 4. Start Production Server
```bash
pnpm start
```

# didm_offfical_website
