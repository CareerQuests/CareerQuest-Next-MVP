"use client";
import { useState, useEffect, useCallback } from "react";

export default function CareerResult({ traitScores, onReset }) {
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCareerMatches = useCallback(async () => {
    try {
      const response = await fetch("/api/careers/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ traits: traitScores }),
      });
      const data = await response.json();
      setCareers(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [traitScores]);

  useEffect(() => {
    fetchCareerMatches();
  }, [fetchCareerMatches]);

  if (isLoading) return <div>Loading your career matches...</div>;

  return (
    <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Your Career Matches
      </h2>
      <div className="space-y-6">
        {careers.map((career) => (
          <div
            key={career._id}
            className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/30"
          >
            <h3 className="text-xl font-semibold text-gray-100 mb-3">
              {career.title}
            </h3>
            <p className="text-gray-400 mb-6">{career.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onReset}
                className="px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 transition-colors"
              >
                Start Over
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                Find Courses/Programs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
