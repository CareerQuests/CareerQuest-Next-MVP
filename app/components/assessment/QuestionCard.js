import React from "react";
import { motion } from "framer-motion";

export default function QuestionCard({
  question,
  onAnswer,
  isAnswered,
  selectedOption,
}) {
  // Loading state with enhanced skeleton UI
  if (!question || !question.options) {
    return (
      <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30">
        <div className="animate-pulse space-y-6">
          <div className="h-7 w-4/5 bg-gray-700/50 rounded"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-16 bg-gray-700/50 rounded"></div>
                <div className="h-2 w-1/3 bg-gray-700/30 rounded"></div>
              </div>
            ))}
          </div>
          <div className="h-4 w-2/3 bg-gray-700/30 rounded"></div>
        </div>
      </div>
    );
  }

  // Animation variants for options
  const optionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30 relative">
      <h2 className="text-xl font-semibold mb-6 text-gray-100 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <motion.button
              key={index}
              variants={optionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover={!isAnswered && "hover"}
              whileTap={!isAnswered && "tap"}
              className={`w-full p-5 text-left rounded-lg transition-all duration-300 
                ${
                  isSelected
                    ? "bg-blue-500/20 text-blue-300 border-2 border-blue-500/30 shadow-lg shadow-blue-500/10"
                    : "bg-gray-800/40 text-gray-300 hover:bg-gray-800/60 border border-gray-700/30"
                }
                ${
                  isAnswered && !isSelected
                    ? "opacity-50 cursor-not-allowed filter grayscale"
                    : "transform hover:translate-y-[-2px]"
                }
                group relative overflow-hidden
              `}
              onClick={() =>
                !isAnswered && onAnswer(option.traits, index, option.text)
              }
              disabled={isAnswered}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex-1 text-lg leading-relaxed">
                    {option.text}
                  </span>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-blue-400 flex-shrink-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.span>
                  )}
                </div>

                {/* Trait tags */}
                {(isSelected || !isAnswered) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {option.traits.map((trait, traitIndex) => (
                      <span
                        key={traitIndex}
                        className={`text-xs px-2 py-1 rounded-full 
                          ${
                            isSelected
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-gray-700/30 text-gray-400"
                          }
                        `}
                      >
                        {trait.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Animated hover effect */}
              {!isAnswered && (
                <>
                  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-gray-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine"></div>
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Question reasoning with enhanced styling */}
      {question.reasoning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-4 border-t border-gray-700/30"
        >
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-400 leading-relaxed italic">
              {question.reasoning}
            </p>
          </div>
        </motion.div>
      )}

      {/* Progress indicators */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <span className="text-xs text-gray-500">
          Question {question.id + 1}
        </span>
        <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500/50 transition-all duration-300"
            style={{ width: `${((question.id + 1) / 15) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
