import { ReactNode } from "react";

interface CardProps {
  title: React.ReactNode;
  details?: React.ReactNode;
  image?: string;
  url?: string;
  children?: ReactNode;
}

export function Card({ title, details, image, url }: CardProps) {
  return (
    <a
      href={url}
      className="relative bg-backgroundLight rounded-lg w-full w-full p-2 mb-2 max-w-full h-17 md:h-17 lg:h-17 m-2 overflow-hidden flex items-center justify-center"
    >
      {image && (
        <img src={image} className="max-w-20 max-h-20 object-contain p-2" />
      )}

      {details && (
        <div className="absolute left-0 top-0 p-2 rounded-br-lg prose prose-white">
          <span>{details}</span>
        </div>
      )}

      <div className="absolute right-0 top-0 bg-primary p-2 rounded-bl-lg prose prose-white">
        <span>{title}</span>
      </div>
    </a>
  );
}
