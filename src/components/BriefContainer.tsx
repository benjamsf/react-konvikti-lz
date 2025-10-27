import { Trans } from "react-i18next";
import { PunchLine } from "./PunchLine";
import { Button } from "./Button";

interface BriefContainerProps {
  items?: {
    title: string;
    text: string;
    icon: string;
    buttons?: {
      // Support for multiple buttons per PunchLine
      text: string;
      onClick: () => void;
    }[];
  }[];
  backgroundColor?: string; // Background color of the container
  headTitle?: string; // Translation key for the main title
  subtitle?: string; // Translation key for the subtitle
  buttonText?: string; // Button text below the subtitle
  onButtonClick?: () => void; // Button action
  afterWord?: string; // Translation key for the text below PunchLines
}

export function BriefContainer({
  items,
  backgroundColor = "bg-gray-900",
  headTitle,
  subtitle,
  buttonText,
  onButtonClick,
  afterWord,
}: BriefContainerProps) {
  return (
    <div className={`py-4 px-12 lg:py-12 md:px-8 ${backgroundColor}`}>
      <div className="max-w-3xl mx-auto px-4 md:px-12 py-8 space-y-16">
        {/* HeadTitle */}
        {headTitle && (
          <h2 className="text-2xl md:text-4xl text-center text-white font-bold mb-4">
            <Trans i18nKey={headTitle} />
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base md:text-lg text-center text-gray-400 mb-6">
            <Trans i18nKey={subtitle} />
          </p>
        )}

        {/* Container-level Button */}
        {buttonText && onButtonClick && (
          <div className="text-center mb-8">
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

        {/* PunchLines */}
        {items?.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center md:items-start gap-4 md:gap-8`}
          >
            <PunchLine
              title={item.title}
              text={item.text}
              icon={item.icon}
              buttons={item.buttons} // Pass multiple buttons to PunchLine
              alignRight={index % 2 === 1}
            />
          </div>
        ))}

        {/* AfterWord */}
        {afterWord && (
          <p className="text-base md:text-lg text-center text-gray-600 p-5">
            <Trans
              i18nKey={afterWord}
              components={{ br: <br />, bold: <strong /> }}
            />
          </p>
        )}
      </div>
    </div>
  );
}
