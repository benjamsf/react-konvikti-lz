interface HeroSectionProps {
  image: string;
  title?: string;
  text?: string;
  overlayOpacity?: number;
  height?: "screen" | "tall" | "medium" | "short";
  titleSize?: "small" | "medium" | "large" | "xlarge";
  textSize?: "small" | "medium" | "large";
  className?: string;
}

const HEIGHT_CLASSES = {
  screen: "h-screen",
  tall: "h-[80vh]",
  medium: "h-[60vh]",
  short: "h-[40vh]",
} as const;

const TITLE_SIZE_CLASSES = {
  small: "text-3xl md:text-4xl",
  medium: "text-4xl md:text-5xl",
  large: "text-4xl md:text-6xl",
  xlarge: "text-5xl md:text-7xl",
} as const;

const TEXT_SIZE_CLASSES = {
  small: "text-base md:text-lg",
  medium: "text-lg md:text-xl",
  large: "text-lg md:text-2xl",
} as const;

export function HeroSection({
  image,
  title,
  text,
  overlayOpacity = 0.4,
  height = "screen",
  titleSize = "large",
  textSize = "large",
  className = "",
}: HeroSectionProps) {
  const heightClass = HEIGHT_CLASSES[height];
  const titleSizeClass = TITLE_SIZE_CLASSES[titleSize];
  const textSizeClass = TEXT_SIZE_CLASSES[textSize];

  return (
    <div className={`relative w-full ${heightClass} ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={title || "Hero image"}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {title && (
          <h1 className={`${titleSizeClass} font-title mb-4`}>{title}</h1>
        )}
        {text && (
          <p className={`${textSizeClass} font-subtitle max-w-3xl`}>{text}</p>
        )}
      </div>
    </div>
  );
}
