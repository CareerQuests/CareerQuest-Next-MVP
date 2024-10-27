"use client";

import { careerPaths } from "./careers";

export default function CareerResult({ traitScores, onReset }) {
  const getTopCareers = () => {
    return careerPaths
      .map((career) => {
        const score = career.traits.reduce(
          (sum, trait) => sum + (traitScores[trait] || 0),
          0
        );
        return { ...career, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  };

  const topCareers = getTopCareers();

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Career Matches
      </h2>
      <p className="text-gray-600 mb-4 text-center">
        Based on your responses, here are the career paths that best match your
        traits:
      </p>
      <div className="space-y-4">
        {topCareers.map((career, index) => (
          <div key={career.title} className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">{career.title}</h3>
            <p className="text-gray-500">{career.description}</p>
            <button
              onClick={onReset}
              className="mt-4 bg-gray-400 text-white py-2 px-4 rounded-lg"
            >
              Start Over
            </button>
            <button className="mt-4 ml-4 bg-blue-900 text-white py-2 px-4 rounded-lg">
              Find Courses/Programs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
