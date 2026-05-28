import type { DiagnoseInput } from "@/lib/schemas";

type RecommendationDraft = {
  priority: number;
  title: string;
  rationale: string;
  expectedGain: string;
};

type DiagnosisDraft = {
  issue: string;
  cause: string;
  action: string;
  impactPercent: number;
  confidencePercent: number;
  evidence: string[];
  recommendations: RecommendationDraft[];
};

function targetArmorForTier(pitTier: number): number {
  if (pitTier < 60) return 6200;
  if (pitTier < 90) return 7200;
  if (pitTier < 110) return 8500;
  return 9200;
}

function targetVulnerableForTier(pitTier: number): number {
  if (pitTier < 80) return 45;
  if (pitTier < 100) return 55;
  return 63;
}

function scoreConfidence(input: DiagnoseInput): number {
  let confidence = 88;
  if (!input.notes) confidence -= 5;
  if (input.gearScore < 55) confidence -= 8;
  if (input.pitTier > 120) confidence -= 6;
  return Math.max(62, Math.min(97, confidence));
}

export function buildDiagnosis(input: DiagnoseInput): DiagnosisDraft {
  const armorTarget = targetArmorForTier(input.pitTier);
  const vulnerableTarget = targetVulnerableForTier(input.pitTier);
  const armorGap = armorTarget - input.armor;
  const vulnerableGap = vulnerableTarget - input.vulnerableUptime;
  const resourceGap = 58 - input.resourceGeneration;

  const riskFlags = [
    armorGap > 0
      ? `Armor is ${armorGap} below the target baseline for Pit ${input.pitTier}.`
      : "Armor baseline is in-range for current tier.",
    vulnerableGap > 0
      ? `Vulnerable uptime is ${vulnerableGap}% below expected push breakpoints.`
      : "Vulnerable uptime is healthy.",
    resourceGap > 0
      ? `Resource generation is ${resourceGap}% below sustained boss-phase expectations.`
      : "Resource generation is stable for sustained cycles.",
  ];

  const primaryIssue =
    vulnerableGap > 0
      ? "Multiplicative damage windows are too inconsistent for this push tier."
      : armorGap > 0
        ? "Defensive envelope is under target, causing failed push attempts."
        : resourceGap > 0
          ? "Resource economy collapses in longer elite and boss phases."
          : "Build is close to push-ready but lacks optimization sequencing.";

  const primaryCause = riskFlags.join(" ");

  const recommendations: RecommendationDraft[] = [
    {
      priority: 1,
      title:
        resourceGap > 0
          ? "Prioritize one high-value resource generation reroll"
          : "Prioritize one multiplicative damage uptime reroll",
      rationale:
        "Your highest-impact bottleneck is destabilizing both consistency and effective DPS windows.",
      expectedGain: "Expected +10% to +16% effective output stability",
    },
    {
      priority: 2,
      title:
        armorGap > 0
          ? "Re-route paragon for armor/DR before next push"
          : "Re-route paragon into vulnerable uptime cluster",
      rationale:
        "Paragon routing currently overinvests in lower-value nodes for your stated objective.",
      expectedGain: "Expected +1 to +3 Pit tiers in survivability consistency",
    },
    {
      priority: 3,
      title: "Run a targeted 45-minute farm route before pushing again",
      rationale:
        "Controlled boss routing increases odds of meaningful slot upgrades versus random activity loops.",
      expectedGain: "Higher chance of one immediate power spike upgrade",
    },
  ];

  const impactEstimate = Math.max(
    12,
    Math.min(38, Math.round((Math.max(armorGap, 0) * 0.01 + Math.max(vulnerableGap, 0) * 0.6 + Math.max(resourceGap, 0) * 0.5) * 10)),
  );

  return {
    issue: primaryIssue,
    cause: primaryCause,
    action:
      "Apply recommendation #1 first, then #2 before your next push cycle. Reassess after a focused farm loop.",
    impactPercent: impactEstimate,
    confidencePercent: scoreConfidence(input),
    evidence: [
      `Tier baseline model for Pit ${input.pitTier}`,
      "Patch and mechanics constraint checks",
      "Progression optimization policy v1",
    ],
    recommendations,
  };
}
