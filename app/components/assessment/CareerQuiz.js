"use client";
import { useState, useEffect, useCallback } from "react";
import CareerResult from "./CareerResult";
import QuestionCard from "./QuestionCard";
import LoadingSpinner from "../LoadingSpinner";

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const TOTAL_QUESTIONS = 15;

  const fetchNextQuestion = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/assessment/ai-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentAnswers: answers,
          previousQuestions: previousQuestions,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      data.id = previousQuestions.length;
      setCurrentQuestion(data);
    } catch (error) {
      console.error("Failed to fetch question:", error);
      setError("Failed to load the next question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [answers, previousQuestions]);

  useEffect(() => {
    fetchNextQuestion();
  }, [fetchNextQuestion]);

  const handleAnswer = (traits, optionIndex, answerText) => {
    if (isTransitioning) return;

    // Only update selection state, don't progress to next question
    setSelectedOption(optionIndex);
    setSelectedTraits(traits);
    setSelectedAnswerText(answerText);
    setIsAnswered(true);
  };

  const handleNext = async () => {
    if (!isAnswered || isTransitioning) return;

    // Save the answer when Next is clicked
    const newAnswer = {
      question: currentQuestion.question,
      answer: selectedAnswerText,
      reasoning: currentQuestion.reasoning,
      questionId: currentQuestion.id,
      traits: selectedTraits,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    // Update trait scores
    setTraitScores((prev) => {
      const newScores = { ...prev };
      selectedTraits.forEach((trait) => {
        const weight = 1 + (answers.length / TOTAL_QUESTIONS) * 0.5;
        newScores[trait] = (newScores[trait] || 0) + weight;
      });
      return newScores;
    });

    if (answers.length < TOTAL_QUESTIONS - 1) {
      setIsTransitioning(true);
      setFadeOut(true);

      await new Promise((resolve) => setTimeout(resolve, 300));

      setPreviousQuestions((prev) => [...prev, currentQuestion]);
      setSelectedOption(null);
      setSelectedTraits(null);
      setSelectedAnswerText(null);
      setIsAnswered(false);

      await fetchNextQuestion();

      setFadeOut(false);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsTransitioning(false);
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
    setFadeOut(false);
    setIsTransitioning(false);
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

  if (isLoading && !isTransitioning) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner />
        <p className="text-gray-400">
          {answers.length === 0
            ? "Preparing your comprehensive career assessment..."
            : "Loading your next question..."}
        </p>
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

  if (!currentQuestion) {
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

  const progress = ((answers.length + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400 text-sm font-medium">
          Question {answers.length + 1} of {TOTAL_QUESTIONS}
        </span>
        <div className="w-full max-w-xs mx-4">
          <div className="relative h-2 bg-gray-800/40 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-blue-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div
        className={`transition-opacity duration-300 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {isTransitioning ? (
          <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
            <LoadingSpinner />
            <p className="text-gray-400">Loading next question...</p>
          </div>
        ) : (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
            selectedOption={selectedOption}
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered || isTransitioning}
          className={`px-4 py-2 rounded-lg transition-colors duration-200
            ${
              !isAnswered || isTransitioning
                ? "bg-blue-500/10 text-blue-400/50 cursor-not-allowed"
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            }`}
        >
          {answers.length === TOTAL_QUESTIONS - 1 ? "See Results" : "Next"}
        </button>
      </div>
    </div>
  );
}
