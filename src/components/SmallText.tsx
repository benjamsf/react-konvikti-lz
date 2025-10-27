import React from "react";

interface SmallTextProps {
  text: string;
}

export const SmallText: React.FC<SmallTextProps> = ({ text }) => {
  return <p className="text-sm ml-12 mr-12 text-gray-500">{text}</p>;
};
