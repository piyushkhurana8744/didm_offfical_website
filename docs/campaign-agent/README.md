# Campaign creative agent — 18 November 2026

Replaced only the opening campaign brief card on the homepage (`#campaign-journey`) with a custom SVG/CSS DIDM creative-agent illustration. The existing five-chapter campaign sequence, artwork, native scrolling and course destinations remain.

Sources:
- `apps/web/src/components/creative/CampaignAgent.tsx`: custom gradient shell, glass face, friendly expression, red body, orbital details and three local sample brief choices.
- `apps/web/src/styles/campaign-agent.css`: responsive composition, restrained floating/blinking motion, offscreen/inactive pause and reduced-motion behavior.
- `apps/web/src/components/creative/CampaignJourney.tsx`: opening-scene integration.

The component explicitly says interactive demo. Brief selection uses local predefined content; it does not call an AI provider, replace the counsellor, or alter Sarvam/voice configuration. No external writes, dependency additions or deployment.

Verified against the existing local development server:
- TypeScript: passed.
- ESLint on both changed components: passed, zero findings.
- Chromium at 1440, 768 and 390 pixels: brief selection, chapter navigation, contained layout, screenshots and reduced-motion behavior passed.
- Normal animation and a live reduced-motion change: passed.
- Scoped axe WCAG A/AA rules: zero violations at all three widths. This is not whole-site certification.
- Browser page errors: zero in the recorded viewport checks.

Evidence: `qa.json`, `agent-1440.png`, `agent-768.png`, `agent-390.png`. Repeat with `node scripts/campaign-agent-qa.cjs` while the local server is on port 3000. A fresh production build was not run for this isolated presentation change; previous production-readiness blockers remain open.
