import React from "react";
import { Search, MapPin } from "lucide-react";

const JobSearch = () => {
  const categories = [
    { id: 1, name: "UI/UX Design", icon: "🎨", active: true },
    { id: 2, name: "Sales", icon: "📊" },
    { id: 3, name: "Development", icon: "💻" },
    { id: 4, name: "Analytics", icon: "📈" },
    { id: 5, name: "Digital Media Specialist", icon: "📱" },
    { id: 6, name: "Data Operator", icon: "🔍" },
    { id: 7, name: "Project Management", icon: "📋" },
    { id: 8, name: "Other", icon: "➕" },
  ];

  const jobs = [
    {
      id: 1,
      company: "Gojek",
      logo: "/api/placeholder/48/48",
      position: "Product Designer",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      salary: "$400/monthly",
      industry: "Technology",
      posted: "POSTED YESTERDAY",
    },
    {
      id: 2,
      company: "Ruang Guru",
      logo: "/api/placeholder/48/48",
      position: "UI/UX Researcher",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      salary: "$280/monthly",
      industry: "Education",
      posted: "POSTED 2 DAYS AGO",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="text-center mb-8">
          <p className="text-pink-500 mb-2">Realize your Career Dreams</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Search and Discover
            <br />
            your Jobs Here
          </h1>

          {/* Search Form */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Job title, keyword or company"
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
                placeholder="City, state, zip or remote"
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

          {/* Job Listings */}
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-xl p-6 relative hover:shadow-md transition-shadow"
              >
                <button className="absolute right-4 top-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>

                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded"
                  />
                  <div>
                    <h3 className="font-bold text-xl mb-1">{job.position}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    {job.location}
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
                    {job.type}
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
                    {job.salary}
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
                    {job.industry}
                  </div>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Apply
                </button>

                <p className="text-pink-500 text-sm mt-4 text-center">
                  {job.posted}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
