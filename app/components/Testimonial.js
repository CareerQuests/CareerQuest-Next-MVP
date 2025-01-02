"use client";
import { useState, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Maxwell Salvador",
    role: "Digital Creative Lead",
    text: "CareerQuest's assessment tools provided invaluable insights into my career path. The AI-powered recommendations were remarkably accurate.",
  },
  {
    id: 2,
    name: "Xaviera Putri",
    role: "Product Designer",
    text: "The platform's comprehensive analysis helped me discover career opportunities I hadn't considered. The guidance was transformative.",
  },
  {
    id: 3,
    name: "Axell Anderson",
    role: "Senior Designer",
    text: "CareerQuest made my career transition seamless. The personalized roadmap and skill assessments were incredibly helpful.",
  },
];

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startPosition, setStartPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (currentPosition) => {
    if (startPosition === null) return;
    const difference = startPosition - currentPosition;
    if (Math.abs(difference) > 50) {
      setCurrentSlide((prev) =>
        difference > 0
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length
      );
      setStartPosition(null);
      setIsDragging(false);
    }
  };

  const getCardStyle = (index) => {
    const diff =
      (index - currentSlide + testimonials.length) % testimonials.length;
    const styles = {
      0: "translate-x-0 opacity-100 scale-100 z-30",
      1: "translate-x-[80%] opacity-40 scale-90 z-20",
      [testimonials.length - 1]: "-translate-x-[80%] opacity-40 scale-90 z-20",
    };
    return styles[diff] || "opacity-0 scale-90 translate-x-full z-0";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          User <span className="text-emerald-400">Success</span> Stories
        </h2>
        <p className="text-gray-400">
          Discover how CareerQuest transformed careers
        </p>
      </div>

      <div
        className="relative"
        onTouchStart={(e) => setStartPosition(e.touches[0].clientX)}
        onTouchMove={(e) => handleDrag(e.touches[0].clientX)}
        onMouseDown={(e) => {
          setStartPosition(e.clientX);
          setIsDragging(true);
        }}
        onMouseMove={(e) => isDragging && handleDrag(e.clientX)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div className="relative h-[300px] w-full overflow-hidden flex justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute w-full sm:w-[600px] px-4 transition-all duration-500 ease-out ${getCardStyle(
                index
              )}`}
              onClick={() => setCurrentSlide(index)}
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 h-full">
                <p className="text-gray-300 text-lg mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-emerald-400 w-6" : "bg-gray-700"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
