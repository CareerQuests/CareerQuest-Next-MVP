// app/api/suggestions/route.js
import connectDB from "../db";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const { skill } = data;

  // Simple suggestion logic
  let suggestions = [];
  if (skill === "coding") {
    suggestions = ["Software Developer", "Data Scientist"];
  } else if (skill === "design") {
    suggestions = ["Graphic Designer", "UI/UX Designer"];
  }

  return NextResponse.json(suggestions);
}
