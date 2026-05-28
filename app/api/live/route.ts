import { NextResponse } from "next/server";

import { getLiveSignals } from "@/lib/data";

export async function GET() {
  try {
    const signals = await getLiveSignals();
    return NextResponse.json(signals);
  } catch (error) {
    console.error("Live signals API error", error);
    return NextResponse.json(
      { error: "Failed to load live signals" },
      { status: 500 },
    );
  }
}
