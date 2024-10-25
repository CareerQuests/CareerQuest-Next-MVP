import {
  ClipboardCheck,
  UserCircle,
  BrainCircuit,
  Briefcase,
} from "lucide-react";
import ProcessStep from "./ProcessStep";

export default function Flow() {
  return (
    <>
      {/* Large Screen */}
      <main className="min-h-screen bg-white/60 hidden sm:block mx-10 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-pink-500 font-medium mb-2">Simple Process</p>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              Effortless Process,
            </h1>
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Optimal Results
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            <ProcessStep
              title="Take Assessment"
              description="Start your journey by taking our comprehensive career assessment"
              icon={ClipboardCheck}
              isLeft={true}
              image={"assessment.jpg"}
            />

            <ProcessStep
              title="Complete Your Profile"
              description="Fill in your details and preferences to help us understand you better"
              icon={UserCircle}
              isLeft={false}
              image={"completeProfile.jpg"}
            />

            <ProcessStep
              title="Answer Career Quiz"
              description="Take our specialized quiz to identify your strengths and interests"
              icon={BrainCircuit}
              isLeft={true}
              image={"answerQuiz.jpg"}
            />

            <ProcessStep
              title="Get Your Career Path"
              description="Receive personalized career recommendations based on your profile and assessment"
              icon={Briefcase}
              isLeft={false}
              image={"careerPath.jpg"}
            />
          </div>
        </div>
      </main>
      {/* Small Screen */}
      <main className="min-h-screen bg-gray-50 py-10 block sm:hidden">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-pink-600 font-semibold uppercase">
              Simple Process
            </p>
            <h1 className="text-4xl font-bold text-gray-800">
              Effortless Process
            </h1>
            <h2 className="text-4xl font-bold text-gray-800">
              Optimal Results
            </h2>
          </div>

          <div className="space-y-6">
            <ProcessStep
              title="Take Assessment"
              description="Start your journey by taking our comprehensive career assessment."
              icon={ClipboardCheck}
            />
            <ProcessStep
              title="Complete Your Profile"
              description="Fill in your details and preferences to help us understand you better."
              icon={UserCircle}
            />
            <ProcessStep
              title="Answer Career Quiz"
              description="Take our specialized quiz to identify your strengths and interests."
              icon={BrainCircuit}
            />
            <ProcessStep
              title="Get Your Career Path"
              description="Receive personalized career recommendations based on your profile and assessment."
              icon={Briefcase}
            />
          </div>
        </div>
      </main>
    </>
  );
}
// safe
