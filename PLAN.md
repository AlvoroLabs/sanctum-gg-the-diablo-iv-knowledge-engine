# Sanctum.gg — The Diablo IV Knowledge Engine

## Implementation Plan & Technical Analysis

*Prepared by Alvoro Labs | May 2026*

---

## 1. Problem Analysis

### The Core Problem

Diablo IV players face a fragmented knowledge landscape. Critical game information — build guides, item mechanics, patch notes, synergy interactions, and community discoveries — is scattered across dozens of sources: Reddit threads, Maxroll guides, YouTube videos, Discord servers, Blizzard forums, and individual content creators. This creates several pain points:

1. **Information overload**: A player wanting to optimize a Spiritborn build must synthesize data from 5-10 different sources, each with different formats, recency, and reliability.
2. **Stale data**: Patch notes frequently invalidate existing guides, but updates propagate unevenly. Players follow outdated advice without knowing it.
3. **Context gap**: Generic guides don't account for a player's specific gear, level, playstyle, or progression stage.
4. **Discovery friction**: New players are overwhelmed; experienced players miss niche synergies and community-discovered mechanics.

### Who Are the Users?

| Persona | Description | Key Need |
|---------|------------|----------|
| **The Optimizer** | Hardcore endgame player pushing Pit tiers and leaderboards | Precise stat breakpoints, comparative build analysis, meta tracking |
| **The Explorer** | Mid-game player experimenting with builds and classes | Guided build recommendations, "what if" scenarios, gear suggestions |
| **The Newcomer** | Recently started, overwhelmed by complexity | Plain-language explanations, beginner-friendly paths, jargon definitions |
| **The Returner** | Comes back each season, needs to catch up fast | Patch diff summaries, meta shifts, "what changed since I left" |

### Key User Journeys

1. **"Help me understand this build"** — Player pastes or selects a build, gets a breakdown of how it works, why each skill/item is chosen, and how to gear for it.
2. **"What should I play?"** — Based on playstyle preferences and current meta, get personalized build recommendations with pros/cons.
3. **"What changed?"** — After a patch, see exactly what shifted in the meta, which builds got buffed/nerfed, and what to adjust.
4. **"Explain this mechanic"** — Ask about any game mechanic (e.g., "How does Vulnerable interact with crit damage?") and get a clear, sourced answer.
5. **"Optimize my gear"** — Input current loadout, get suggestions for upgrades and stat priorities.

---

## 2. UX Strategy

### Information Architecture

```
Sanctum.gg
├── Home / Dashboard
│   ├── Meta Overview (current season snapshot)
│   ├── Recent Patch Summary
│   └── Trending Builds & Discoveries
├── Builds
│   ├── Build Explorer (browse/filter/compare)
│   ├── Build Detail (full breakdown with AI analysis)
│   ├── Build Comparison (side-by-side)
│   └── My Builds (saved/bookmarked)
├── Knowledge Base
│   ├── Mechanics Encyclopedia
│   ├── Item Database
│   ├── Skill Trees (interactive)
│   └── Patch History
├── AI Companion
│   ├── Chat Interface (ask anything)
│   ├── Build Advisor
│   └── Gear Optimizer
├── Community
│   ├── Discovery Feed (user-submitted findings)
│   ├── Trending Topics
│   └── Contributor Profiles
└── Profile
    ├── My Characters
    ├── Saved Builds
    ├── Preferences
    └── Settings
```

### Interaction Patterns

- **Conversational AI**: Natural language queries as the primary interaction model. Type a question, get a structured answer with sources.
- **Progressive Disclosure**: Show the answer first, then "Why?" expandable sections with deeper mechanics explanation and source citations.
- **Contextual Tooltips**: Every game term, stat, and item name is hoverable with instant definitions.
- **Comparison Mode**: Select 2-3 builds/items and see a structured diff highlighting tradeoffs.
- **Smart Search**: Unified search that understands game jargon, abbreviations, and contextual intent.

### Accessibility Considerations

- High contrast dark theme (gamers expect dark UI, but ensure WCAG AA compliance)
- Keyboard navigation for all core flows
- Screen reader-friendly data tables and build cards
- Reduced motion option for animations
- Mobile-first responsive breakpoints (many players browse on phone between sessions)

---

## 3. Design Direction

### Visual Identity

**Theme**: Dark, atmospheric UI inspired by Diablo IV's gothic-demonic aesthetic — but clean and modern, not cluttered. Think "sanctuary meets Silicon Valley."

**Color Palette**:
- **Background**: Deep charcoal (#0D0D0F) with subtle warm undertones
- **Surface**: Dark slate (#1A1A2E) for cards and panels
- **Primary Accent**: Infernal amber (#D4A853) — evokes Diablo's iconic gold/fire
- **Secondary Accent**: Arcane blue (#4A90D9) — for interactive elements and AI features
- **Danger/Nerf**: Blood red (#C0392B)
- **Buff/Positive**: Verdant green (#27AE60)
- **Text**: Off-white (#E8E6E3) for readability

**Typography**:
- Headings: Inter or Cinzel (for thematic flair on key headings)
- Body: Inter — clean, highly legible at all sizes
- Code/Stats: JetBrains Mono — for numerical data and stat breakdowns

**Component Style**:
- Subtle glass-morphism on cards with very faint border glow
- Smooth micro-animations on hover/interaction (60fps)
- Data-dense but visually organized — inspired by Bloomberg Terminal meets gaming UI
- Icon system: custom Diablo-themed icons for classes, elements, damage types

### Key Screens

1. **Dashboard**: Season meta snapshot, trending builds, recent patch impact, AI quick-ask bar
2. **Build Detail**: Full build breakdown with skill tree visualization, gear grid, stat priorities, playstyle notes, AI-generated analysis
3. **AI Chat**: Clean conversational interface with structured response cards, source citations, and inline item/skill references
4. **Mechanics Page**: Encyclopedia-style entry with interactive examples, related mechanics, and patch history
5. **Comparison View**: Side-by-side build diff with highlighted differences and AI commentary on tradeoffs

### Responsive Breakpoints

- **Mobile** (< 768px): Single column, bottom nav, condensed cards
- **Tablet** (768px - 1024px): Two-column layouts, side panel for detail
- **Desktop** (> 1024px): Full multi-panel layout with persistent sidebar
- **Ultra-wide** (> 1440px): Three-panel layouts for comparison and research workflows

---

## 4. Technical Architecture

### Recommended Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15 (App Router) | SSR for SEO (build guides need to be discoverable), RSC for performance, excellent DX |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid development, consistent design system, dark theme support |
| **State** | Zustand + React Query | Lightweight, performant, great for async data patterns |
| **AI/LLM** | OpenAI GPT-4o / Claude API | Contextual Q&A, build analysis, mechanic explanations |
| **Database** | Supabase (PostgreSQL) | Real-time subscriptions, auth, vector search for semantic queries |
| **Vector Store** | pgvector (via Supabase) | Embed game knowledge for semantic search and RAG |
| **Search** | Typesense or Meilisearch | Fast, typo-tolerant full-text search for items/builds/mechanics |
| **Data Pipeline** | Python + Scrapy/Playwright | Ingest data from game databases, patch notes, community sources |
| **Hosting** | Netlify (frontend) + Supabase (backend) | Preview deploys, edge functions, managed infrastructure |
| **Auth** | Supabase Auth (OAuth) | Battle.net OAuth for character import, Google/Discord for social login |
| **Analytics** | PostHog or Plausible | Privacy-friendly, self-hostable, event tracking |

### System Architecture

```
                    ┌──────────────────────┐
                    │    Sanctum.gg Web     │
                    │   (Next.js on CDN)    │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼──────┐  ┌─────▼──────┐  ┌──────▼─────────┐
    │  API Routes /   │  │  Supabase  │  │  AI Service    │
    │  Edge Functions │  │  Realtime  │  │  (GPT-4o API)  │
    └─────────┬──────┘  └─────┬──────┘  └──────┬─────────┘
              │               │                │
              └───────────────┼────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │    Supabase DB     │
                    │  (PostgreSQL +     │
                    │   pgvector)        │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Data Pipeline    │
                    │  (Scrapy + Python) │
                    │  Patch notes,      │
                    │  builds, items,    │
                    │  community data    │
                    └───────────────────┘
```

### Data Models (Core)

```
Build
├── id (uuid)
├── title
├── class (enum: Barbarian, Druid, Necromancer, Rogue, Sorcerer, Spiritborn)
├── season (int)
├── patch_version
├── tier (S/A/B/C/D)
├── skills (jsonb) — skill tree selections
├── gear (jsonb) — item slots with stat priorities
├── paragon (jsonb) — paragon board selections
├── playstyle_notes (text)
├── source_urls (text[])
├── ai_analysis (text) — auto-generated
├── embedding (vector) — for semantic search
├── created_at, updated_at
└── author_id (fk users)

Item
├── id (uuid)
├── name
├── type (enum: weapon, armor, jewelry, etc.)
├── rarity (enum: normal, magic, rare, legendary, unique, mythic)
├── class_restriction (enum | null)
├── affixes (jsonb) — possible stat rolls
├── unique_effect (text)
├── lore_text (text)
├── season_introduced (int)
├── patch_changes (jsonb[]) — history of nerfs/buffs
├── embedding (vector)
└── image_url

Mechanic
├── id (uuid)
├── name
├── category (enum: damage, defense, resource, crowd_control, etc.)
├── description (text)
├── formula (text | null) — mathematical formula if applicable
├── interactions (jsonb) — related mechanics and how they combine
├── patch_history (jsonb[])
├── embedding (vector)
└── sources (text[])

PatchNote
├── id (uuid)
├── version
├── release_date
├── category (enum: general, class, item, system, bug_fix)
├── raw_text (text)
├── parsed_changes (jsonb[]) — structured change list
├── impact_analysis (text) — AI-generated meta impact
└── embedding (vector)

User
├── id (uuid)
├── display_name
├── auth_provider
├── battle_net_id (text | null)
├── characters (jsonb[]) — imported character data
├── saved_builds (uuid[] fk builds)
├── preferences (jsonb)
└── created_at
```

### API Design

```
/api/builds          — CRUD + search, filter by class/season/tier
/api/builds/compare  — Side-by-side comparison
/api/items           — Item database with search
/api/mechanics       — Mechanics encyclopedia
/api/patches         — Patch notes with impact analysis
/api/ai/chat         — Conversational AI endpoint (streaming)
/api/ai/analyze      — Build analysis
/api/ai/recommend    — Personalized build recommendations
/api/search          — Unified semantic + full-text search
/api/user/profile    — User preferences and characters
/api/user/saves      — Saved builds and bookmarks
```

---

## 5. Feature Breakdown & Milestones

### Phase 1 — Foundation (Weeks 1-3)

**Goal**: Core platform with build browsing and AI chat

| Feature | Priority | Effort |
|---------|----------|--------|
| Project setup (Next.js, Supabase, Tailwind) | Must-have | S |
| Authentication (email + Discord OAuth) | Must-have | M |
| Build data model + seed data (top 20 builds) | Must-have | M |
| Build Explorer (browse, filter, search) | Must-have | L |
| Build Detail page (full breakdown) | Must-have | L |
| AI Chat interface (basic Q&A about builds/mechanics) | Must-have | L |
| Responsive dark theme + design system | Must-have | M |
| Landing page / marketing | Must-have | M |

### Phase 2 — Intelligence (Weeks 4-6)

**Goal**: Smart features that differentiate from static guides

| Feature | Priority | Effort |
|---------|----------|--------|
| Semantic search (pgvector) | Must-have | M |
| Build Comparison view | Must-have | M |
| Mechanics Encyclopedia (core 50 mechanics) | Must-have | L |
| Patch note parser + impact analysis | Should-have | L |
| Data pipeline: automated build data ingestion | Should-have | L |
| Item database (uniques + mythics) | Should-have | M |
| Contextual tooltips system | Should-have | M |

### Phase 3 — Personalization (Weeks 7-9)

**Goal**: Tailored experience per player

| Feature | Priority | Effort |
|---------|----------|--------|
| Character profiles (manual input) | Should-have | M |
| Personalized build recommendations | Should-have | L |
| Gear optimization suggestions | Should-have | L |
| "What changed since I left" feature | Nice-to-have | M |
| Battle.net OAuth + character import | Nice-to-have | L |
| Saved builds / bookmarks | Should-have | S |

### Phase 4 — Community (Weeks 10-12)

**Goal**: Community-driven knowledge growth

| Feature | Priority | Effort |
|---------|----------|--------|
| Discovery Feed (user submissions) | Nice-to-have | L |
| Build ratings + comments | Nice-to-have | M |
| Contributor system | Nice-to-have | M |
| Email digest (weekly meta update) | Nice-to-have | S |
| Performance optimization + caching | Must-have | M |
| SEO optimization for build pages | Must-have | M |

**Effort Key**: S = 1-2 days, M = 3-5 days, L = 1-2 weeks

---

## 6. Key Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Data sourcing complexity** — Scraping game data from multiple formats is brittle | High | High | Start with manual curation + structured data sources (Blizzard API where available). Build scrapers incrementally. |
| **Patch velocity** — Blizzard patches can invalidate data quickly | Medium | High | Automated patch note monitoring + flagging system. AI-assisted impact analysis to fast-track updates. |
| **LLM hallucination** — AI giving wrong game information | High | High | RAG architecture grounded in verified data. Confidence scoring. Source citations on every AI response. Human review for high-visibility answers. |
| **Scope creep** — Gaming knowledge bases can grow infinitely | High | Medium | Strict phase gating. MVP focuses on builds (highest traffic potential). Expand only after validating engagement. |
| **API costs** — LLM API calls at scale can be expensive | Medium | Medium | Aggressive caching of common queries. Hybrid approach: pre-computed analyses for popular builds, live LLM only for unique queries. |
| **Legal/IP risk** — Using Diablo IV game assets and data | Low | High | Use only publicly available information. Don't redistribute copyrighted assets (screenshots, art). Follow Blizzard's community content policy. |
| **Community trust** — Gamers are skeptical of AI-generated content | Medium | Medium | Transparency: always show sources, confidence levels, and "last verified" dates. Allow community corrections. |

---

## 7. Budget Allocation

*Note: Budget was not specified in the submission. Below is a recommended allocation framework that can be scaled.*

| Phase | Allocation | Focus |
|-------|-----------|-------|
| Phase 1 — Foundation | 35% | Core infrastructure, design system, basic features |
| Phase 2 — Intelligence | 30% | AI integration, data pipeline, search |
| Phase 3 — Personalization | 20% | User features, character integration |
| Phase 4 — Community | 15% | Social features, optimization, polish |

### Key Cost Centers

- **LLM API**: ~$200-500/mo at moderate traffic (with caching). Scale with usage.
- **Supabase**: Pro plan ~$25/mo. Sufficient for MVP + moderate scale.
- **Hosting (Netlify)**: Pro plan included. Edge functions for API routes.
- **Search (Typesense Cloud)**: ~$30/mo for hosted search.
- **Development**: Primary cost. Estimate 10-12 weeks for full Phase 1-2 delivery.

---

## 8. Next Steps

1. **Validate data sources**: Identify and test primary data sources for builds, items, and mechanics
2. **Design system**: Finalize component library and interaction patterns in Figma
3. **Infrastructure setup**: Supabase project, Next.js repo, CI/CD pipeline
4. **Seed data**: Curate top 20 meta builds across all classes for initial content
5. **AI prototype**: Test RAG pipeline with sample game knowledge for accuracy
6. **User testing**: Share early prototype with 5-10 Diablo IV players for feedback

---

*This plan is a living document. It will be updated as we learn more about the project scope, budget constraints, and user feedback.*
