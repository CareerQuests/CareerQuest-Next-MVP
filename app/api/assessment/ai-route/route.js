import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Configuration constants
const CONFIG = {
  MODEL: "llama3-8b-8192",
  TEMPERATURES: {
    QUESTIONS: 0.3,
    CAREERS: 0.4,
  },
  MAX_TOKENS: {
    QUESTIONS: 1200,
    CAREERS: 2500,
  },
  // Career fields supported by the system (for future validation or UI use)
  CAREER_FIELDS: [
    "Medical & Healthcare",
    "Technology & IT",
    "Business & Finance",
    "Education & Teaching",
    "Engineering & Architecture",
    "Science & Research",
    "Creative & Design",
    "Legal & Law",
    "Public Service & Government",
    "Social Services & Community",
    "Skilled Trades",
    "Hospitality & Tourism",
    "Sports & Athletics",
    "Agriculture & Farming",
    "Freelancing",
    "Entrepreneurship",
  ],
};

// Backup questions for fallback
const backupQuestions = [
  {
    question: "What aspects of work bring you the most satisfaction?",
    options: [
      {
        text: "Solving complex technical challenges",
        traits: ["technical", "analytical"],
      },
      {
        text: "Helping and mentoring others",
        traits: ["helping", "mentoring"],
      },
      { text: "Creating and innovating", traits: ["creative", "innovative"] },
      {
        text: "Leading and organizing teams",
        traits: ["leadership", "organizational"],
      },
    ],
    reasoning: "Understanding core work motivations",
  },
  {
    question: "How do you prefer to make decisions?",
    options: [
      {
        text: "Through detailed analysis of data",
        traits: ["analytical", "data_driven"],
      },
      {
        text: "By considering impact on people",
        traits: ["empathetic", "people_focused"],
      },
      {
        text: "Using intuition and experience",
        traits: ["intuitive", "experienced"],
      },
      {
        text: "Following established procedures",
        traits: ["methodical", "structured"],
      },
    ],
    reasoning: "Understanding decision-making style",
  },
];

// Utility: Safe JSON parsing with detailed logging
const safeJSONParse = (text) => {
  if (typeof text !== "string") return null;

  try {
    const cleaned = text
      .replace(/```json\n?|```\n?/g, "")
      .replace(/[\u201C\u201D]/g, '"')
      .trim();

    const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (!match) throw new Error("No valid JSON structure found");

    return JSON.parse(match[1]);
  } catch (error) {
    console.error("JSON Parsing Error:", error.message);
    return null;
  }
};

// Utility: Validate question format
const validateQuestion = (question) => {
  if (
    !question?.question ||
    typeof question.question !== "string" ||
    !Array.isArray(question.options) ||
    question.options.length !== 4 ||
    question.options.some(
      (opt) =>
        !opt?.text ||
        !Array.isArray(opt.traits) ||
        opt.traits.length !== 2 ||
        opt.traits.some((t) => typeof t !== "string")
    )
  ) {
    return false;
  }
  return true;
};

// Utility: Fetch a unique backup question
const getUniqueBackupQuestion = (previousQuestions) => {
  const previousSet = new Set(
    previousQuestions.map((q) => q.question.toLowerCase())
  );
  return (
    backupQuestions.find((q) => !previousSet.has(q.question.toLowerCase())) ||
    backupQuestions[0]
  );
};

// Function: Generate a new question
const generateQuestion = async (currentAnswers, previousQuestions) => {
  const prompt = `Generate a career assessment question in this EXACT format:
{
  "question": "A focused career-related question",
  "options": [
    { "text": "First option", "traits": ["trait1", "trait2"] },
    { "text": "Second option", "traits": ["trait3", "trait4"] },
    { "text": "Third option", "traits": ["trait5", "trait6"] },
    { "text": "Fourth option", "traits": ["trait7", "trait8"] }
  ],
  "reasoning": "Explain the relevance of this question."
}`;

  const exclusions = previousQuestions.map((q) => q.question).join(" | ");

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: `Avoid overlap with: ${exclusions}` },
      ],
      model: CONFIG.MODEL,
      temperature: CONFIG.TEMPERATURES.QUESTIONS,
      max_tokens: CONFIG.MAX_TOKENS.QUESTIONS,
    });

    const response = safeJSONParse(completion.choices[0]?.message?.content);
    if (response && validateQuestion(response)) return response;

    throw new Error("Invalid question format");
  } catch (error) {
    console.error("Question generation error:", error.message);
    return getUniqueBackupQuestion(previousQuestions);
  }
};

// POST Route: Handle question generation
export async function POST(req) {
  try {
    const { currentAnswers = [], previousQuestions = [] } = await req.json();

    const question =
      previousQuestions.length === 0
        ? getUniqueBackupQuestion([])
        : await generateQuestion(currentAnswers, previousQuestions);

    return NextResponse.json({ ...question, id: previousQuestions.length + 1 });
  } catch (error) {
    console.error("POST Route Error:", error.message);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// PUT Route: Handle career matching
export async function PUT(req) {
  try {
    const { answers, traits } = await req.json();

    const prompt = `Generate 5 career recommendations as a JSON array. Each must include:
{
  "title": "Career Title",
  "description": "Career Description",
  "matchReasoning": "Reason for match",
  "confidenceScore": 0-1,
  "requiredSkills": ["Skill1", "Skill2"],
  "growthPotential": "High/Medium/Low",
  "workEnvironment": "Workplace setting",
  "educationPath": "Required education",
  "relatedCareers": ["Career1", "Career2"],
  "industryTrends": "Current trends",
  "workLifeBalance": "Good/Fair/Poor",
  "specializations": ["Specialization1", "Specialization2"]
}
Ensure recommendations span across diverse professional and non-professional fields, based on the traits provided. Do not focus disproportionately on any single field.  
`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: `Answers: ${JSON.stringify(
            answers
          )}, Traits: ${JSON.stringify(traits)}`,
        },
      ],
      model: CONFIG.MODEL,
      temperature: CONFIG.TEMPERATURES.CAREERS,
      max_tokens: CONFIG.MAX_TOKENS.CAREERS,
    });

    const matches = safeJSONParse(completion.choices[0]?.message?.content);
    if (Array.isArray(matches) && matches.length === 5)
      return NextResponse.json(matches);

    throw new Error("Invalid career match format");
  } catch (error) {
    console.error("PUT Route Error:", error.message);
    return NextResponse.json(
      { error: "Failed to generate career matches" },
      { status: 500 }
    );
  }
}
