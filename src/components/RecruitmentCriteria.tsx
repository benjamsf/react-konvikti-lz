import { useTranslation } from "react-i18next";
import {
  RocketIcon,
  PersonIcon,
  ReaderIcon,
  QuestionMarkCircledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";

export interface CriteriaItem {
  titleKey: string;
  textKey: string;
  icon?: ReactNode;
}

interface RecruitmentCriteriaProps {
  title?: string;
  subtitle?: string;
  items?: CriteriaItem[];
  backgroundColor?: string;
}

// Default icons for recruitment criteria
const defaultIcons: ReactNode[] = [
  <RocketIcon key="rocket" className="w-6 h-6" />,           // Opintomenestys
  <PersonIcon key="person" className="w-6 h-6" />,           // Yhteisöllisyys
  <ReaderIcon key="reader" className="w-6 h-6" />,           // Kiinnostus teologiaan
  <QuestionMarkCircledIcon key="question" className="w-6 h-6" />, // Olenko sopiva?
  <HeartIcon key="heart" className="w-6 h-6" />,             // Vahvuutena yhteisö
];

// Default criteria items based on the translation keys
const defaultCriteriaItems: CriteriaItem[] = [
  { titleKey: "infoPunch1.Title", textKey: "infoPunch1.Text" },
  { titleKey: "infoPunch2.Title", textKey: "infoPunch2.Text" },
  { titleKey: "infoPunch3.Title", textKey: "infoPunch3.Text" },
  { titleKey: "infoPunch4.Title", textKey: "infoPunch4.Text" },
  { titleKey: "infoPunch5.Title", textKey: "infoPunch5.Text" },
];

export function RecruitmentCriteria({
  title,
  subtitle,
  items = defaultCriteriaItems,
  backgroundColor = "bg-background",
}: RecruitmentCriteriaProps) {
  const { t } = useTranslation();

  // Split items: first 3 are criteria, last 2 are additional info
  const criteriaItems = items.slice(0, 3);
  const additionalItems = items.slice(3);

  return (
    <section className={`py-16 px-4 md:px-8 ${backgroundColor}`}>
      <div className="max-w-4xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-title font-bold text-white-200 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-white-500 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Main criteria cards */}
        <div className="space-y-6 mb-12">
          {criteriaItems.map((item, index) => (
            <div
              key={index}
              className="
                bg-backgroundDark rounded-2xl p-6 
                border border-brown-800/50 
                hover:border-primary/30 
                transition-all duration-300
                group
              "
            >
              <div className="flex gap-5">
                {/* Icon */}
                <div 
                  className="
                    flex-shrink-0 
                    w-12 h-12 
                    rounded-xl 
                    bg-primary/20 
                    text-primary 
                    flex items-center justify-center
                    group-hover:bg-primary/30 
                    transition-colors
                  "
                >
                  {item.icon || defaultIcons[index] || defaultIcons[0]}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg md:text-xl font-title font-semibold text-white-200 mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-white-500 text-sm md:text-base leading-relaxed">
                    {t(item.textKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info items - lighter style, no card background */}
        {additionalItems.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-brown-700/30">
            {additionalItems.map((item, index) => {
              const actualIndex = index + criteriaItems.length;
              return (
                <div
                  key={actualIndex}
                  className="flex gap-5"
                >
                  {/* Icon - softer style */}
                  <div 
                    className="
                      flex-shrink-0 
                      w-10 h-10 
                      rounded-full 
                      bg-brown-800/30
                      text-white-400
                      flex items-center justify-center
                    "
                  >
                    {item.icon || defaultIcons[actualIndex] || defaultIcons[0]}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-title font-medium text-white-300 mb-2">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-white-500 text-sm leading-relaxed">
                      {t(item.textKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}