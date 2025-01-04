"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import CareerResult from "./CareerResult";
import QuestionCard from "./QuestionCard";

const ChatBubble = ({ isAI, children, className = "" }) => (
  <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}>
    <div
      className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 ${
        isAI
          ? "bg-gray-800/40 text-gray-100 rounded-tl-sm"
          : "bg-blue-500/20 text-blue-100 rounded-tr-sm"
      } ${className}`}
    >
      {children}
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex space-x-2 p-3 bg-gray-800/40 rounded-2xl w-16">
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    />
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    />
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    />
  </div>
);

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [traitScores, setTraitScores] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTraits, setSelectedTraits] = useState(null);
  const [selectedAnswerText, setSelectedAnswerText] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTyping, setShowTyping] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  const chatEndRef = useRef(null);
  const TOTAL_QUESTIONS = 15;
  const fetchController = useRef(null);

  // Improved scrolling logic
  const scrollToBottom = useCallback(() => {
    if (shouldScroll && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  useEffect(() => {
    if (currentQuestion || showTyping) {
      setShouldScroll(true);
    }
  }, [currentQuestion, showTyping]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // Optimized fetchNextQuestion to prevent double calls
  const fetchNextQuestion = useCallback(async () => {
    // Cancel any existing fetch
    if (fetchController.current) {
      fetchController.current.abort();
    }
    fetchController.current = new AbortController();

    setIsLoading(true);
    setError(null);
    setShowTyping(true);

    try {
      const response = await fetch("/api/assessment/ai-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentAnswers: answers,
          previousQuestions: previousQuestions,
        }),
        signal: fetchController.current.signal,
      });

      if (!response.ok) throw new Error("Failed to fetch question");

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Simulate natural typing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!fetchController.current.signal.aborted) {
        setShowTyping(false);
        data.id = previousQuestions.length;
        setCurrentQuestion(data);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      console.error("Failed to fetch question:", error);
      setError("Failed to load the next question. Please try again.");
      setShowTyping(false);
    } finally {
      if (!fetchController.current.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [answers, previousQuestions]);

  // Initial fetch with cleanup
  useEffect(() => {
    fetchNextQuestion();
    return () => {
      if (fetchController.current) {
        fetchController.current.abort();
      }
    };
  }, []);

  const handleAnswer = async (traits, optionIndex, answerText) => {
    setSelectedOption(optionIndex);
    setSelectedTraits(traits);
    setSelectedAnswerText(answerText);
    setIsAnswered(true);
    setShouldScroll(true);

    const newAnswer = {
      question: currentQuestion.question,
      answer: answerText,
      reasoning: currentQuestion.reasoning,
      questionId: currentQuestion.id,
      traits: traits,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    // Update trait scores
    setTraitScores((prev) => {
      const newScores = { ...prev };
      traits.forEach((trait) => {
        const weight = 1 + (answers.length / TOTAL_QUESTIONS) * 0.5;
        newScores[trait] = (newScores[trait] || 0) + weight;
      });
      return newScores;
    });

    if (answers.length < TOTAL_QUESTIONS - 1) {
      setPreviousQuestions((prev) => [...prev, currentQuestion]);
      setSelectedOption(null);
      setSelectedTraits(null);
      setSelectedAnswerText(null);
      setIsAnswered(false);
      await fetchNextQuestion();
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = useCallback(() => {
    setPreviousQuestions([]);
    setAnswers([]);
    setTraitScores({});
    setShowResult(false);
    setIsAnswered(false);
    setSelectedOption(null);
    setSelectedTraits(null);
    setSelectedAnswerText(null);
    setError(null);
    fetchNextQuestion();
  }, [fetchNextQuestion]);

  if (error) {
    return (
      <div className="text-center space-y-4">
        <p className="text-red-400">{error}</p>
        <button
          onClick={resetQuiz}
          className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <CareerResult
        answers={answers}
        traitScores={traitScores}
        onReset={resetQuiz}
      />
    );
  }

  const progress = ((answers.length + 1) / TOTAL_QUESTIONS) * 100;

  if (isLoading && !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
        <LoadingSpinner />
        <p className="text-gray-400">
          {answers.length === 0
            ? "Preparing your comprehensive career assessment..."
            : "Loading your next question..."}
        </p>
      </div>
    );
  }

  if (!currentQuestion && !showResult) {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-400">No questions available.</p>
        <button
          onClick={resetQuiz}
          className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">
            Question {answers.length + 1} of {TOTAL_QUESTIONS}
          </span>
          <span className="text-gray-400 text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500/50 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Chat Container */}
      <div className="p-4 space-y-6 pb-32">
        <AnimatePresence mode="sync">
          {/* Previous QA Pairs */}
          {answers.map((answer, idx) => {
            const uniqueKey = `qa-${answer.questionId}-${idx}-${Date.now()}`;
            return (
              <div key={uniqueKey}>
                <motion.div
                  key={`question-${uniqueKey}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatBubble isAI={true}>
                    <p className="text-lg mb-2">
                      {previousQuestions[idx].question}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">
                      {previousQuestions[idx].reasoning}
                    </div>
                  </ChatBubble>
                </motion.div>
                <motion.div
                  key={`answer-${uniqueKey}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <ChatBubble isAI={false}>
                    <p>{answer.answer}</p>
                    {answer.traits && (
                      <div className="mt-2 text-xs text-gray-400">
                        Traits: {answer.traits.join(", ")}
                      </div>
                    )}
                  </ChatBubble>
                </motion.div>
              </div>
            );
          })}

          {/* Current Question */}
          {currentQuestion && !showResult && (
            <div key="current-question">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatBubble isAI={true}>
                  <QuestionCard
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    isAnswered={isAnswered}
                    selectedOption={selectedOption}
                  />
                </ChatBubble>
                {selectedAnswerText && (
                  <ChatBubble isAI={false}>
                    <p>{selectedAnswerText}</p>
                    {selectedTraits && (
                      <div className="mt-2 text-xs text-gray-400">
                        Traits: {selectedTraits.join(", ")}
                      </div>
                    )}
                  </ChatBubble>
                )}
              </motion.div>
            </div>
          )}

          {/* Typing Indicator */}
          {showTyping && (
            <motion.div
              key="typing-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
