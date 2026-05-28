# Sanctum.gg — The Diablo IV Knowledge Engine

An AI-powered companion platform for Diablo IV players that consolidates fragmented build guides, patch notes, item mechanics, and community discoveries into one intelligent experience.

## Overview

Instead of searching across Reddit, Maxroll, YouTube, and Discord, players can instantly understand how builds work, compare variants, optimize gear, and get contextual explanations tailored to their character and progression.

## Links

- **Preview**: [alvoro-sanctum-gg-the-diablo-iv-knowledge-engine.netlify.app](https://alvoro-sanctum-gg-the-diablo-iv-knowledge-engine.netlify.app)
- **Implementation Plan**: [PLAN.md](./PLAN.md)
- **Issue**: [AlvoroLabs/alvorolabs#9](https://github.com/AlvoroLabs/alvorolabs/issues/9)

## Tech Stack

- **Frontend**: HTML/CSS/JS (prototype) → Next.js 15 (production)
- **Styling**: Custom CSS with design tokens → Tailwind CSS
- **AI**: OpenAI GPT-4o / Claude API (planned)
- **Database**: Supabase (PostgreSQL + pgvector) (planned)
- **Hosting**: Netlify

## Getting Started

This is currently a static prototype. To run locally:

```bash
# Just open index.html in a browser, or:
npx serve .
```

## Automation

- **CI (GitHub Actions)**: `.github/workflows/ci.yml` runs on pull requests, pushes to `main`, and manual dispatch.
- **Netlify config**: `netlify.toml` defines static publish settings and SPA-style fallback redirects.
- **Auto-deploy expectation**: Netlify must be connected to this repository with `main` as the production branch for deploys to trigger on merge.

## Project Structure

```
├── index.html          # Main application prototype
├── PLAN.md             # Full implementation plan & analysis
├── README.md           # This file
├── public/             # Static assets
└── src/                # Source files (for future builds)
```

## Status

**Phase**: Initial prototype / Design review

---

*Built by [Alvoro Labs](https://alvorolabs.ai)*
