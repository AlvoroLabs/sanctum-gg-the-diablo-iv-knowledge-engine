"use client";

import { FormEvent, useMemo, useState } from "react";

type Recommendation = {
  id: string;
  priority: number;
  title: string;
  rationale: string;
  expectedGain: string;
};

type DiagnosisResponse = {
  id: string;
  issue: string;
  cause: string;
  action: string;
  impactPercent: number;
  confidencePercent: number;
  evidence: string[];
  buildSnapshot: {
    className: string;
    archetype: string;
    pitTier: number;
  };
  recommendations: Recommendation[];
};

const defaultForm = {
  battletag: "",
  className: "Barbarian",
  archetype: "Mighty Throw",
  pitTier: 92,
  gearScore: 80,
  armor: 7800,
  resistance: 74,
  vulnerableUptime: 42,
  resourceGeneration: 45,
  notes: "",
};

export function DiagnosisConsole() {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completion = useMemo(() => {
    let score = 0;
    if (form.className) score += 20;
    if (form.archetype) score += 20;
    if (form.pitTier > 0) score += 20;
    if (form.armor > 0) score += 20;
    if (form.vulnerableUptime >= 0) score += 20;
    return score;
  }, [form]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error || "Unable to run diagnosis");
      }

      const body = (await response.json()) as DiagnosisResponse;
      setResult(body);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "An unknown error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Build diagnosis command console</h2>
        <p>
          Submit your current build state and Sanctum will persist a full
          diagnostic report with prioritized recommendations.
        </p>
      </div>

      <form className="diagnosis-form" onSubmit={onSubmit}>
        <label>
          BattleTag (optional)
          <input
            value={form.battletag}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, battletag: event.target.value }))
            }
            placeholder="yourtag#1234"
          />
        </label>

        <label>
          Class
          <select
            value={form.className}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, className: event.target.value }))
            }
          >
            <option>Barbarian</option>
            <option>Druid</option>
            <option>Necromancer</option>
            <option>Rogue</option>
            <option>Sorcerer</option>
            <option>Spiritborn</option>
          </select>
        </label>

        <label>
          Archetype
          <input
            value={form.archetype}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, archetype: event.target.value }))
            }
            placeholder="e.g. Mighty Throw"
          />
        </label>

        <label>
          Target Pit tier
          <input
            type="number"
            value={form.pitTier}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                pitTier: Number(event.target.value) || 1,
              }))
            }
            min={1}
            max={200}
          />
        </label>

        <label>
          Gear score (1-100)
          <input
            type="number"
            value={form.gearScore}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                gearScore: Number(event.target.value) || 1,
              }))
            }
            min={1}
            max={100}
          />
        </label>

        <label>
          Armor
          <input
            type="number"
            value={form.armor}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, armor: Number(event.target.value) || 0 }))
            }
            min={0}
            max={20000}
          />
        </label>

        <label>
          Resistance %
          <input
            type="number"
            value={form.resistance}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                resistance: Number(event.target.value) || 0,
              }))
            }
            min={0}
            max={100}
          />
        </label>

        <label>
          Vulnerable uptime %
          <input
            type="number"
            value={form.vulnerableUptime}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                vulnerableUptime: Number(event.target.value) || 0,
              }))
            }
            min={0}
            max={100}
          />
        </label>

        <label>
          Resource generation %
          <input
            type="number"
            value={form.resourceGeneration}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                resourceGeneration: Number(event.target.value) || 0,
              }))
            }
            min={0}
            max={100}
          />
        </label>

        <label className="full-width">
          Notes
          <textarea
            value={form.notes}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, notes: event.target.value }))
            }
            placeholder="Describe what fails (boss phases, survivability, farming speed, etc.)"
            rows={3}
          />
        </label>

        <div className="form-footer full-width">
          <span>Profile completeness: {completion}%</span>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Running diagnosis..." : "Run persisted diagnosis"}
          </button>
        </div>
      </form>

      {error ? <p className="error-message">{error}</p> : null}

      {result ? (
        <article className="result-card" aria-live="polite">
          <header>
            <h3>
              {result.buildSnapshot.className} / {result.buildSnapshot.archetype} (
              Pit {result.buildSnapshot.pitTier})
            </h3>
            <p>
              Impact: <strong>{result.impactPercent}%</strong> | Confidence:{" "}
              <strong>{result.confidencePercent}%</strong>
            </p>
          </header>
          <section>
            <h4>Primary issue</h4>
            <p>{result.issue}</p>
          </section>
          <section>
            <h4>Why this happens</h4>
            <p>{result.cause}</p>
          </section>
          <section>
            <h4>Recommended next action</h4>
            <p>{result.action}</p>
          </section>
          <section>
            <h4>Priority queue</h4>
            <ol>
              {result.recommendations.map((recommendation) => (
                <li key={recommendation.id}>
                  <strong>#{recommendation.priority} {recommendation.title}</strong>
                  <p>{recommendation.rationale}</p>
                  <small>{recommendation.expectedGain}</small>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h4>Evidence</h4>
            <ul className="evidence-list">
              {result.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </article>
      ) : null}
    </section>
  );
}
