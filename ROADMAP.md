# Sanctum Delivery Roadmap

This roadmap is organized by capability depth, not by content volume.

## v1 — Decision Core

Goal: ship the minimum experience that consistently answers "what should I do next?"

### Scope

- Build diagnosis pipeline (issue -> cause -> impact -> action)
- Progression priority planner (Now / Next / Then)
- Trust layer (confidence + evidence + assumptions)
- Live homepage with dynamic intelligence modules
- First-time onboarding with intent-first shortcuts

### Success Criteria

- users get one clear action in their first session
- recommendation cards are actionable and evidence-backed
- returning users can recover intent in under one minute

## v2 — Seasonal and Personal Depth

Goal: reduce seasonal re-entry friction and improve recommendation fit.

### Scope

- Seasonal delta reports per class/build objective
- Build migration recommendations
- Persistent player profile and progression history
- Outcome feedback loop for recommendation quality

### Success Criteria

- improved retention on seasonal patch weeks
- measurable increase in recommendation acceptance

## v3 — Adaptive Coaching Moat

Goal: create durable defensibility via long-term player understanding.

### Scope

- adaptive coaching by playstyle profile
- predictive readiness checks before push attempts
- multi-session strategy memory and optimization loops
- shared/team diagnostics (party and clan contexts)

### Success Criteria

- sustained usage throughout season cycle
- higher trust and repeat decision reliance

## Technical Dependency Order

1. deterministic analyzers
2. recommendation scorer
3. trust metadata model
4. freshness and patch validity service
5. personalization memory graph

## Kill-Criteria Guardrails

Do not expand into broad content operations unless decision quality is strong on:

- correctness
- actionability
- confidence transparency
