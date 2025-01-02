// app/api/assessment/ai-route/route.js
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { currentAnswers = [], previousQuestions = [] } = await req.json();

    // If this is the first question (no previous questions/answers)
    if (previousQuestions.length === 0) {
      return NextResponse.json({
        question: "What aspects of work are most important to you?",
        options: [
          {
            text: "Making a positive impact on society",
            traits: ["social_impact", "helping_others"],
          },
          {
            text: "Creative expression and innovation",
            traits: ["creativity", "innovation"],
          },
          {
            text: "Financial success and stability",
            traits: ["financial_focus", "stability"],
          },
          {
            text: "Continuous learning and intellectual challenge",
            traits: ["learning", "intellectual"],
          },
        ],
        reasoning: "Initial question to understand basic career motivations",
      });
    }

    // Generate dynamic follow-up question based on previous answers
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a career assessment AI. Generate insightful follow-up questions based on previous answers. 
          Format response as JSON with structure: 
          {
            "question": "question text",
            "options": [
              {
                "text": "option text",
                "traits": ["trait1", "trait2"]
              }
            ],
            "reasoning": "why this question was chosen"
          }`,
        },
        {
          role: "user",
          content: `Previous questions: ${JSON.stringify(previousQuestions)}
          Current answers: ${JSON.stringify(currentAnswers)}
          Generate next question.`,
        },
      ],
      temperature: 0.7,
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("AI Assessment Error:", error);
    return NextResponse.json(
      { error: "Failed to generate assessment question" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { answers, traits } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a career matching AI. Analyze user's answers and traits to suggest suitable careers.
          Format response as JSON array with structure:
          [{
            "title": "career title",
            "description": "career description",
            "matchReasoning": "why this career matches",
            "confidenceScore": 0-1 value
          }]`,
        },
        {
          role: "user",
          content: `User answers: ${JSON.stringify(answers)}
          Trait scores: ${JSON.stringify(traits)}
          Suggest matching careers.`,
        },
      ],
      temperature: 0.7,
    });

    const careerMatches = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json(careerMatches);
  } catch (error) {
    console.error("Career Matching Error:", error);
    return NextResponse.json(
      { error: "Failed to generate career matches" },
      { status: 500 }
    );
  }
}
