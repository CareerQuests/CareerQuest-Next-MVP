import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Configuration
const CONFIG = {
  MODEL: "llama3-8b-8192",
  TEMPERATURES: {
    QUESTIONS: 0.2,
    CAREERS: 0.3,
    ANALYSIS: 0.1,
  },
  MAX_TOKENS: {
    QUESTIONS: 1500,
    CAREERS: 3000,
    ANALYSIS: 1000,
  },
  PERSONALITY_DIMENSIONS: {
    ANALYTICAL: [
      "logical",
      "systematic",
      "data-driven",
      "analytical",
      "methodical",
    ],
    CREATIVE: [
      "innovative",
      "artistic",
      "imaginative",
      "original",
      "experimental",
    ],
    SOCIAL: [
      "collaborative",
      "empathetic",
      "communicative",
      "supportive",
      "interpersonal",
    ],
    PRACTICAL: [
      "hands-on",
      "practical",
      "technical",
      "mechanical",
      "operational",
    ],
    LEADERSHIP: [
      "decisive",
      "strategic",
      "influential",
      "managerial",
      "organizational",
    ],
  },
};

// Backup questions for fallback
const backupQuestions = [
  {
    question: "What type of problem-solving approach do you prefer?",
    options: [
      {
        text: "Analyzing data and finding patterns",
        traits: ["analytical", "data-driven"],
        dimensions: ["ANALYTICAL"],
      },
      {
        text: "Coming up with innovative solutions",
        traits: ["creative", "innovative"],
        dimensions: ["CREATIVE"],
      },
      {
        text: "Collaborating with others to find solutions",
        traits: ["collaborative", "communicative"],
        dimensions: ["SOCIAL"],
      },
      {
        text: "Taking a hands-on, practical approach",
        traits: ["practical", "technical"],
        dimensions: ["PRACTICAL"],
      },
    ],
    reasoning:
      "Identifies primary problem-solving style and work approach preferences",
  },
  {
    question:
      "In a team project, what role do you naturally gravitate towards?",
    options: [
      {
        text: "Planning and organizing the workflow",
        traits: ["organizational", "systematic"],
        dimensions: ["ANALYTICAL", "LEADERSHIP"],
      },
      {
        text: "Generating new ideas and possibilities",
        traits: ["innovative", "imaginative"],
        dimensions: ["CREATIVE"],
      },
      {
        text: "Supporting and motivating team members",
        traits: ["supportive", "empathetic"],
        dimensions: ["SOCIAL"],
      },
      {
        text: "Implementing and executing plans",
        traits: ["practical", "operational"],
        dimensions: ["PRACTICAL"],
      },
    ],
    reasoning: "Reveals natural leadership style and team role preferences",
  },
];

// Helper function to safely parse JSON with fallback extraction
const safeJSONParse = (text) => {
  if (typeof text !== "string") return null;

  try {
    // First attempt: direct JSON parse
    try {
      return JSON.parse(text);
    } catch (e) {
      // Second attempt: extract JSON from text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("No valid JSON found in response");
    }
  } catch (error) {
    console.error("JSON Parsing Error:", error);
    // Fallback: extract structured data from text
    return {
      dominant_dimensions: extractArray(text, "Dominant Dimensions"),
      trait_patterns: {
        primary_traits: extractArray(text, "Primary Traits"),
        secondary_traits: extractArray(text, "Secondary Traits"),
      },
      work_style_indicators: {
        environment_preference: extractValue(text, "Environment Preference"),
        collaboration_style: extractValue(text, "Collaboration Style"),
        problem_solving_approach: extractValue(
          text,
          "Problem Solving Approach"
        ),
      },
      career_direction_indicators: {
        leadership_potential: extractNumber(text, "Leadership Potential"),
        technical_orientation: extractNumber(text, "Technical Orientation"),
        creative_orientation: extractNumber(text, "Creative Orientation"),
        service_orientation: extractNumber(text, "Service Orientation"),
      },
    };
  }
};

// Helper functions for text extraction
const extractArray = (text, label) => {
  const match = text.match(new RegExp(`${label}:[^\\[]*\\[(.*?)\\]`));
  if (match) {
    return match[1]
      .split(",")
      .map((item) => item.trim().replace(/["\s]/g, ""))
      .filter(Boolean);
  }
  return [];
};

const extractValue = (text, label) => {
  const match = text.match(new RegExp(`${label}:\\s*([^\\n]*)`));
  return match ? match[1].trim() : "";
};

const extractNumber = (text, label) => {
  const match = text.match(new RegExp(`${label}:\\s*(\\d+\\.?\\d*)`));
  return match ? parseFloat(match[1]) : 0;
};

// Question validation
const validateQuestion = (question) => {
  try {
    return !!(
      question?.question &&
      typeof question.question === "string" &&
      Array.isArray(question.options) &&
      question.options.length === 4 &&
      question.options.every(
        (opt) =>
          opt?.text &&
          Array.isArray(opt.traits) &&
          opt.traits.length >= 1 &&
          Array.isArray(opt.dimensions) &&
          opt.dimensions.some((dim) => CONFIG.PERSONALITY_DIMENSIONS[dim])
      ) &&
      question.reasoning &&
      typeof question.reasoning === "string"
    );
  } catch (error) {
    console.error("Question validation error:", error);
    return false;
  }
};

// Get unique backup question
const getUniqueBackupQuestion = (previousQuestions) => {
  const previousSet = new Set(
    previousQuestions.map((q) => q.question.toLowerCase())
  );
  const dimensionCounts = Object.keys(CONFIG.PERSONALITY_DIMENSIONS).reduce(
    (acc, dim) => {
      acc[dim] = 0;
      return acc;
    },
    {}
  );

  // Count previous dimension coverage
  previousQuestions.forEach((q) => {
    q.options.forEach((opt) => {
      opt.dimensions?.forEach((dim) => {
        dimensionCounts[dim] = (dimensionCounts[dim] || 0) + 1;
      });
    });
  });

  // Find least covered dimension
  const leastCoveredDimension = Object.entries(dimensionCounts).sort(
    ([, a], [, b]) => a - b
  )[0]?.[0];

  return (
    backupQuestions.find(
      (q) =>
        !previousSet.has(q.question.toLowerCase()) &&
        q.options.some((opt) => opt.dimensions.includes(leastCoveredDimension))
    ) || backupQuestions[0]
  );
};

// Generate next question
const generateQuestion = async (currentAnswers, previousQuestions) => {
  const prompt = `Generate a career assessment question following these EXACT requirements:

1. Format:
{
  "question": "A focused career-related question that reveals work preferences and aptitudes",
  "options": [
    {
      "text": "Clear, concrete option",
      "traits": ["specific_trait1", "specific_trait2"],
      "dimensions": ["DIMENSION1", "DIMENSION2"]
    },
    // ... 3 more options
  ],
  "reasoning": "Detailed explanation of how this question helps assess career fit"
}

2. Requirements:
- Question must be specific and career-focused
- Each option must map to different personality dimensions
- Traits must be specific and career-relevant
- Options must be mutually exclusive
- Avoid social desirability bias
- Use concrete scenarios or preferences
- Dimensions must be from: ${Object.keys(CONFIG.PERSONALITY_DIMENSIONS).join(
    ", "
  )}

3. Previous trait coverage: ${JSON.stringify(
    previousQuestions
      .flatMap((q) => q.options.flatMap((o) => o.traits))
      .reduce((acc, trait) => {
        acc[trait] = (acc[trait] || 0) + 1;
        return acc;
      }, {})
  )}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a career assessment expert focused on generating precise, unbiased questions that reveal career aptitudes and preferences.",
        },
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `Generate a unique question avoiding these themes: ${previousQuestions
            .map((q) => q.question)
            .join(" | ")}`,
        },
      ],
      model: CONFIG.MODEL,
      temperature: CONFIG.TEMPERATURES.QUESTIONS,
      max_tokens: CONFIG.MAX_TOKENS.QUESTIONS,
    });

    const response = safeJSONParse(completion.choices[0]?.message?.content);
    if (response && validateQuestion(response)) return response;

    throw new Error("Invalid question format received from AI");
  } catch (error) {
    console.error("Question generation error:", error);
    return getUniqueBackupQuestion(previousQuestions);
  }
};

// Analyze trait patterns
const analyzeTraitPatterns = async (answers) => {
  const prompt = `Analyze these career assessment answers and provide a JSON response with both analysis and career recommendations:

${JSON.stringify(answers)}

Return ONLY a JSON object with this exact structure (no additional text or markdown), and EXACTLY 5 career matches (no more, no less):
{
  "dominant_dimensions": ["DIMENSION1", "DIMENSION2"],
  "trait_patterns": {
    "primary_traits": ["trait1", "trait2"],
    "secondary_traits": ["trait3", "trait4"]
  },
  "work_style_indicators": {
    "environment_preference": "string",
    "collaboration_style": "string",
    "problem_solving_approach": "string"
  },
  "career_direction_indicators": {
    "leadership_potential": number,
    "technical_orientation": number,
    "creative_orientation": number,
    "service_orientation": number
  },
  "career_matches": [
    {
      "title": "Career Title",
      "description": "Detailed description of the role",
      "confidenceScore": number between 0 and 1,
      "matchReasoning": "Explanation of why this career matches the assessment"
    }
  ]
}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a career analysis expert. Provide responses in valid JSON format only. Always return exactly 5 career matches.",
        },
        { role: "user", content: prompt },
      ],
      model: CONFIG.MODEL,
      temperature: CONFIG.TEMPERATURES.ANALYSIS,
      max_tokens: CONFIG.MAX_TOKENS.ANALYSIS,
    });

    const response = completion.choices[0]?.message?.content;
    const parsedResponse = safeJSONParse(response);

    if (!parsedResponse) {
      throw new Error("Failed to parse analysis response");
    }

    // Validate that exactly 5 career matches are returned
    if (
      !parsedResponse.career_matches ||
      parsedResponse.career_matches.length !== 5
    ) {
      throw new Error("Response must contain exactly 5 career matches");
    }

    return parsedResponse;
  } catch (error) {
    console.error("Trait analysis error:", error);
    throw error;
  }
};

// POST Route: Get next question
export async function POST(req) {
  try {
    const { currentAnswers = [], previousQuestions = [] } = await req.json();

    const question =
      previousQuestions.length === 0
        ? getUniqueBackupQuestion([])
        : await generateQuestion(currentAnswers, previousQuestions);

    return NextResponse.json({
      ...question,
      id: previousQuestions.length + 1,
    });
  } catch (error) {
    console.error("POST Route Error:", error);
    return NextResponse.json(
      { error: "Failed to generate question" },
      { status: 500 }
    );
  }
}

// PUT Route: Analyze answers and generate recommendations
export async function PUT(req) {
  try {
    const { answers, traits } = await req.json();

    // Analyze trait patterns with enhanced error handling
    let analysis;
    try {
      analysis = await analyzeTraitPatterns(answers);
    } catch (error) {
      console.error("Analysis error:", error);
      return NextResponse.json(
        {
          error: "Analysis failed",
          details: error.message,
          fallback: {
            dominant_dimensions: ["ANALYTICAL", "CREATIVE"],
            trait_patterns: {
              primary_traits: ["problem-solving", "innovation"],
              secondary_traits: ["communication", "technical"],
            },
            work_style_indicators: {
              environment_preference: "Flexible",
              collaboration_style: "Balanced",
              problem_solving_approach: "Analytical and creative",
            },
            career_direction_indicators: {
              leadership_potential: 0.5,
              technical_orientation: 0.6,
              creative_orientation: 0.7,
              service_orientation: 0.4,
            },
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("PUT Route Error:", error);
    return NextResponse.json(
      { error: "Failed to process career assessment" },
      { status: 500 }
    );
  }
}
