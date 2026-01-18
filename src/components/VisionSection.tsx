import { CheckCircledIcon, TargetIcon } from "@radix-ui/react-icons";

export interface ValueItem {
  title: string;
  description: string;
}

export interface GoalItem {
  title: string;
  description?: string;
}

interface VisionSectionProps {
  title?: string;
  subtitle?: string;
  valuesTitle?: string;
  values: ValueItem[];
  goalsTitle?: string;
  goals: GoalItem[];
  backgroundColor?: string;
}

export function VisionSection({
  title,
  subtitle,
  valuesTitle,
  values,
  goalsTitle,
  goals,
  backgroundColor = "bg-background",
}: VisionSectionProps) {
  return (
    <section className={`py-16 px-4 md:px-8 ${backgroundColor}`}>
      <div className="max-w-6xl mx-auto">
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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Values Column */}
          <div>
            {valuesTitle && (
              <h3 className="text-2xl font-title font-semibold text-white-200 mb-6 flex items-center gap-3">
                <CheckCircledIcon className="w-7 h-7 text-primary" />
                {valuesTitle}
              </h3>
            )}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-backgroundDark rounded-xl p-6 border border-brown-800/50 hover:border-primary/30 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-white-200 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-white-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Column */}
          <div>
            {goalsTitle && (
              <h3 className="text-2xl font-title font-semibold text-white-200 mb-6 flex items-center gap-3">
                <TargetIcon className="w-7 h-7 text-success" />
                {goalsTitle}
              </h3>
            )}
            <div className="space-y-4">
              {goals.map((goal, index) => (
                <div
                  key={index}
                  className="bg-backgroundDark rounded-xl p-5 border border-brown-800/50 hover:border-success/30 transition-colors flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white-200 mb-1">
                      {goal.title}
                    </h4>
                    {goal.description && (
                      <p className="text-white-500 text-sm leading-relaxed">
                        {goal.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}