interface Step {
  id: number;
  name: string;
}

interface StepsProps {
  steps: Step[];
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
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              step.id <= currentStep ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.id <= currentStep
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {step.id}
            </div>
            <span className="mt-2 text-sm font-medium">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
