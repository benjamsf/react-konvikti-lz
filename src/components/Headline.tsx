import { Trans } from "react-i18next";

interface HeadlineProps {
  title: string; // The main headline title
  titleStyling?: string; // Optional styling for the title
  subtitle?: string; // Optional subtitle
  text?: string; // Optional text with Trans support
}

export function Headline({
  title,
  titleStyling = "text-3xl md:text-5xl text-white mb-4",
  subtitle,
  text,
}: HeadlineProps) {
  return (
    <div className="text-center">
      {/* Title */}
      <h2 className={`${titleStyling}`}>{title}</h2>

      {/* Subtitle */}
      {subtitle && (
        <div className="text-xl md:text-2xl text-gray-400 mb-4">
          <Trans
            i18nKey={subtitle}
            components={{
              ul: <ul />,
              ol: <ol />,
              br: <br />,
              li: <li />,
              bold: <strong />,
            }}
          />
        </div>
      )}

      {/* Text with Trans */}
      {text && (
        <div className="text-base text-white md:text-lg">
          <Trans
            i18nKey={text}
            components={{
              ul: <ul />,
              ol: <ol />,
              br: <br />,
              li: <li />,
              bold: <strong />,
            }}
          />
        </div>
      )}
    </div>
  );
}
