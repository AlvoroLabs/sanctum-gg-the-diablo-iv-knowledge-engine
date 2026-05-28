# Sanctum Product PRD

## Product Name

Sanctum — Diablo IV Decision Engine

## Objective

Transform Sanctum from an interesting AI Diablo site into the essential companion players keep open while playing.

## Non-Goals

Sanctum is not being built as:

- a build database
- a guide directory
- a static wiki
- a planner-first utility
- an SEO content hub

## Core Jobs-to-be-Done

1. Diagnose why my current build fails.
2. Tell me exactly what to prioritize next.
3. Help me adapt quickly to season changes.
4. Give recommendations I can trust.

## Personas

- **Pit Pusher**: needs precise bottleneck diagnosis and push-readiness checks.
- **Season Returner**: needs fast re-entry and migration guidance.
- **Time-Limited Grinder**: needs best-next-farm route with confidence.

## Functional Requirements

## FR-1 Build Diagnosis (P0)

### Inputs

- class + build archetype
- gear snapshot
- paragon and glyph state
- target content and goal

### Output Contract

Each issue must include:

- `issue`
- `cause`
- `impact_estimate`
- `recommended_action`
- `confidence`
- `evidence_refs`

### Acceptance Criteria

- user gets at least 1 prioritized fix in under 10 seconds for cached/common cases
- each high-impact recommendation includes confidence + evidence
- recommendations are rank-ordered by expected gain

## FR-2 Progression Intelligence (P0)

### Required Questions

- what should I farm next?
- what upgrade matters most right now?
- can I push this tier now?
- should I switch builds?

### Acceptance Criteria

- every output includes "Now / Next / Then"
- no passive option-dumps without ranking
- at least one recommendation is explicitly tied to target objective

## FR-3 Seasonal Intelligence (P1)

### Required Surfaces

- "what changed since you last played?"
- build impact summary
- recommended alternatives with migration steps

### Acceptance Criteria

- returning users can understand relevant season impact within 60 seconds
- impacts are tagged by confidence and patch source

## FR-4 Trust Layer (P0)

### Required Trust Signals

- evidence references
- patch/version references
- assumptions disclosure
- confidence indicator

### Acceptance Criteria

- no recommendation card can render without at least one trust signal

## FR-5 Living Intelligence Home (P1)

### Modules

- trending blockers
- live community concerns
- recent diagnostics
- patch pulse
- rising archetypes

### Acceptance Criteria

- homepage updates without deploy (data-driven blocks)
- at least three modules show freshness metadata

## UX Requirements

## UX-1 First 10 seconds

- clear value proposition visible above fold
- intent chips with immediate example outputs
- one-click entry into diagnosis

## UX-2 Tactical clarity

- recommendation cards with severity and expected gain
- minimal clutter and clear visual hierarchy
- short, directive language

## UX-3 Tone

Prefer:

- "Upgrade weapon first before pushing."
- "Your resistance is overcapped; armor is below target."

Avoid:

- "Here are several possibilities you could consider."

## IA (Information Architecture)

- `/` Home Intelligence Hub
- `/diagnose` Build Autopsy
- `/progression` Priority Planner
- `/season` Delta and Migration
- `/profile` Player Memory

## Screen-Level Spec Summary

## Home

- hero with tactical value proposition
- prompt starters
- live modules
- diagnosis preview card

## Diagnose

- build input/import area
- issue stack with severity
- ranked fix plan
- evidence drawer

## Progression

- objective selector
- upgrade priority queue
- farm route recommendation
- push-readiness status

## Season

- global changes summary
- personalized impact
- pivot recommendation path

## Profile

- progression history
- accepted recommendations
- outcomes and preference learning

## Data and Systems Requirements

- deterministic analyzers for resource, damage, defense, tier-fit
- recommendation impact scoring
- recommendation outcome logging
- stale-data checks by patch version

## Analytics

- decision clarity rate
- time to first useful recommendation
- recommendation follow-through rate
- return rate after seasonal patch

## Risks

- overconfident low-quality recommendations
- stale patch assumptions
- generic outputs that feel non-actionable

## Risk Controls

- confidence gating
- mandatory evidence references
- patch freshness validation
- fallback behavior when confidence is low
