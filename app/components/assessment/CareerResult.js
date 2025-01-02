"use client";
import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function CareerResult({ answers, traitScores, onReset }) {
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCareerMatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/assessment/ai-route", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          traits: traitScores,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch career matches");
      }

      const data = await response.json();
      if (data.error) {
        console.error("Error:", data.error);
        throw new Error(data.error);
      }

      setCareers(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate career matches. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [answers, traitScores]);

  useEffect(() => {
    fetchCareerMatches();
  }, [fetchCareerMatches]);

  if (error) {
    return (
      <div className="text-center space-y-4">
        <p className="text-red-400">{error}</p>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner />
        <p className="text-gray-400">
          Analyzing your responses to find the best career matches...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Your Career Matches
      </h2>
      <div className="space-y-6">
        {careers.map((career, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/30"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-100">
                {career.title}
              </h3>
              <span className="text-sm text-gray-400">
                Match: {Math.round(career.confidenceScore * 100)}%
              </span>
            </div>
            <p className="text-gray-400 mb-4">{career.description}</p>
            <div className="text-sm text-gray-500 mb-6">
              {career.matchReasoning}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onReset}
                className="px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 transition-colors"
              >
                Start Over
              </button>
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
          </div>
        ))}
      </div>
    </div>
  );
}
