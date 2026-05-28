import { NextResponse } from "next/server";

import { buildDiagnosis } from "@/lib/decision-engine";
import { prisma } from "@/lib/prisma";
import { diagnoseInputSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = diagnoseInputSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const input = parsed.data;
    const diagnosisDraft = buildDiagnosis(input);

    const profile = await prisma.playerProfile.create({
      data: {
        battletag: input.battletag || null,
        preferredClass: input.className,
        primaryObjective: `Push Pit ${input.pitTier}`,
      },
    });

    const snapshot = await prisma.buildSnapshot.create({
      data: {
        profileId: profile.id,
        className: input.className,
        archetype: input.archetype,
        pitTier: input.pitTier,
        gearScore: input.gearScore,
        armor: input.armor,
        resistance: input.resistance,
        vulnerableUptime: input.vulnerableUptime,
        resourceGeneration: input.resourceGeneration,
        notes: input.notes || null,
      },
    });

    const report = await prisma.diagnosisReport.create({
      data: {
        profileId: profile.id,
        buildSnapshotId: snapshot.id,
        issue: diagnosisDraft.issue,
        cause: diagnosisDraft.cause,
        action: diagnosisDraft.action,
        impactPercent: diagnosisDraft.impactPercent,
        confidencePercent: diagnosisDraft.confidencePercent,
        evidence: diagnosisDraft.evidence,
      },
    });

    await prisma.recommendation.createMany({
      data: diagnosisDraft.recommendations.map((recommendation) => ({
        diagnosisReportId: report.id,
        priority: recommendation.priority,
        title: recommendation.title,
        rationale: recommendation.rationale,
        expectedGain: recommendation.expectedGain,
      })),
    });

    const created = await prisma.diagnosisReport.findUnique({
      where: { id: report.id },
      include: {
        buildSnapshot: true,
        recommendations: {
          orderBy: { priority: "asc" },
        },
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Diagnosis API error", error);
    return NextResponse.json(
      { error: "Failed to create diagnosis" },
      { status: 500 },
    );
  }
}
