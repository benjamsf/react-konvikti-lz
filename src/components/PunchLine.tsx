import { Button } from "./Button";

interface PunchLineProps {
  title: string; // Title for the PunchLine
  text: string; // Main text below the title
  icon: string; // The image path for the icon
  alignRight?: boolean; // Determines the alignment for larger screens
  buttons?: {
    text: string; // Button label
    onClick: () => void; // Button action
  }[]; // Array of buttons
}

export function PunchLine({
  title,
  text,
  icon,
  alignRight = false,
  buttons = [],
}: PunchLineProps) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        alignRight ? "md:flex-row-reverse" : ""
      } items-center md:items-start gap-4 md:gap-8`}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <img
          src={icon}
          alt=""
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
        />
      </div>

      {/* Content */}
      <div className="text-center md:text-left flex-1">
        <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm md:text-base">{text}</p>

        {/* Buttons */}
        {buttons.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
            {buttons.map((button, index) => (
              <Button
                key={index}
                type="button"
                variant={{ color: "blackGrey", width: "auto" }}
                styling="min-h-[40px]"
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
