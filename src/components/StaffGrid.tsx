export interface StaffMember {
  _id?: string;
  name: string;
  title: string;
  description?: string;
  image?: string;
}

interface StaffGridProps {
  title?: string;
  subtitle?: string;
  members: StaffMember[];
  backgroundColor?: string;
  isLoading?: boolean;
}

export function StaffGrid({
  title,
  subtitle,
  members,
  backgroundColor = "bg-background",
  isLoading = false,
}: StaffGridProps) {
  if (isLoading) {
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
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-backgroundDark rounded-2xl overflow-hidden border border-brown-800/50 animate-pulse"
              >
                <div className="aspect-square bg-brown-800/50" />
                <div className="p-6">
                  <div className="h-6 bg-brown-800/50 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-brown-800/30 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        <div className={`
          grid gap-8
          ${members.length === 1 
            ? "grid-cols-1 max-w-sm mx-auto" 
            : members.length === 2 
              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" 
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }
        `}>
          {members.slice(0, 6).map((member, index) => (
            <div
              key={member._id || index}
              className="group bg-backgroundDark rounded-2xl overflow-hidden border border-brown-800/50 hover:border-primary/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-brown-800/30">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white-600">
                    <svg
                      className="w-24 h-24 opacity-30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
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