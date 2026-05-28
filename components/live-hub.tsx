type LiveSignal = {
  id: string;
  category: string;
  headline: string;
  detail: string;
  severity: string;
};

type RecentDiagnosis = {
  id: string;
  issue: string;
  impactPercent: number;
  confidencePercent: number;
  buildSnapshot: {
    className: string;
    archetype: string;
    pitTier: number;
  };
  recommendations: Array<{
    id: string;
    priority: number;
    title: string;
  }>;
};

function severityLabel(severity: string): string {
  if (severity === "high") return "severity-high";
  if (severity === "medium") return "severity-medium";
  return "severity-low";
}

export function LiveHub({
  liveSignals,
  diagnoses,
}: {
  liveSignals: LiveSignal[];
  diagnoses: RecentDiagnosis[];
}) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Live intelligence hub</h2>
        <p>
          Fresh signals and recent diagnoses are pulled from persisted storage so
          the platform stays alive between sessions.
        </p>
      </div>

      <div className="grid two-col">
        <article className="card">
          <h3>Current live signals</h3>
          <ul className="list">
            {liveSignals.length === 0 ? (
              <li>No signals yet. Run seed data to populate this feed.</li>
            ) : (
              liveSignals.map((signal) => (
                <li key={signal.id}>
                  <div className="card-row">
                    <span>{signal.category}</span>
                    <span className={severityLabel(signal.severity)}>
                      {signal.severity}
                    </span>
                  </div>
                  <strong>{signal.headline}</strong>
                  <p>{signal.detail}</p>
                </li>
              ))
            )}
          </ul>
        </article>

        <article className="card">
          <h3>Recently analyzed builds</h3>
          <ul className="list">
            {diagnoses.length === 0 ? (
              <li>Run your first diagnosis to begin building progression memory.</li>
            ) : (
              diagnoses.map((diagnosis) => (
                <li key={diagnosis.id}>
                  <div className="card-row">
                    <span>
                      {diagnosis.buildSnapshot.className} /{" "}
                      {diagnosis.buildSnapshot.archetype}
                    </span>
                    <span>Pit {diagnosis.buildSnapshot.pitTier}</span>
                  </div>
                  <strong>{diagnosis.issue}</strong>
                  <p>
                    Impact {diagnosis.impactPercent}% | Confidence{" "}
                    {diagnosis.confidencePercent}%
                  </p>
                  {diagnosis.recommendations[0] ? (
                    <small>
                      Next move: {diagnosis.recommendations[0].title}
                    </small>
                  ) : null}
                </li>
              ))
            )}
          </ul>
        </article>
      </div>
    </section>
  );
}
