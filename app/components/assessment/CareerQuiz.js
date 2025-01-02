"use client";
import { useState, useEffect } from "react";
import CareerResult from "./CareerResult";
import QuestionCard from "./QuestionCard";

export default function CareerQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [traitScores, setTraitScores] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading questions...</div>;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (traits, optionIndex) => {
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    setTraitScores((prev) => {
      const newScores = { ...prev };
      traits.forEach((trait) => {
        newScores[trait] = (newScores[trait] || 0) + 1;
      });
      return newScores;
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setTraitScores({});
    setShowResult(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  if (showResult) {
    return <CareerResult traitScores={traitScores} onReset={resetQuiz} />;
  }

  if (!questions.length) {
    return <div className="text-center">No questions available.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400 text-sm font-medium">
          Question {currentQuestion + 1} of {questions.length}
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

      <QuestionCard
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        isAnswered={isAnswered}
        selectedOption={selectedOption}
      />

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`px-4 py-2 rounded-lg transition-colors duration-200
            ${
              !isAnswered
                ? "bg-blue-500/10 text-blue-400/50 cursor-not-allowed"
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            }`}
        >
          {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
        </button>
      </div>
    </div>
  );
}
