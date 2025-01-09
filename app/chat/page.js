"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  SendHorizontal,
  Bot,
  User,
  Loader2,
  Brain,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

// Simple Alert component
const SimpleAlert = ({ children, variant = "error" }) => (
  <div
    className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
      variant === "error"
        ? "bg-red-500/20 border border-red-500/30 text-red-200"
        : "bg-yellow-500/20 border border-yellow-500/30 text-yellow-200"
    }`}
  >
    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
    <p>{children}</p>
  </div>
);

// Message component with enhanced error handling
const Message = ({ type, content, options, onOptionSelect, error }) => {
  const isBot = type === "bot";

  if (error) {
    return <SimpleAlert>{error}</SimpleAlert>;
  }

  return (
    <div className={`flex gap-4 ${isBot ? "" : "flex-row-reverse"} mb-6`}>
      <div className={`flex items-start gap-2 max-w-[80%]`}>
        <div
          className={`flex justify-center items-center w-8 h-8 rounded-lg ${
            isBot ? "bg-emerald-500/20" : "bg-blue-500/20"
          }`}
        >
          {isBot ? (
            <Brain className="w-5 h-5 text-emerald-400" />
          ) : (
            <User className="w-5 h-5 text-blue-400" />
          )}
        </div>
        <div
          className={`flex flex-col gap-3 ${
            isBot ? "items-start" : "items-end"
          }`}
        >
          <div
            className={`p-4 rounded-2xl backdrop-blur-sm ${
              isBot
                ? "bg-gray-800/30 border border-emerald-500/20"
                : "bg-gray-800/30 border border-blue-500/20"
            }`}
          >
            <p className="text-gray-200">{content}</p>
            {content?.reasoning && (
              <p className="mt-2 text-sm text-gray-400">{content.reasoning}</p>
            )}
          </div>
          {options && (
            <div className="grid grid-cols-1 gap-2 w-full">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onOptionSelect(option)}
                  className="p-3 text-left rounded-xl bg-gray-800/30 border border-gray-700/30 
                           hover:border-emerald-500/40 text-gray-300 hover:text-white transition-all
                           backdrop-blur-sm"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Progress indicator with retry functionality
const ProgressIndicator = ({ currentStep, onRetry, error }) => (
  <div className="flex flex-col items-center gap-4 mb-6">
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className={`w-2 h-2 rounded-full ${
            error
              ? "bg-red-400"
              : step <= currentStep
              ? "bg-emerald-400"
              : "bg-gray-600"
          } transition-colors`}
        />
      ))}
    </div>
    {error && (
      <button
        onClick={onRetry}
        className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        Retry Question
      </button>
    )}
  </div>
);

export default function AssessmentChat() {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchNextQuestion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/assessment/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentAnswers: answers,
          previousQuestions: messages.filter(
            (m) => m.type === "bot" && m.question
          ),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setCurrentQuestion(data);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: data.question,
          options: data.options,
          question: data,
        },
      ]);
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Failed to load question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = async (option) => {
    setError(null);
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: option.text,
      },
    ]);

    const newAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        answer: option.text,
        traits: option.traits,
        dimensions: option.dimensions,
      },
    ];
    setAnswers(newAnswers);

    if (newAnswers.length >= 5) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/assessment/ai-chat", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: newAnswers,
            traits: newAnswers.flatMap((a) => a.traits),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        if (!data.analysis) {
          throw new Error("No analysis data received");
        }

        const analysisMessage = formatAnalysisMessage(data.analysis);

        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: analysisMessage,
          },
        ]);

        setIsComplete(true);
      } catch (error) {
        console.error("Error generating results:", error);
        setError("Failed to generate career analysis. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      fetchNextQuestion();
    }
  };

  const formatAnalysisMessage = (analysis) => {
    return `Based on our conversation, I've analyzed your responses and prepared a detailed assessment of your career preferences:

🎯 Key Dimensions
${analysis.dominant_dimensions?.join(", ") || "Analytical & Creative thinking"}

💫 Primary Strengths
${
  analysis.trait_patterns?.primary_traits?.join(", ") ||
  "Problem-solving, Innovation"
}

🔍 Work Style
• ${
      analysis.work_style_indicators?.environment_preference ||
      "Flexible work environment"
    }
• ${
      analysis.work_style_indicators?.collaboration_style ||
      "Balanced collaboration approach"
    }
• ${
      analysis.work_style_indicators?.problem_solving_approach ||
      "Analytical and creative problem-solving"
    }

I've prepared detailed career recommendations that align with your personality and preferences. Click below to explore your personalized career paths!`;
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0C1222,#000000)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black_70%,transparent_100%)]" />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[128px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[128px]" />
      </div>

      <main className="container mx-auto max-w-4xl px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            AI Career <span className="text-emerald-400">Assessment</span>
          </h1>
          <p className="text-gray-400">
            Chat with our AI to discover your perfect career path
          </p>
        </div>

        <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 overflow-hidden">
          <ProgressIndicator
            currentStep={answers.length}
            onRetry={fetchNextQuestion}
            error={error}
          />

          <div className="h-[600px] overflow-y-auto p-6">
            <Message
              type="bot"
              content="Hi! I'm your AI career advisor. I'll ask you a series of questions to understand your preferences, personality traits, and work style. Together, we'll discover the career paths that best match your unique profile. Ready to begin?"
            />

            {messages.map((message, index) => (
              <Message
                key={index}
                type={message.type}
                content={message.content}
                options={message.options}
                onOptionSelect={handleOptionSelect}
                error={message.error}
              />
            ))}

            {isLoading && (
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
              </div>
            )}

            {error && <SimpleAlert>{error}</SimpleAlert>}

            <div ref={chatEndRef} />
          </div>

          {isComplete && (
            <div className="p-6 border-t border-gray-700/30 bg-gray-900/50">
              <Link href="/assessment/results">
                <button
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 
                               text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 
                               transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  View Your Career Matches
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
