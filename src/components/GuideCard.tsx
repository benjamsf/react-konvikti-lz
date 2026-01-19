import { ReactNode } from "react";

interface CardProps {
  title?: React.ReactNode;
  details?: React.ReactNode;
  image?: string;
  url?: string;
  children?: ReactNode;
}

export function GuideCard({ title, details, image, url, children }: CardProps) {
  const backgroundImageUrl = image ? `url(${image})` : "none";

  return (
    <a
      href={url}
      className="relative bg-backgroundLight rounded-lg w-full mb-2 max-w-full h-45 md:h-50 lg:h-60 p-4 overflow-hidden flex flex-col justify-between"
      style={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      <div className="relative w-full p-2">
        {title && (
          <div className="prose prose-white mb-2">
            <h2>{title}</h2>
          </div>
        )}

        {details && (
          <div className="rounded-br-lg prose prose-white mb-4">
            <span>{details}</span>
          </div>
        )}
      </div>

      <div className="relative w-full px-2 pb-2 gap-3 flex justify-center">
        {children}
      </div>
    </a>
  );
}
