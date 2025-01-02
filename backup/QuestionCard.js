// QuestionCard.js
export default function QuestionCard({
  question,
  onAnswer,
  isAnswered,
  selectedOption,
}) {
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
                }`}
              onClick={() => !isAnswered && onAnswer(option.traits, index)}
              disabled={isAnswered}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
