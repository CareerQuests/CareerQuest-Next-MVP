"use client";
import React, { useState, useEffect } from "react";
import {
  Brain,
  ChevronRight,
  RefreshCcw,
  Award,
  Loader2,
  Sparkles,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LoadingMessage = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Analyzing your response...",
    "Preparing your next challenge...",
    "Crafting the perfect question...",
    "Almost there...",
    "Calculating career insights...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 text-center">
      <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span className="font-medium">Journey in Progress</span>
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
      <p className="text-gray-400 transition-all duration-300 animate-pulse">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

const AssessmentCard = ({
  question,
  options,
  onSelect,
  isActive,
  isLoadingNext,
}) => {
  return (
    <div
      className={`mb-4 p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm transition-all duration-300 border ${
        isActive ? "border-emerald-500/50" : "border-gray-800"
      }`}
    >
      {isLoadingNext ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-6 h-6 text-emerald-300 animate-pulse" />
              </div>
            </div>
          </div>
          <LoadingMessage />
        </div>
      ) : (
        <>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-gray-200">{question}</p>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-4">
            {options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(option)}
                className="p-4 text-left rounded-xl bg-gray-800/40 border border-gray-700/30 
                         hover:border-emerald-500/40 text-gray-300 hover:text-white 
                         transition-all flex items-center justify-between group"
                disabled={!isActive}
              >
                <span>{option.text}</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CareerMatch = ({ career }) => (
  <div className="mb-4 p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Award className="w-6 h-6 text-emerald-400" />
        <h3 className="text-xl font-semibold text-gray-100">{career.title}</h3>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm text-emerald-400">
          {Math.round(career.confidenceScore * 100)}% Match
        </span>
      </div>
    </div>
    <p className="text-gray-400 mb-4">{career.description}</p>
    <div className="bg-gray-800/40 rounded-lg p-4 mb-4">
      <h4 className="text-sm font-medium text-gray-300 mb-2">
        Why this matches you:
      </h4>
      <p className="text-sm text-gray-400">{career.matchReasoning}</p>
    </div>
  </div>
);

const AssessmentProgress = ({ currentStep, totalSteps, error, onRetry }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-10 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">Progress</span>
        <span className="text-sm text-emerald-400">
          {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {error && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Retry Question
        </button>
      )}
    </div>
  );
};

const AssessmentChat = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [careers, setCareers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingCareers, setIsLoadingCareers] = useState(false);

  const TOTAL_STEPS = 10;

  useEffect(() => {
    fetchNextQuestion();
  }, []);

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

      if (!response.ok) throw new Error("Failed to fetch question");
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
    setIsLoadingNext(true);

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
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: option.text,
      },
    ]);

    if (newAnswers.length >= TOTAL_STEPS) {
      setIsComplete(true);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Great! I've analyzed your responses and prepared your career matches. Here they are:",
        },
      ]);
      await fetchCareerMatches(newAnswers);
    } else {
      await fetchNextQuestion();
    }

    setIsLoadingNext(false);
  };

  const fetchCareerMatches = async (finalAnswers) => {
    setIsLoadingCareers(true);
    try {
      const response = await fetch("/api/assessment/ai-chat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: finalAnswers,
          traits: finalAnswers.flatMap((a) => a.traits),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch career matches");
      const data = await response.json();

      if (data.error) throw new Error(data.error);
      const careerMatches = data.analysis.career_matches || [];
      setCareers(careerMatches);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate career matches. Please try again.");
    } finally {
      setIsLoadingCareers(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(null);
    setMessages([]);
    setAnswers([]);
    setCareers([]);
    setIsComplete(false);
    setError(null);
    setIsLoadingNext(false);
    fetchNextQuestion();
  };

  if (isLoading && messages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">
            Career <span className="text-emerald-400">Compass</span>
          </h1>
          <p className="text-gray-400">
            Discover your ideal career path through personalized assessment
          </p>
        </div>

        <AssessmentProgress
          currentStep={answers.length}
          totalSteps={TOTAL_STEPS}
          error={error}
          onRetry={fetchNextQuestion}
        />

        <div className="mt-8">
          {!isComplete ? (
            currentQuestion && (
              <AssessmentCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                onSelect={handleOptionSelect}
                isActive={!isLoadingNext}
                isLoadingNext={isLoadingNext}
              />
            )
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-100">
                  Your Career Matches
                </h2>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Start Over
                </button>
              </div>
              {isLoadingCareers ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                </div>
              ) : (
                careers.map((career, idx) => (
                  <div key={idx} className="space-y-4">
                    <CareerMatch career={career} />
                    <button
                      className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/search?q=${encodeURIComponent(
                            `${career.title} courses and programs`
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      Find Courses/Programs
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssessmentChat;
