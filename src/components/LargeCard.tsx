import React, { ReactNode } from "react";
import { Step, StepProps } from "./Step";

interface CardProps {
  title?: React.ReactNode;
  details?: React.ReactNode;
  image?: string;
  url?: string;
  children?: ReactNode;
  steps?: StepProps[];
  className?: string;
  content?: ReactNode;
}

export function LargeCard({
  title,
  details,
  image,
  url,
  children,
  steps,
  className = "",
  content,
}: CardProps) {
  const backgroundImageUrl = image ? `url(${image})` : "none";

  return (
    <a
      href={url}
      className={`relative bg-backgroundLight rounded-lg w-full mb-2 max-w-full overflow-hidden flex flex-col ${className}`}
      style={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {image && (
        <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>
      )}

      {/* Content */}
      <div className="relative z-5 h-full flex flex-col justify-center items-center text-center p-6">
        <div className="flex flex-col justify-center items-center">
          {title && (
            <h2 className="prose prose-white mb-2 text-lg md:text-2xl lg:text-3xl">
              {title}
            </h2>
          )}
          {details && (
            <span className="prose prose-white mb-4 text-sm md:text-lg">
              {details}
            </span>
          )}
          {steps?.map((step, index) => <Step key={index} {...step} />)}
          {content && (
            <p className="mt-2 prose prose-white text-white text-sm md:text-base">
              {content}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="px-2 pb-2 gap-3 flex justify-center items-center mt-4">
          {children}
        </div>
      </div>
    </a>
  );
}
