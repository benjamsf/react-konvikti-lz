import React, { ReactNode, CSSProperties } from "react";

interface ContentStyleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const ContentStyle: React.FC<ContentStyleProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={`flex justify-center items-center p-4 ${className || ""}`}
      style={style}
    >
      <div className="bg-black bg-opacity-50 max-w-md w-full rounded-lg p-4 text-white">
        {children}
      </div>
    </div>
  );
};

export default ContentStyle;
