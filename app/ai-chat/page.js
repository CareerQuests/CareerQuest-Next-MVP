"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";

export default function CareerChat() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm your AI career advisor. I can help you discover career paths through our assessment process or answer specific career-related questions. Would you like to start with the assessment or do you have specific questions?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const behavior = isLoading ? "auto" : "smooth";
      messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAssessmentQuestion = async () => {
    try {
      const response = await fetch("/api/assessment/ai-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentAnswers, previousQuestions }),
      });

      if (!response.ok) throw new Error("Failed to fetch question");

      const question = await response.json();
      const formattedQuestion = `
${question.question}

Options:
${question.options.map((opt, idx) => `${idx + 1}. ${opt.text}`).join("\n")}

Please select an option by entering its number (1-4).`;

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: formattedQuestion,
          isQuestion: true,
          questionData: question,
        },
      ]);
      setPreviousQuestions((prev) => [...prev, question]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "I apologize, but I encountered an error generating the question. Would you like to try again?",
        },
      ]);
    }
  };

  const handleCareerMatching = async () => {
    try {
      const response = await fetch("/api/assessment/ai-route", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: currentAnswers,
          traits: currentAnswers.flatMap(
            (answer) => answer.selectedOption?.traits || []
          ),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch career matches");

      const matches = await response.json();
      const formattedMatches = `Based on your responses, here are your top career matches:

${matches
  .map(
    (match, idx) => `
${idx + 1}. ${match.title}
📝 Description: ${match.description}
🎯 Match Reasoning: ${match.matchReasoning}
📚 Required Skills: ${match.requiredSkills.join(", ")}
📈 Growth Potential: ${match.growthPotential}
🏢 Work Environment: ${match.workEnvironment}
🎓 Education Path: ${match.educationPath}
⚖️ Work/Life Balance: ${match.workLifeBalance}

`
  )
  .join("\n")}

Would you like to explore any of these careers in more detail?`;

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: formattedMatches,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "I apologize, but I encountered an error generating career matches. Would you like to try again?",
        },
      ]);
    }
  };

  const handleUserInput = async (userInput) => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.isQuestion) {
      const selectedOption = parseInt(userInput);
      if (selectedOption >= 1 && selectedOption <= 4) {
        const answer = {
          question: lastMessage.questionData.question,
          selectedOption: lastMessage.questionData.options[selectedOption - 1],
        };
        setCurrentAnswers((prev) => [...prev, answer]);

        if (currentAnswers.length >= 4) {
          await handleCareerMatching();
        } else {
          await handleAssessmentQuestion();
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Please select a valid option (1-4).",
          },
        ]);
      }
    } else {
      if (userInput.toLowerCase().includes("assessment")) {
        await handleAssessmentQuestion();
      } else if (userInput.toLowerCase().includes("start over")) {
        setCurrentAnswers([]);
        setPreviousQuestions([]);
        setMessages([messages[0]]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Would you like to start the career assessment? Just say 'assessment' to begin, or ask me any specific career-related questions.",
          },
        ]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: userInput,
      },
    ]);

    await handleUserInput(userInput);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0C1222,#000000)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black_70%,transparent_100%)]" />
        <div className="absolute -left-16 top-0 h-48 w-48 md:h-96 md:w-96 rounded-full bg-emerald-500/20 blur-[64px] md:blur-[128px]" />
        <div className="absolute -right-16 bottom-0 h-48 w-48 md:h-96 md:w-96 rounded-full bg-blue-500/20 blur-[64px] md:blur-[128px]" />
      </div>

      {/* Main Content */}
      <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 pb-16 pt-4 relative">
        <div className="max-w-4xl mx-auto h-full">
          {/* Chat Container */}
          <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden h-[calc(100vh-2rem)] flex flex-col">
            {/* Chat Header */}
            <div className="p-3 sm:p-4 border-b border-gray-700/30 backdrop-blur-sm bg-gray-800/30">
              <div className="flex items-center">
                <div className="flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/20 mr-2 sm:mr-3">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-white">
                    Career Advisor AI
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Answer questions or type 'assessment' to start
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[85%] sm:max-w-[80%] ${
                      message.type === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg ${
                        message.type === "user"
                          ? "bg-blue-500/20 ml-2"
                          : "bg-emerald-500/20 mr-2"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      ) : (
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                      )}
                    </div>
                    <div
                      className={`p-2 sm:p-3 rounded-xl text-sm sm:text-base ${
                        message.type === "user"
                          ? "bg-blue-500/10 border border-blue-500/20"
                          : "bg-gray-800/30 border border-gray-700/30"
                      }`}
                    >
                      <p className="text-gray-200 whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 mr-2">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-gray-800/30 border border-gray-700/30">
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 sm:p-4 border-t border-gray-700/30 backdrop-blur-sm bg-gray-800/30">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-900/50 border border-gray-700/30 rounded-lg sm:rounded-xl px-3 py-2 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center gap-1 sm:gap-2"
                  disabled={isLoading}
                >
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
