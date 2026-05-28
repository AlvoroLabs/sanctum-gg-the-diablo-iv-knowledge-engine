import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.liveSignal.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.diagnosisReport.deleteMany();
  await prisma.buildSnapshot.deleteMany();
  await prisma.playerProfile.deleteMany();

  await prisma.liveSignal.createMany({
    data: [
      {
        category: "Trending blocker",
        headline: "Resource collapse during boss phases",
        detail:
          "Mighty Throw and Blood Wave variants are dropping key uptime windows between cooldown cycles.",
        severity: "high",
      },
      {
        category: "Meta pulse",
        headline: "Companion Druid win-rate climbing",
        detail:
          "Recent interaction changes improved single-target consistency for mid-gear players.",
        severity: "medium",
      },
      {
        category: "Seasonal update",
        headline: "Tempering economy normalized",
        detail:
          "Reroll safety makes progression more deterministic for returning players.",
        severity: "low",
      },
    ],
  });

  const profile = await prisma.playerProfile.create({
    data: {
      battletag: "sanctum#4242",
      preferredClass: "Barbarian",
      primaryObjective: "Pit pushing",
    },
  });

  const snapshot = await prisma.buildSnapshot.create({
    data: {
      profileId: profile.id,
      className: "Barbarian",
      archetype: "Mighty Throw",
      pitTier: 92,
      gearScore: 81,
      armor: 7800,
      resistance: 76,
      vulnerableUptime: 41,
      resourceGeneration: 44,
      notes: "Boss phases are unstable and fury uptime drops after opener.",
    },
  });

  const diagnosis = await prisma.diagnosisReport.create({
    data: {
      profileId: profile.id,
      buildSnapshotId: snapshot.id,
      issue: "Vulnerable and fury uptime are both below Pit 95 requirements.",
      cause:
        "Cooldown and generator cadence desynchronize during elite/boss transitions, reducing multiplicative windows.",
      impactPercent: 27,
      action:
        "Rebalance one temper into resource generation and move paragon routing into uptime sustain before pushing higher tiers.",
      confidencePercent: 89,
      evidence: [
        "Patch 2.4.2 class notes",
        "Top 1k Pit clear trendlines",
        "Internal breakpoint model",
      ],
    },
  });

  await prisma.recommendation.createMany({
    data: [
      {
        diagnosisReportId: diagnosis.id,
        priority: 1,
        title: "Upgrade weapon temper into resource generation",
        rationale:
          "This resolves fury starvation and enables consistent cast cadence in boss phases.",
        expectedGain: "~14% effective DPS and smoother uptime",
      },
      {
        diagnosisReportId: diagnosis.id,
        priority: 2,
        title: "Adjust paragon path into uptime cluster",
        rationale:
          "Current board routing sacrifices vulnerable uptime for overcapped resistances.",
        expectedGain: "~2 Pit tiers stability increase",
      },
      {
        diagnosisReportId: diagnosis.id,
        priority: 3,
        title: "Farm Grigoire route before another push cycle",
        rationale:
          "Targeted item chase yields the highest slot-value probability for this build state.",
        expectedGain: "Fastest path to push-readiness in < 1 hour",
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
