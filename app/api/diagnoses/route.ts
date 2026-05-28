import { NextResponse } from "next/server";

import { getRecentDiagnoses } from "@/lib/data";

export async function GET() {
  try {
    const diagnoses = await getRecentDiagnoses();
    return NextResponse.json(diagnoses);
  } catch (error) {
    console.error("Recent diagnoses API error", error);
    return NextResponse.json(
      { error: "Failed to load diagnoses" },
      { status: 500 },
    );
  }
}
