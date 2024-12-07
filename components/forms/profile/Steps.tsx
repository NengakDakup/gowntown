import { FormType } from "@/context/ProfileFormContext";

interface Step {
  title: string;
  type: FormType;
}

interface StepsProps {
  steps: readonly Step[];
  currentStep: number;
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="relative">
      <div className="absolute top-4 w-full h-0.5 bg-gray-200">
        <div
          className="absolute h-full bg-primary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.type}
            className={`flex flex-col ${
              index + 1 <= currentStep ? 'text-primary' : 'text-gray-400'
            } ${index === 0 ? 'items-start' : index === steps.length - 1 ? 'items-end' : 'items-center'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index + 1 <= currentStep
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
