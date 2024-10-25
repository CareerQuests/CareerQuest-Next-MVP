"use client";
import { useState } from "react";

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getCardStyle = (index) => {
    const diff =
      (index - currentSlide + testimonials.length) % testimonials.length;

    if (diff === 0) {
      // Current card
      return "translate-x-0 opacity-100 scale-100 z-30";
    } else if (diff === 1) {
      // Next card
      return "translate-x-[80%] opacity-75 scale-90 z-20";
    } else if (diff === testimonials.length - 1) {
      // Previous card
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
        <div className="relative h-[500px] md:h-[400px] w-full overflow-hidden flex justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute w-full sm:w-[50%] px-4 transition-all duration-500 ease-out ${getCardStyle(
                index
              )}`}
              onClick={() => {
                if (index !== currentSlide) {
                  setCurrentSlide(index);
                }
              }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg h-full">
                <div className="flex items-center mb-6">
                  {testimonial.company === "shopee" && (
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      {/* Shopee Icon */}
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3z"
                        />
                      </svg>
                    </div>
                  )}
                  {testimonial.company === "netflix" && (
                    <div className="w-8 h-8">
                      <div className="w-full h-full bg-red-600 rounded"></div>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-6">{testimonial.text}</p>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <svg
                      key={idx}
                      className={`w-5 h-5 ${
                        idx < testimonial.rating
                          ? "text-orange-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="/api/placeholder/48/48"
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

        <div className="flex justify-center sm:mt-4 mt-14 gap-2">
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
