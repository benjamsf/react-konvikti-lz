import React, { useState } from "react";
import { Step, StepProps } from "./Step";

interface UnfoldableCardProps {
  title: React.ReactNode;
  steps?: StepProps[];
  content?: React.ReactNode;
  children?: React.ReactNode;
  styling?: string;
  initialOpen?: boolean;
}

export function UnfoldableCard({
  title,
  steps,
  content,
  children,
  styling = "",
  initialOpen = false,
}: UnfoldableCardProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col w-full p-4 rounded-md cursor-pointer bg-background ${styling}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-l text-white font-bold">{title}</h3>
        <span
          className={`transform transition-transform duration-300 text-white ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ display: "inline-block" }}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <>
          {steps?.map((step, index) => <Step key={index} {...step} />)}
          {content && (
            <p className="mt-2 text-white prose prose-white">{content}</p>
          )}
          {children}
        </>
      )}
    </div>
  );
}
