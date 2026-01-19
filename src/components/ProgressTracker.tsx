import React from "react";

interface ProgressTrackerProps {
  currentStep: number;
  onClick: (stepIndex: number) => void;
}

const steps = ["Download App", "Install App", "Set Up Account"];

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentStep,
  onClick,
}) => {
  return (
    <div className="p-2 bg-white fixed top-16 w-full z-10">
      <div className="flex justify-between">
        {steps.map((step, idx) => (
          <div key={idx}>
            <div
              className={`cursor-pointer ${
                idx === currentStep ? "text-primary" : "text-gray-500"
              }`}
              onClick={() => onClick(idx)}
            >
              O
            </div>
            {idx === currentStep && (
              <div className="text-xs mt-1">{`Step ${idx + 1}: ${step}`}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
