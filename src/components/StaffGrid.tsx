import { useTranslation } from "react-i18next";

export interface StaffMember {
  name: string;
  title: string;
  description?: string;
  image: string;
}

interface StaffGridProps {
  title?: string;
  subtitle?: string;
  members: StaffMember[];
  backgroundColor?: string;
}

export function StaffGrid({
  title,
  subtitle,
  members,
  backgroundColor = "bg-background",
}: StaffGridProps) {
  const { t } = useTranslation();

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.slice(0, 6).map((member, index) => (
            <div
              key={index}
              className="group bg-backgroundDark rounded-2xl overflow-hidden border border-brown-800/50 hover:border-primary/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-title font-semibold text-white-200 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-400 font-medium text-sm mb-3">
                  {member.title}
                </p>
                {member.description && (
                  <p className="text-white-500 text-sm leading-relaxed">
                    {member.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}