"use client";
import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import CareerResult from "./CareerResult";
import QuestionCard from "./QuestionCard";

// Constants
const TOTAL_QUESTIONS = 15;
const TYPING_DELAY = 1000;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Memoized Components
const ChatBubble = memo(({ isAI, children, className = "" }) => (
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
));

ChatBubble.displayName = "ChatBubble";

const TypingIndicator = memo(() => (
  <div className="flex space-x-2 p-3 bg-gray-800/40 rounded-2xl w-16">
    {[0, 150, 300].map((delay) => (
      <div
        key={delay}
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
));

TypingIndicator.displayName = "TypingIndicator";

// Progress Bar Component
const ProgressBar = memo(({ current, total }) => {
  const progress = Math.min(((current + 1) / total) * 100, 100);

  return (
    <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm p-4 border-b border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">
          Question {current + 1} of {total}
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
  );
});

ProgressBar.displayName = "ProgressBar";

// Error State Component
const ErrorState = memo(({ message, onReset }) => (
  <div className="text-center space-y-4">
    <p className="text-red-400">{message}</p>
    <button
      onClick={onReset}
      className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
    >
      Try Again
    </button>
  </div>
));

ErrorState.displayName = "ErrorState";

// Loading State Component
const LoadingState = memo(({ answersLength }) => (
  <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
    <LoadingSpinner />
    <p className="text-gray-400">
      {answersLength === 0
        ? "Preparing your comprehensive career assessment..."
        : "Loading your next question..."}
    </p>
  </div>
));

LoadingState.displayName = "LoadingState";

// Initial state
const INITIAL_STATE = {
  currentQuestion: null,
  previousQuestions: [],
  answers: [],
  traitScores: {},
  showResult: false,
  isAnswered: false,
  selectedOption: null,
  selectedTraits: null,
  selectedAnswerText: null,
  isLoading: true,
  error: null,
  showTyping: false,
  shouldScroll: false,
};

export default function CareerQuiz() {
  const [state, setState] = useState(INITIAL_STATE);
  const chatEndRef = useRef(null);
  const fetchController = useRef(null);
  const fetchInProgress = useRef(false);
  const isMounted = useRef(true);
  const processingAnswer = useRef(false);

  const updateState = useCallback((updates) => {
    if (isMounted.current) {
      setState((prev) => ({ ...prev, ...updates }));
    }
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (fetchController.current) {
        fetchController.current.abort();
      }
      fetchInProgress.current = false;
    };
  }, []);

  // Scroll handling
  const scrollToBottom = useCallback(() => {
    if (state.shouldScroll && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      updateState({ shouldScroll: false });
    }
  }, [state.shouldScroll, updateState]);

  useEffect(() => {
    if (state.currentQuestion || state.showTyping) {
      updateState({ shouldScroll: true });
    }
  }, [state.currentQuestion, state.showTyping, updateState]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // Fetch next question
  const fetchNextQuestion = useCallback(async () => {
    if (fetchInProgress.current || !isMounted.current) {
      return;
    }

    if (fetchController.current) {
      fetchController.current.abort();
    }

    fetchController.current = new AbortController();
    fetchInProgress.current = true;

    try {
      updateState({ isLoading: true, error: null, showTyping: true });

      const response = await fetch("/api/assessment/ai-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentAnswers: state.answers,
          previousQuestions: state.previousQuestions,
        }),
        signal: fetchController.current.signal,
      });

      if (!response.ok) throw new Error("Failed to fetch question");

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      if (!fetchController.current.signal.aborted && isMounted.current) {
        // Simulate typing delay
        await new Promise((resolve) => setTimeout(resolve, TYPING_DELAY));

        updateState({
          showTyping: false,
          currentQuestion: data,
          isLoading: false,
          isAnswered: false,
          selectedOption: null,
          selectedTraits: null,
          selectedAnswerText: null,
        });
      }
    } catch (error) {
      if (error.name !== "AbortError" && isMounted.current) {
        console.error("Failed to fetch question:", error);
        updateState({
          error: "Failed to load the next question. Please try again.",
          showTyping: false,
          isLoading: false,
        });
      }
    } finally {
      fetchInProgress.current = false;
    }
  }, [state.answers, state.previousQuestions, updateState]);

  // Initial fetch
  useEffect(() => {
    if (!state.currentQuestion && !state.showResult) {
      fetchNextQuestion();
    }
  }, []);

  // Handle answer selection
  const handleAnswer = useCallback(
    async (traits, optionIndex, answerText) => {
      if (
        fetchInProgress.current ||
        processingAnswer.current ||
        !isMounted.current ||
        !state.currentQuestion
      ) {
        return;
      }

      processingAnswer.current = true;

      try {
        const currentQuestionCopy = { ...state.currentQuestion };

        const newAnswer = {
          question: currentQuestionCopy.question,
          answer: answerText,
          reasoning: currentQuestionCopy.reasoning,
          questionId: currentQuestionCopy.id,
          traits,
        };

        const newTraitScores = { ...state.traitScores };
        traits.forEach((trait) => {
          const weight = 1 + (state.answers.length / TOTAL_QUESTIONS) * 0.5;
          newTraitScores[trait] = (newTraitScores[trait] || 0) + weight;
        });

        // Update all state at once to ensure sync
        updateState({
          selectedOption: optionIndex,
          selectedTraits: traits,
          selectedAnswerText: answerText,
          isAnswered: true,
          shouldScroll: true,
          answers: [...state.answers, newAnswer],
          traitScores: newTraitScores,
          previousQuestions: [...state.previousQuestions, currentQuestionCopy],
        });

        // Wait for state update
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (state.answers.length < TOTAL_QUESTIONS - 1) {
          await fetchNextQuestion();
        } else {
          updateState({ showResult: true });
        }
      } catch (error) {
        console.error("Error handling answer:", error);
        updateState({
          error: "Failed to process answer. Please try again.",
        });
      } finally {
        processingAnswer.current = false;
      }
    },
    [state, updateState, fetchNextQuestion]
  );

  const resetQuiz = useCallback(() => {
    if (fetchInProgress.current) {
      return;
    }
    setState(INITIAL_STATE);
    fetchNextQuestion();
  }, [fetchNextQuestion]);

  // Render conditions
  if (state.error) {
    return <ErrorState message={state.error} onReset={resetQuiz} />;
  }

  if (state.showResult) {
    return (
      <CareerResult
        answers={state.answers}
        traitScores={state.traitScores}
        onReset={resetQuiz}
      />
    );
  }

  if (state.isLoading && !state.currentQuestion) {
    return <LoadingState answersLength={state.answers.length} />;
  }

  if (!state.currentQuestion && !state.showResult) {
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
      <ProgressBar current={state.answers.length} total={TOTAL_QUESTIONS} />

      <div className="p-4 space-y-6 pb-32">
        <AnimatePresence mode="sync">
          {/* Previous QA Pairs */}
          {state.answers.map((answer, idx) => {
            const previousQuestion = state.previousQuestions[idx];
            if (!previousQuestion) return null;

            return (
              <motion.div
                key={`qa-${answer.questionId}-${idx}`}
                {...fadeInUp}
                transition={{ duration: 0.3 }}
              >
                <ChatBubble isAI={true}>
                  <p className="text-lg mb-2">{previousQuestion.question}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    {previousQuestion.reasoning}
                  </div>
                </ChatBubble>
                <ChatBubble isAI={false}>
                  <p>{answer.answer}</p>
                  {answer.traits && (
                    <div className="mt-2 text-xs text-gray-400">
                      Traits: {answer.traits.join(", ")}
                    </div>
                  )}
                </ChatBubble>
              </motion.div>
            );
          })}

          {/* Current Question */}
          {state.currentQuestion && !state.showResult && (
            <motion.div
              key={`current-${state.currentQuestion.id}`}
              {...fadeInUp}
            >
              <ChatBubble isAI={true}>
                <QuestionCard
                  question={state.currentQuestion}
                  onAnswer={handleAnswer}
                  isAnswered={state.isAnswered}
                  selectedOption={state.selectedOption}
                />
              </ChatBubble>
              {state.selectedAnswerText && (
                <ChatBubble isAI={false}>
                  <p>{state.selectedAnswerText}</p>
                  {state.selectedTraits && (
                    <div className="mt-2 text-xs text-gray-400">
                      Traits: {state.selectedTraits.join(", ")}
                    </div>
                  )}
                </ChatBubble>
              )}
            </motion.div>
          )}

          {/* Typing Indicator */}
          {state.showTyping && (
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
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
