import { ExternalLinkIcon } from "@radix-ui/react-icons";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const GOOGLE_RECRUITMENT_FORM = import.meta.env.VITE_GOOGLE_RECRUITMENT_FORM || "";

interface JoinOrgSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  buttonText: string;
  backgroundColor?: string;
  variant?: "default" | "highlight";
}

export function JoinOrgSection({
  title,
  subtitle,
  description,
  buttonText,
  backgroundColor = "bg-background",
  variant = "default",
}: JoinOrgSectionProps) {
  const isHighlight = variant === "highlight";

  return (
    <section className={`py-16 px-4 md:px-8 ${backgroundColor}`}>
      <div className="max-w-4xl mx-auto">
        <div
          className={`
            rounded-2xl p-8 md:p-12 text-center
            ${isHighlight
              ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30"
              : "bg-backgroundDark border border-brown-800/50"
            }
          `}
        >
          {subtitle && (
            <p className="text-primary-400 font-medium text-sm uppercase tracking-wider mb-3">
              {subtitle}
            </p>
          )}

          <h2 className="text-2xl md:text-3xl font-title font-bold text-white-200 mb-4">
            {title}
          </h2>

          {description && (
            <p className="text-white-500 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {GOOGLE_RECRUITMENT_FORM ? (
            <a
              href={GOOGLE_RECRUITMENT_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-3 
                px-8 py-4 
                font-semibold text-lg
                rounded-xl 
                transition-all duration-200
                hover:scale-105 active:scale-95
                ${isHighlight
                  ? "bg-primary hover:bg-primary-600 text-white-100"
                  : "bg-primary hover:bg-primary-600 text-white-100"
                }
              `}
            >
              {buttonText}
              <ExternalLinkIcon width={20} height={20} />
            </a>
          ) : (
            <p className="text-white-600 text-sm">
              Rekrytointilomake ei ole saatavilla.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}