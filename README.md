# Sanctum.gg — Diablo IV Decision Engine

Sanctum is designed as the **intelligent progression and decision engine for Diablo IV**, not another build database or static guide site.

It helps players answer the hardest practical questions:

- Why is my build failing at this tier?
- What should I upgrade first?
- What should I farm next?
- Should I adapt this build or switch now?
- What changed this season that affects me?

## Product Direction

Sanctum differentiates through:

- **Build diagnosis** (root cause + fix priority)
- **Progression intelligence** (next-best-action planning)
- **Seasonal intelligence** (re-entry and meta adaptation)
- **Trust architecture** (reasoning, evidence, confidence)
- **Persistent personalization** (player memory across seasons)

See full docs:

- [PLAN.md](./PLAN.md) — platform architecture and operating model
- [PRODUCT_PRD.md](./PRODUCT_PRD.md) — full product requirements and UX specification
- [ROADMAP.md](./ROADMAP.md) — v1/v2/v3 scope cut and delivery sequence

## Prototype

`index.html` is a high-fidelity static prototype demonstrating:

- first-10-second onboarding
- live intelligence hub UX
- diagnosis and progression output patterns
- trust, evidence, and confidence surfaces

Run locally:

```bash
npx serve .
```

## Tech Direction

- **Current**: static HTML/CSS/JS prototype
- **Target app**: Next.js 15 + Supabase + edge inference orchestration
- **Core intelligence systems**: deterministic analyzers + evidence-grounded language layer

## Deployment

- Netlify config is in `netlify.toml`
- CI workflow runs in `.github/workflows/ci.yml`
