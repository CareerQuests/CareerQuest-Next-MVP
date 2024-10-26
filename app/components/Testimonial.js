"use client";
import { useState, useRef, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Maxwell Salvador",
    role: "Digital Creative & Production Lead at Uniqlo",
    rating: 3,
    company: "uniqlo",
    text: "HireMe's exceptional platform made my job search a breeze. Thanks to HireMe, I secured an incredible position that aligns perfectly with my career goals. I highly recommend HireMe to anyone serious about finding their ideal job!",
  },
  {
    id: 2,
    name: "Xaviera Putri",
    role: "Product Designer at Shopee",
    rating: 5,
    company: "shopee",
    text: "The platform's comprehensive database and advanced search features allowed me to easily discover job opportunities that I hadn't found on other sites. I found an amazing position that perfectly fits my career goals. Highly recommend HireMe to anyone serious about finding the right job!",
  },
  {
    id: 3,
    name: "Axell Andersont",
    role: "Senior Content Designer at Netflix",
    rating: 5,
    company: "netflix",
    text: "HireMe's exceptional platform made my job search a breeze. Thanks to HireMe, I secured an incredible position that aligns perfectly with my career goals. I highly recommend HireMe to anyone serious about finding their ideal job!",
  },
];

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startPosition, setStartPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);
  const activeCardRef = useRef(null);

  useEffect(() => {
    if (activeCardRef.current) {
      setCardHeight(activeCardRef.current.offsetHeight);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleTouchStart = (e) => {
    setStartPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startPosition === null) return;

    const currentPosition = e.touches[0].clientX;
    const difference = startPosition - currentPosition;

    if (difference > 50) {
      nextSlide();
      setStartPosition(null);
    } else if (difference < -50) {
      prevSlide();
      setStartPosition(null);
    }
  };

  const handleMouseDown = (e) => {
    setStartPosition(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || startPosition === null) return;

    const difference = startPosition - e.clientX;

    if (difference > 50) {
      nextSlide();
      setStartPosition(null);
      setIsDragging(false);
    } else if (difference < -50) {
      prevSlide();
      setStartPosition(null);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getCardStyle = (index) => {
    const diff =
      (index - currentSlide + testimonials.length) % testimonials.length;

    if (diff === 0) {
      return "translate-x-0 opacity-100 scale-100 z-30";
    } else if (diff === 1) {
      return "translate-x-[80%] opacity-75 scale-90 z-20";
    } else if (diff === testimonials.length - 1) {
      return "-translate-x-[80%] opacity-75 scale-90 z-20";
    } else {
      return "opacity-0 scale-90 translate-x-full z-0";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-pink-500 text-sm mb-2">Success Experience</p>
        <h2 className="text-4xl md:text-5xl font-bold">
          Insights from Connect Users
        </h2>
      </div>

      <div className="relative">
        <div
          className="relative h-[500px] md:h-[400px] w-full overflow-hidden flex justify-center sm:mb-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={currentSlide === index ? activeCardRef : null}
              className={`absolute w-full sm:w-[50%] px-4 transition-all duration-500 ease-out ${getCardStyle(
                index
              )}`}
              onClick={() => setCurrentSlide(index)}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg h-full">
                {/* Testimonial Content */}
                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="compass-regular.svg"
                      alt={`${testimonial.name}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-gray-800 w-4" : "bg-gray-300"
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
