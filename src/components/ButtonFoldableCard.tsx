import React, { useState, useRef } from "react";
import { Button } from "./Button";

interface ButtonCardProps {
  title: React.ReactNode;
  classes?: string;
  children?: React.ReactNode;
}

export function ButtonFoldableCard({
  title,
  children,
  classes,
}: ButtonCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`relative flex flex-col w-full rounded-md cursor-pointer m-2 ${
        isOpen ? "bg-backgroundLight" : ""
      }`}
      onClick={handleClick}
    >
      <Button styling={classes}>
        {title}
        <span
          className={`ml-2 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </Button>

      {isOpen && (
        <div className="mt-0">
          {children}
          <div ref={bottomRef}></div>
        </div>
      )}
    </div>
  );
}
