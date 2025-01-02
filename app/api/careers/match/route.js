import { connectDB } from "@/app/lib/mongodb";
import Career from "@/app/models/Career";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { traits } = await request.json();

    const careers = await Career.find({});
    const scoredCareers = careers
      .map((career) => ({
        ...career.toObject(),
        score: career.traits.reduce(
          (sum, trait) => sum + (traits[trait] || 0),
          0
        ),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    return NextResponse.json(scoredCareers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch career matches" },
      { status: 500 }
    );
  }
}
