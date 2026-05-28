import { prisma } from "@/lib/prisma";

export async function getLiveSignals() {
  return prisma.liveSignal.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function getRecentDiagnoses() {
  return prisma.diagnosisReport.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      buildSnapshot: true,
      recommendations: {
        orderBy: { priority: "asc" },
      },
    },
  });
}
