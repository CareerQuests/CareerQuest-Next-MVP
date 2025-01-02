import { connectDB } from "@/app/lib/mongodb";
import Question from "@/app/models/Question";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const questions = await Question.find({});
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const question = await Question.create(data);
    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 }
    );
  }
}
