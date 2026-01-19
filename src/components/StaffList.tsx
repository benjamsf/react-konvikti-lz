export interface BoardMember {
  _id?: string;
  name: string;
  role: string;
}

interface StaffListProps {
  title?: string;
  subtitle?: string;
  members: BoardMember[];
  backgroundColor?: string;
  isLoading?: boolean;
}

export function StaffList({
  title,
  subtitle,
  members,
  backgroundColor = "bg-backgroundBlue",
  isLoading = false,
}: StaffListProps) {
  if (isLoading) {
    return (
      <section className={`py-16 px-4 md:px-8 ${backgroundColor}`}>
        <div className="max-w-4xl mx-auto">
          {(title || subtitle) && (
            <div className="text-center mb-10">
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
          <div className="bg-backgroundDark rounded-2xl border border-brown-800/50 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`px-6 py-4 animate-pulse ${
                  i !== 5 ? "border-b border-brown-800/50" : ""
                }`}
              >
                <div className="h-5 bg-brown-800/50 rounded w-1/3 mb-2" />
                <div className="h-4 bg-brown-800/30 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 px-4 md:px-8 ${backgroundColor}`}>
      <div className="max-w-4xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10">
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

        <div
          className={`bg-backgroundDark rounded-2xl border border-brown-800/50 overflow-hidden ${
            members.length <= 2 ? "max-w-xl mx-auto" : ""
          }`}
        >
          {members.map((member, index) => (
            <div
              key={member._id || index}
              className={`
                flex flex-col sm:flex-row sm:items-center justify-between
                px-6 py-4
                ${
                  index !== members.length - 1
                    ? "border-b border-brown-800/50"
                    : ""
                }
                hover:bg-brown-800/20 transition-colors
                ${members.length <= 2 ? "text-center sm:text-left" : ""}
              `}
            >
              <span className="text-white-200 font-medium text-lg">
                {member.name}
              </span>
              <span className="text-primary-400 text-sm sm:text-base mt-1 sm:mt-0">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
