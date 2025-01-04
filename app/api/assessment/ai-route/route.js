// app/api/assessment/ai-route/route.js
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const CONFIG = {
  MODEL: "llama3-8b-8192",
  TEMPERATURES: {
    QUESTIONS: 0.3,
    CAREERS: 0.4,
  },
  MAX_TOKENS: {
    QUESTIONS: 1000,
    CAREERS: 2000,
  },
};

// Backup questions
const backupQuestions = [
  {
    question: "How do you prefer to solve workplace challenges?",
    options: [
      {
        text: "Through systematic analysis and research",
        traits: ["analytical", "methodical"],
      },
      {
        text: "By collaborating and brainstorming with others",
        traits: ["collaborative", "team_oriented"],
      },
      {
        text: "Using creative and innovative approaches",
        traits: ["creative", "innovative"],
      },
      {
        text: "Following established procedures and best practices",
        traits: ["structured", "procedural"],
      },
    ],
    reasoning: "Understanding problem-solving approach",
  },
  {
    question: "What type of work environment do you thrive in?",
    options: [
      {
        text: "Fast-paced with diverse challenges",
        traits: ["adaptable", "dynamic"],
      },
      {
        text: "Structured with clear objectives",
        traits: ["organized", "focused"],
      },
      {
        text: "Creative and experimental",
        traits: ["innovative", "experimental"],
      },
      {
        text: "Supportive and collaborative",
        traits: ["supportive", "team_oriented"],
      },
    ],
    reasoning: "Understanding preferred work environment",
  },
  {
    question: "How do you prefer to learn new skills?",
    options: [
      {
        text: "Through hands-on practice and experimentation",
        traits: ["practical", "experiential"],
      },
      {
        text: "By studying theory and concepts first",
        traits: ["analytical", "theoretical"],
      },
      {
        text: "Through group learning and discussions",
        traits: ["collaborative", "interactive"],
      },
      {
        text: "Via self-directed research and practice",
        traits: ["independent", "self_directed"],
      },
    ],
    reasoning: "Understanding learning style preferences",
  },
];

// Helper functions
const safeJSONParse = (text) => {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid input for JSON parsing");
  }

  try {
    const cleanText = text.replace(/```json\n?|```\n?/g, "").trim();

    if (!cleanText) {
      throw new Error("Empty JSON string after cleaning");
    }

    try {
      return JSON.parse(cleanText);
    } catch (initialError) {
      const match = cleanText.match(/[\[\{][\s\S]*[\}\]]/);
      if (!match) {
        throw new Error("No valid JSON structure found");
      }
      const result = JSON.parse(match[0]);

      if (!result) {
        throw new Error("Parsed result is empty");
      }

      return result;
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
};

const validateQuestionResponse = (response, previousQuestions) => {
  if (!response?.question || typeof response.question !== "string") {
    throw new Error("Invalid question format");
  }

  if (!Array.isArray(response?.options) || response.options.length !== 4) {
    throw new Error("Invalid options array");
  }

  const validOptions = response.options.every(
    (opt) =>
      typeof opt.text === "string" &&
      Array.isArray(opt.traits) &&
      opt.traits.length === 2 &&
      opt.traits.every((trait) => typeof trait === "string")
  );

  if (!validOptions) {
    throw new Error("Invalid option format");
  }

  const isDuplicate = previousQuestions.some(
    (prevQ) => prevQ.question.toLowerCase() === response.question.toLowerCase()
  );

  if (isDuplicate) {
    throw new Error("Duplicate question detected");
  }

  return true;
};

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { currentAnswers = [], previousQuestions = [] } = body;

    // First question
    if (previousQuestions.length === 0) {
      return NextResponse.json({
        question: "What aspects of work are most important to you?",
        options: [
          {
            text: "Making a meaningful impact on society",
            traits: ["social_impact", "helping_others"],
          },
          {
            text: "Innovation and creative expression",
            traits: ["innovation", "creative"],
          },
          {
            text: "Financial success and stability",
            traits: ["financial_focus", "stability"],
          },
          {
            text: "Learning and intellectual challenge",
            traits: ["learning", "intellectual"],
          },
        ],
        reasoning: "Understanding core work values",
        id: 0,
      });
    }

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a career assessment AI. Generate a follow-up question based on previous answers.
              Return ONLY a JSON object in this exact format:
              {
                "question": "your career-focused question here",
                "options": [
                  {"text": "descriptive answer 1", "traits": ["trait1", "trait2"]},
                  {"text": "descriptive answer 2", "traits": ["trait3", "trait4"]},
                  {"text": "descriptive answer 3", "traits": ["trait5", "trait6"]},
                  {"text": "descriptive answer 4", "traits": ["trait7", "trait8"]}
                ],
                "reasoning": "brief explanation of question relevance"
              }
              
              Rules:
              1. Each option MUST have exactly 2 traits
              2. Question must be unique and different from: ${previousQuestions
                .map((q) => q.question)
                .join(", ")}
              3. Focus on career preferences, work style, and professional traits
              4. Make traits specific and career-relevant
              5. No additional text or formatting outside the JSON object`,
          },
          {
            role: "user",
            content: `Previous answers: ${JSON.stringify(currentAnswers)}
              Generate a unique career assessment question.`,
          },
        ],
        model: CONFIG.MODEL,
        temperature: CONFIG.TEMPERATURES.QUESTIONS,
        max_tokens: CONFIG.MAX_TOKENS.QUESTIONS,
      });

      if (!completion?.choices?.[0]?.message?.content) {
        throw new Error("Invalid AI response structure");
      }

      const aiResponse = safeJSONParse(completion.choices[0].message.content);
      validateQuestionResponse(aiResponse, previousQuestions);

      return NextResponse.json({
        ...aiResponse,
        id: previousQuestions.length + 1,
      });
    } catch (error) {
      console.error("AI Generation Error:", error);

      // Use backup question
      const unusedBackupQuestions = backupQuestions.filter(
        (q) =>
          !previousQuestions.some(
            (prevQ) => prevQ.question.toLowerCase() === q.question.toLowerCase()
          )
      );

      if (unusedBackupQuestions.length > 0) {
        return NextResponse.json({
          ...unusedBackupQuestions[0],
          id: previousQuestions.length + 1,
        });
      }

      // Final fallback question
      return NextResponse.json({
        question: "What type of projects do you enjoy working on?",
        options: [
          {
            text: "Technical and analytical projects",
            traits: ["technical", "analytical"],
          },
          {
            text: "Creative and design-focused work",
            traits: ["creative", "design_oriented"],
          },
          {
            text: "People-focused and communication tasks",
            traits: ["interpersonal", "communicative"],
          },
          {
            text: "Strategic planning and organization",
            traits: ["strategic", "organizational"],
          },
        ],
        reasoning: "Understanding project preferences and work style",
        id: previousQuestions.length + 1,
      });
    }
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { answers, traits } = body;

    if (!Array.isArray(answers) || typeof traits !== "object") {
      return NextResponse.json(
        { error: "Invalid input format" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a career matching AI. Based on the user's answers and traits, generate 5 career recommendations.
            Return ONLY a JSON array in this exact format:
            [
              {
                "title": "Career Title",
                "description": "Brief 1-2 sentence description",
                "matchReasoning": "Why this matches their traits",
                "confidenceScore": 0.XX,
                "requiredSkills": ["skill1", "skill2", "skill3"],
                "growthPotential": "Brief growth projection",
                "workEnvironment": "Typical work environment",
                "educationPath": "Required education/certifications",
                "relatedCareers": ["related1", "related2", "related3"]
              }
            ]
            Include exactly 5 career matches.
            Make recommendations specific and well-reasoned based on their traits.
            No additional text or formatting outside the JSON array.`,
        },
        {
          role: "user",
          content: `User answers: ${JSON.stringify(answers)}
            Trait scores: ${JSON.stringify(traits)}
            Generate 5 personalized career matches.`,
        },
      ],
      model: CONFIG.MODEL,
      temperature: CONFIG.TEMPERATURES.CAREERS,
      max_tokens: CONFIG.MAX_TOKENS.CAREERS,
    });

    if (!completion?.choices?.[0]?.message?.content) {
      throw new Error("Invalid AI response structure");
    }

    const careerMatches = safeJSONParse(completion.choices[0].message.content);

    if (!Array.isArray(careerMatches) || careerMatches.length !== 5) {
      throw new Error("Invalid career matches format");
    }

    return NextResponse.json(careerMatches);
  } catch (error) {
    console.error("Career Matching Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate career matches. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
