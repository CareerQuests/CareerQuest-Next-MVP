import React from "react";
import { Sparkles, UserCircle2, Cpu, Rocket } from "lucide-react";
import { ProcessStep } from "./ProcessStep";

const steps = [
  {
    icon: Sparkles,
    title: "Take Assessment",
    description: "Complete our quick AI assessment to discover your potential",
  },
  {
    icon: UserCircle2,
    title: "Build Profile",
    description: "Create your profile to highlight your unique strengths",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Let our AI find your perfect career matches",
  },
  {
    icon: Rocket,
    title: "Get Started",
    description: "Receive your personalized career roadmap",
  },
];

export default function Flow() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            How It <span className="text-emerald-400">Works</span>
          </h2>
          <p className="text-gray-400">
            Find your ideal career in 4 simple steps
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              index={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
