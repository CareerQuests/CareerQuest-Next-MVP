"use client";
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import CareerResult from "./CareerResult";
import { careerQuestions } from "./questions";

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [traitScores, setTraitScores] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const progress = ((currentQuestion + 1) / careerQuestions.length) * 100;

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
    if (currentQuestion < careerQuestions.length - 1) {
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">
          Question {currentQuestion + 1} of {careerQuestions.length}
        </span>
        <div className="w-full max-w-xs mx-auto">
          <div className="relative h-2 bg-gray-200 rounded">
            <div
              className="absolute h-full bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <QuestionCard
        question={careerQuestions[currentQuestion]}
        onAnswer={handleAnswer}
        isAnswered={isAnswered}
        selectedOption={selectedOption}
      />

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 
            ${
              !isAnswered
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
        >
          {currentQuestion === careerQuestions.length - 1
            ? "See Results"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
