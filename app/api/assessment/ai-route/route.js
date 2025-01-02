// app/api/assessment/ai-route/route.js
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama3-8b-8192";

// Helper function to safely parse JSON
const safeJSONParse = (text) => {
  try {
    // Clean up the text by removing markdown formatting
    let cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");

    // Try parsing the cleaned text
    try {
      return JSON.parse(cleanText);
    } catch {
      // If that fails, try to extract JSON object/array
      const match = cleanText.match(/[\[\{][\s\S]*[\}\]]/);
      if (!match) {
        throw new Error("No valid JSON found in response");
      }
      return JSON.parse(match[0]);
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    throw error;
  }
};

// Backup questions if AI generation fails
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

export async function POST(req) {
  try {
    const { currentAnswers = [], previousQuestions = [] } = await req.json();

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
        model: MODEL,
        temperature: 0.3,
        max_tokens: 1000,
      });

      const aiResponse = safeJSONParse(completion.choices[0].message.content);

      // Validate response
      if (
        !aiResponse?.question ||
        !Array.isArray(aiResponse?.options) ||
        aiResponse.options.length !== 4 ||
        !aiResponse.options.every(
          (opt) =>
            Array.isArray(opt.traits) &&
            opt.traits.length === 2 &&
            typeof opt.text === "string"
        )
      ) {
        throw new Error("Invalid AI response format");
      }

      // Check for duplicate questions
      const isDuplicate = previousQuestions.some(
        (prevQ) =>
          prevQ.question.toLowerCase() === aiResponse.question.toLowerCase()
      );

      if (isDuplicate) {
        throw new Error("Duplicate question generated");
      }

      aiResponse.id = previousQuestions.length + 1;
      return NextResponse.json(aiResponse);
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
        const backupQuestion = {
          ...unusedBackupQuestions[0],
          id: previousQuestions.length + 1,
        };
        return NextResponse.json(backupQuestion);
      }

      // If all backup questions used, return a generic one
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
    return NextResponse.json({ error: "Failed to process request" });
  }
}

export async function PUT(req) {
  try {
    const { answers, traits } = await req.json();

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
      model: MODEL,
      temperature: 0.4,
      max_tokens: 2000,
    });

    const careerMatches = safeJSONParse(completion.choices[0].message.content);

    // Validate response
    if (!Array.isArray(careerMatches) || careerMatches.length !== 5) {
      throw new Error("Invalid career matches format");
    }

    return NextResponse.json(careerMatches);
  } catch (error) {
    console.error("Career Matching Error:", error);
    // Return a structured error response
    return NextResponse.json({
      error: "Failed to generate career matches. Please try again.",
    });
  }
}
