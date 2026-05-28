import Link from "next/link";

import { DiagnosisConsole } from "@/components/diagnosis-console";
import { LiveHub } from "@/components/live-hub";
import { getLiveSignals, getRecentDiagnoses } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [liveSignals, diagnoses] = await Promise.all([
    getLiveSignals(),
    getRecentDiagnoses(),
  ]);

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-top">
          <span className="badge">Diablo IV decision engine</span>
          <nav>
            <a href="#diagnose">Diagnose</a>
            <a href="#signals">Live hub</a>
            <a href="#architecture">Architecture</a>
          </nav>
        </div>
        <h1>Know exactly what to do next.</h1>
        <p>
          Sanctum is now a production-ready Next.js platform with persisted
          diagnosis data, API routes, and decision workflows built for real
          gameplay sessions.
        </p>
        <div className="hero-actions">
          <a href="#diagnose">Run a diagnosis</a>
          <Link href="/api/diagnoses">View persisted API output</Link>
        </div>
      </header>

      <section id="architecture" className="panel">
        <div className="section-heading">
          <h2>Production foundations shipped</h2>
          <p>
            This implementation adds durable storage, validated APIs, and a
            deployable app runtime rather than a static prototype.
          </p>
        </div>
        <div className="grid three-col">
          <article className="card">
            <h3>Persistence</h3>
            <p>
              Prisma-backed models store profiles, build snapshots, diagnosis
              reports, recommendations, and live signals.
            </p>
          </article>
          <article className="card">
            <h3>Validated APIs</h3>
            <p>
              Zod-validated route handlers persist and return diagnosis output
              contracts for UI and integrations.
            </p>
          </article>
          <article className="card">
            <h3>Deployable runtime</h3>
            <p>
              Next.js App Router, strict TypeScript, lint/typecheck/build
              scripts, and CI-ready configuration.
            </p>
          </article>
        </div>
      </section>

      <div id="diagnose">
        <DiagnosisConsole />
      </div>

      <div id="signals">
        <LiveHub liveSignals={liveSignals} diagnoses={diagnoses} />
      </div>

      <section className="panel trust">
        <div className="section-heading">
          <h2>Trust and reliability contract</h2>
          <p>
            Every diagnosis is generated through deterministic checks before
            language generation and persisted for auditability.
          </p>
        </div>
        <ul className="trust-list">
          <li>Issue to Cause to Impact to Action output contract</li>
          <li>Confidence percentages and evidence references stored per report</li>
          <li>Recommendation priority queue persisted for follow-up workflows</li>
          <li>Extensible model for seasonal deltas and profile memory</li>
        </ul>
      </section>
    </main>
  );
}
