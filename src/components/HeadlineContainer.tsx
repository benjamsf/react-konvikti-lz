import { Headline } from "./Headline";
import { Button } from "./Button";

interface HeadlineContainerProps {
  items: {
    title: string;
    titleStyling?: string;
    subtitle?: string;
    text?: string;
  }[];
  backgroundColor?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function HeadlineContainer({
  items,
  backgroundColor = "bg-gray-900",
  buttonText,
  onButtonClick,
}: HeadlineContainerProps) {
  return (
    <div className={`py-12 mt-8 px-4 md:px-8 ${backgroundColor}`}>
      <div className="max-w-4xl mx-auto space-y-12">
        {items.map((item, index) => (
          <Headline
            key={index}
            title={item.title}
            titleStyling={
              item.titleStyling || "text-3xl md:text-5xl text-white mb-4"
            }
            subtitle={item.subtitle}
            text={item.text}
          />
        ))}

        {/* Add a Button at the bottom if props are passed */}
        {buttonText && onButtonClick && (
          <div className="text-center mt-8">
            <Button
              type="button"
              styling="min-h-[50px] px-6 py-3"
              variant={{ color: "blackGrey", width: "auto" }}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
