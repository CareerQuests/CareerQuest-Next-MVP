export default function QuestionCard({
  question,
  onAnswer,
  isAnswered,
  selectedOption,
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          return (
            <button
              key={index}
              className={`w-full p-4 text-left rounded-lg transition duration-200 
                ${
                  isSelected
                    ? "bg-blue-900 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }
                ${
                  isAnswered && !isSelected
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
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
