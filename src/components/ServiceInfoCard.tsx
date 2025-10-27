import React from "react";

interface ServiceInfoCardProps {
  title?: React.ReactNode;
  image?: string;
  details?: React.ReactNode; // This can be a ReactNode, so it supports elements like <ul>, <li>, <strong>, etc.
  children?: React.ReactNode;
}

export const ServiceInfoCard: React.FC<ServiceInfoCardProps> = ({
  title,
  image,
  details,
  children,
}) => {
  return (
    <div className="flex w-full max-w-[420px] max-h-[600px] flex-col items-center justify-center bg-backgroundLight rounded-lg p-2 mb-2 overflow-hidden">
      {title && (
        <h3 className="text-white text-xl font-bold mt-1 mb-1">{title}</h3>
      )}
      {image && (
        <img
          src={image}
          alt={typeof title === "string" ? title : "Service Image"}
          className="flex max-w-[120px] max-h-[120px] object-contain mt-1 mb-1"
        />
      )}
      {details && (
        <div className="m-2 text-white prose prose-whitemt-1 mb-1">
          {details}
        </div>
      )}
      {children}
    </div>
  );
};
