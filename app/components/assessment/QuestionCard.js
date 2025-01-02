export default function QuestionCard({
  question,
  onAnswer,
  isAnswered,
  selectedOption,
}) {
  if (!question || !question.options) {
    return (
      <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30">
        <div className="animate-pulse">
          <div className="h-6 w-3/4 bg-gray-700/50 rounded mb-6"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-14 bg-gray-700/50 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30">
      <h2 className="text-xl font-semibold mb-6 text-gray-100">
        {question.question}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          return (
            <button
              key={index}
              className={`w-full p-4 text-left rounded-lg transition-colors duration-200 
                ${
                  isSelected
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "bg-gray-800/40 text-gray-300 hover:bg-gray-800/60 border border-gray-700/30"
                }
                ${
                  isAnswered && !isSelected
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
                group
              `}
              onClick={() =>
                !isAnswered && onAnswer(option.traits, index, option.text)
              }
              disabled={isAnswered}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option.text}</span>
                {isSelected && (
                  <span className="ml-3 text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {!isAnswered && (
                <div className="h-0.5 w-0 group-hover:w-full bg-gray-700/50 transition-all duration-300 mt-2"></div>
              )}
            </button>
          );
        })}
      </div>
      {question.reasoning && (
        <div className="mt-6 pt-4 border-t border-gray-700/30">
          <p className="text-sm text-gray-400 italic">{question.reasoning}</p>
        </div>
      )}
    </div>
  );
}
