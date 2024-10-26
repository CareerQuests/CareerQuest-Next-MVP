import React from "react";
import { Search, MapPin } from "lucide-react";

const SearchCareer = () => {
  const categories = [
    { id: 1, name: "Design", icon: "🎨", active: true },
    { id: 2, name: "Business", icon: "📊" },
    { id: 3, name: "Technology", icon: "💻" },
    { id: 4, name: "Analytics", icon: "📈" },
    { id: 5, name: "Media Studies", icon: "📱" },
    { id: 6, name: "Data Science", icon: "🔍" },
    { id: 7, name: "Management", icon: "📋" },
    { id: 8, name: "Other", icon: "➕" },
  ];

  const courses = [
    {
      id: 1,
      college: "Harvard University",
      logo: "Harvard.png",
      program: "Master's in Design",
      location: "Cambridge, USA",
      type: "Full-time",
      duration: "2 years",
      fee: "$50,000/year",
      posted: "NEW",
    },
    {
      id: 2,
      college: "MIT",
      logo: "MIT.png",
      program: "Data Science Certification",
      location: "Cambridge, USA",
      type: "Part-time",
      duration: "6 months",
      fee: "$5,000",
      posted: "POPULAR",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="text-center mb-8">
          <p className="text-pink-500 mb-2">Advance Your Career Path</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Discover Courses and Colleges
          </h1>

          {/* Search Form */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Program, keyword or college"
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
              <Search
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="City, state, or country"
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
              <MapPin
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
            </div>
            <button className="bg-black text-white px-8 py-3 rounded-lg">
              Search
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  category.active
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Course Listings */}
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border rounded-xl p-6 relative hover:shadow-md transition-shadow bg-gray-50"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={course.logo}
                    alt={course.college}
                    className="w-12 h-12 rounded"
                  />
                  <div>
                    <h3 className="font-bold text-xl mb-1">{course.program}</h3>
                    <p className="text-gray-600">{course.college}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    {course.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {course.type}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    {course.fee}
                  </div>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Enroll Now
                </button>

                <p className="text-pink-500 text-sm mt-4 text-center">
                  {course.posted}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCareer;
