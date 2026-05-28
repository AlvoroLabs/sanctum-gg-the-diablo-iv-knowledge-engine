# Sanctum.gg — Diablo IV Decision Engine

Sanctum is now a production-ready Next.js application with persisted progression intelligence data.

It is designed to answer:

- Why is my build failing?
- What should I fix first?
- What should I farm next?
- Can I push this tier now?

## What is implemented

- Next.js App Router application (`app/`)
- Persisted data layer with Prisma models (`prisma/schema.prisma`)
- Validated diagnosis API (`POST /api/diagnose`)
- Live data APIs (`GET /api/live`, `GET /api/diagnoses`)
- Persisted recommendation queue and evidence metadata
- Mobile-friendly command console and live intelligence UI
- CI pipeline with install, typecheck, lint, build, and Netlify deploy

## Data persistence

Persistence is implemented through Prisma.

Current default in `.env.example`:

- SQLite file database (`file:./prisma/dev.db`) for easy local setup

For production, set `DATABASE_URL` to PostgreSQL and run migrations/deploy scripts.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env
```

3. Generate Prisma client and create schema

```bash
npm run prisma:generate
npm run prisma:push
```

4. Seed demo data

```bash
npm run prisma:seed
```

5. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — run built app
- `npm run lint` — ESLint checks
- `npm run typecheck` — TypeScript checks
- `npm run prisma:generate` — generate Prisma client
- `npm run prisma:push` — push schema to database
- `npm run prisma:migrate` — deploy migrations in production
- `npm run prisma:seed` — seed baseline signals and sample diagnosis

## Core docs

- [PLAN.md](./PLAN.md) — platform strategy and systems plan
- [PRODUCT_PRD.md](./PRODUCT_PRD.md) — product requirements
- [ROADMAP.md](./ROADMAP.md) — phased delivery plan
- [COPY_DECK.md](./COPY_DECK.md) — messaging and UI copy system
