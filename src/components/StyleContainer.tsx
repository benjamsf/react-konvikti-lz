import React, { ReactNode } from "react";

interface StyleContainerProps {
  children: ReactNode;
}

const StyleContainer: React.FC<StyleContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-full">
      {children}
    </div>
  );
};

export default StyleContainer;
