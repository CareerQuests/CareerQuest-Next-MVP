const mongoose = require("mongoose");
const { Schema } = mongoose;

const CareerSchema = new Schema({
  title: String,
  description: String,
  traits: [String],
  skills: [String],
  education: [String],
  salary: {
    min: Number,
    max: Number,
  },
  outlook: String,
});

const Career = mongoose.models.Career || mongoose.model("Career", CareerSchema);

const careers = [
  {
    title: "Software Development",
    description:
      "Create and maintain software applications, solve complex problems, and work with cutting-edge technology.",
    traits: ["technical", "analytical", "innovative"],
    icon: "Code2",
  },
  {
    title: "Product Management",
    description:
      "Lead product strategy, work with cross-functional teams, and drive innovation in product development.",
    traits: ["leadership", "collaborative", "analytical"],
    icon: "Layout",
  },
  {
    title: "UX/UI Design",
    description:
      "Design user interfaces, create engaging experiences, and blend creativity with user psychology.",
    traits: ["creative", "empathetic", "innovative"],
    icon: "Palette",
  },
  {
    title: "Data Science",
    description:
      "Analyze complex data sets, identify patterns, and drive data-informed decision making.",
    traits: ["analytical", "technical", "methodical"],
    icon: "BarChart",
  },
  {
    title: "Project Management",
    description:
      "Coordinate teams, manage resources, and ensure successful project delivery.",
    traits: ["leadership", "structured", "collaborative"],
    icon: "GitBranch",
  },
  {
    title: "Medical Doctor",
    description:
      "Diagnose and treat patients, conduct medical research, and provide healthcare guidance.",
    traits: ["empathetic", "analytical", "dedicated"],
    icon: "HeartPulse",
  },
  {
    title: "Nurse",
    description:
      "Provide patient care, support doctors, and educate patients about health management.",
    traits: ["empathetic", "caring", "organized"],
    icon: "Nurse",
  },
  {
    title: "Marketing Specialist",
    description:
      "Develop marketing strategies, conduct market research, and engage with customers.",
    traits: ["creative", "strategic", "communicative"],
    icon: "Megaphone",
  },
  {
    title: "Civil Engineering",
    description:
      "Design and oversee construction projects, ensuring they meet safety standards and regulations.",
    traits: ["analytical", "technical", "problem-solver"],
    icon: "Build",
  },
  {
    title: "Education",
    description:
      "Teach and mentor students, develop educational programs, and assess learning outcomes.",
    traits: ["empathetic", "communicative", "patient"],
    icon: "BookOpen",
  },
  {
    title: "Psychology",
    description:
      "Study human behavior, provide therapy, and conduct psychological assessments.",
    traits: ["empathetic", "analytical", "observant"],
    icon: "Brain",
  },
  {
    title: "Journalism",
    description:
      "Research and report on news events, conduct interviews, and write articles.",
    traits: ["curious", "communicative", "adaptable"],
    icon: "Newspaper",
  },
  {
    title: "Public Relations Specialist",
    description:
      "Manage public image, create media strategies, and communicate with stakeholders to enhance brand reputation.",
    traits: ["communicative", "empathetic", "strategic"],
    icon: "Mic",
  },
  {
    title: "Human Resources",
    description:
      "Oversee recruitment, employee development, and work culture management to support organizational growth.",
    traits: ["empathetic", "organized", "social"],
    icon: "Users",
  },
  {
    title: "Environmental Scientist",
    description:
      "Study the environment, conduct research on pollution, and work towards sustainability solutions.",
    traits: ["observant", "analytical", "dedicated"],
    icon: "Leaf",
  },
  {
    title: "Event Coordinator",
    description:
      "Plan, organize, and manage events, ensuring all details align with client objectives and budgets.",
    traits: ["organized", "social", "dynamic"],
    icon: "Calendar",
  },
  {
    title: "Social Worker",
    description:
      "Support individuals and communities in need, advocate for resources, and provide emotional support.",
    traits: ["empathetic", "caring", "patient"],
    icon: "Heart",
  },
  {
    title: "Chef",
    description:
      "Create culinary dishes, experiment with flavors, and manage kitchen operations for restaurants or catering services.",
    traits: ["creative", "innovative", "dedicated"],
    icon: "Utensils",
  },
  {
    title: "Fashion Designer",
    description:
      "Design clothing and accessories, research fashion trends, and bring creative visions to life.",
    traits: ["creative", "innovative", "artistic"],
    icon: "Scissors",
  },
  {
    title: "Fitness Trainer",
    description:
      "Guide individuals in physical exercises, design fitness plans, and motivate clients to achieve their health goals.",
    traits: ["motivational", "dedicated", "social"],
    icon: "Dumbbell",
  },
  {
    title: "Counselor",
    description:
      "Provide emotional support, conduct therapy sessions, and guide individuals through personal challenges.",
    traits: ["empathetic", "patient", "observant"],
    icon: "Chat",
  },
  {
    title: "Entrepreneur",
    description:
      "Innovate, start businesses, manage resources, and create opportunities in competitive markets.",
    traits: ["risk-taker", "dynamic", "innovative"],
    icon: "Rocket",
  },
  {
    title: "Interior Designer",
    description:
      "Design aesthetically pleasing and functional spaces, select decor, and create mood-enhancing environments.",
    traits: ["creative", "innovative", "observant"],
    icon: "Home",
  },
  {
    title: "Veterinarian",
    description:
      "Provide healthcare for animals, perform surgeries, and advise pet owners on animal care.",
    traits: ["empathetic", "dedicated", "analytical"],
    icon: "Paw",
  },
];

async function connectDB() {
  //   if (!process.env.MONGODB_URI) {
  //     throw new Error("MONGODB_URI is not defined");
  //   }
  await mongoose.connect(
    "mongodb+srv://adhil1akbar:BobaMetals123@cluster0.k5mfwdc.mongodb.net/career-quest?retryWrites=true&w=majority"
  );
}

async function seedCareers() {
  try {
    await connectDB();
    await Career.deleteMany({});
    await Career.insertMany(careers);
    console.log("Careers seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding careers:", error);
    process.exit(1);
  }
}

seedCareers();
