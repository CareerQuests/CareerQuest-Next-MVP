import React from "react";

export function ProcessStep({
  title,
  description,
  icon: Icon,
  isLeft = true,
  image,
}) {
  return (
    <>
      {/* Small Screen */}
      <div className="block sm:hidden">
        <div className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center w-20 h-20 bg-pink-200 rounded-full p-4">
              <Icon className="w-12 h-12 text-pink-500" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Large Screen */}
      <div className="hidden sm:block">
        <div
          className={`flex items-start gap-8 ${
            isLeft ? "flex-row" : "flex-row-reverse"
          } my-24`}
        >
          <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
            <div
              className={`rounded-3xl m-6 inline-block ${
                isLeft ? "ml-auto" : "mr-auto"
              }`}
            >
              <img
                src={image ? image : "https://placehold.co/400x300"}
                alt={title}
                className="rounded-2xl mb-4 w-96 object-cover"
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-20">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
              <Icon className="w-6 h-6 text-pink-500" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 max-w-md">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProcessStep;
// safe
