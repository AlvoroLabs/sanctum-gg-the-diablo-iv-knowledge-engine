# Sanctum — Decision Engine Platform Plan

## 1) Product Thesis

Sanctum is the **intelligent progression and decision engine for Diablo IV players**.

It does not compete as a content volume site (guides, databases, tier list SEO). It competes as a **real-time interpretation system** that helps players decide what to do next with confidence.

### Core Value

- Diagnose why a build is underperforming
- Prioritize the highest-impact upgrades
- Recommend what content to farm next
- Translate seasonal changes into player-specific impact

## 2) Strategic Positioning

### Category

**Progression Intelligence Platform**

### Positioning Statement

For Diablo IV players who are stuck, overwhelmed, or returning each season, Sanctum provides tactical decision support that explains the "why" behind recommendations and turns complexity into an actionable next-step plan.

### Messaging Pillars

1. **Understand your build**
2. **Optimize your progression**
3. **Know what to do next**
4. **Trust the reasoning**

## 3) Competitive Gap Map

Competitors are strong at:

- build catalogs
- class pages
- static tier lists
- planner UIs

Competitors are weak at:

- player-state diagnosis
- bottleneck detection
- recommendation prioritization
- confidence-scored tactical decisions
- personalized seasonal adaptation

Sanctum should intentionally own those weak zones.

## 4) Product Pillars and Systems

## P0 — Build Diagnosis Engine

### Inputs

- class, skills, paragon, glyphs
- gear affixes, aspects, uniques
- survivability profile (armor, resistance, DR)
- resource economy and rotation assumptions
- target activity and current ceiling (e.g., Pit tier)

### Outputs

Each diagnosis card returns:

1. **Issue**
2. **Cause**
3. **Impact**
4. **Action**
5. **Confidence**
6. **Evidence**

### Example

- Issue: Vulnerable uptime too low for Pit 95+
- Cause: cooldown desync and missing application source
- Impact: estimated -20% to -30% effective boss-phase DPS
- Action: re-route nodes + swap one temper + adjust opener
- Confidence: High
- Evidence: skill interaction model + patch context + observed logs

## P1 — Progression Intelligence Engine

Answers:

- What should I farm next?
- What upgrade gives the biggest gain?
- Can I push now or should I stabilize first?
- Should I pivot builds?

Output format:

- **Now** (1 immediate action)
- **Next** (top 3 upgrades ranked by expected gain)
- **Then** (short route for next 30-60 minutes)

## P1 — Seasonal Intelligence

Returning-player workflow:

- What changed since I last played?
- Which parts of my build got weaker/stronger?
- Which alternatives should I consider now?

Objects:

- Season Delta Digest
- Build Impact Report
- Migration Plan

## P1 — Trust and Reliability Layer

### Requirements

- deterministic calculators for key checks
- evidence-backed reasoning
- explicit assumptions
- confidence and uncertainty display
- patch-version references

### UI Pattern

Recommendation -> Why -> Evidence -> Expected Gain -> Risk

## P2 — Personalization and Memory

Long-term moat systems:

- progression history timeline
- playstyle profile (risk, pacing, comfort)
- recommendation outcome loop
- build memory across seasons

## 5) User Experience Architecture

### Primary Flows

1. **Diagnose my build**
2. **Tell me what to do next**
3. **Catch me up this season**

### Information Architecture

- Home (live intelligence hub)
- Diagnose (build autopsy)
- Progression (priority planner)
- Season (delta + migration)
- Profile (history + preferences + memory)

### First-10-Second Experience

Above the fold:

- intent picker ("Push higher", "Stop dying", "Farm faster", "Returning")
- immediate sample output preview
- one-click start with practical prompt examples

## 6) Home as a Living Intelligence Hub

Dynamic modules:

- trending blockers
- rising archetypes
- live community questions
- patch pulse
- recently analyzed builds (anonymized)
- high-impact fixes this week

Goal: the page feels active and useful even before user input.

## 7) Design Direction

- premium dark fantasy aesthetic
- command-center hierarchy
- low-clutter tactical cards
- subtle motion with clear purpose
- strong typography for scanability under pressure

Avoid:

- generic SaaS visuals
- crypto-neon styling
- dense dashboard overload

## 8) Intelligence Stack (Target)

### Decision Pipeline

1. ingest character/build state
2. run deterministic analyzers (damage, defense, resource, readiness)
3. score bottlenecks by impact
4. produce prioritized recommendations
5. generate language explanation with citations
6. capture outcome for personalization loop

### Services

- Profile Ingestion Service
- Build Diagnosis Service
- Progression Planner Service
- Season Delta Service
- Trust & Evidence Service
- Recommendation Memory Service

## 9) Data Model (Core Entities)

- `PlayerProfile`
- `BuildSnapshot`
- `DiagnosisReport`
- `Recommendation`
- `RecommendationOutcome`
- `SeasonChange`
- `EvidenceReference`

All core recommendation objects should be versioned and auditable.

## 10) Metrics

North-star:

- **Decision Clarity Rate**: % sessions where player receives and completes at least one clear next action

Supporting:

- time-to-first-useful-recommendation
- recommendation acceptance rate
- progression lift (self-reported or observed)
- returning-player activation after seasonal updates
- trust score (helpfulness + correctness feedback)

## 11) Rollout Shape

### v1

- build diagnosis
- progression prioritization
- trust surfaces (evidence + confidence)
- live homepage modules (limited data sources)

### v2

- seasonal delta + migration plans
- richer personalization memory
- role-based recommendations by play objective

### v3

- adaptive coaching loops
- deeper run-history-informed recommendations
- creator and team workflows for shared diagnostics

## 12) Constraints and Risks

- Inaccurate recommendations destroy trust quickly
- Overly broad output reduces actionability
- Patch velocity can stale guidance without robust update flow

Mitigation:

- source grounding
- explicit confidence and assumptions
- stale-data detection and validity windows

---

Sanctum wins if players keep it open while playing because it consistently answers one question better than anyone else:

**"Given my exact state, what should I do next?"**
