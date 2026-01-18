import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export interface TimelineEvent {
  year: string;
  title: string;
  description?: string;
  icon?: string;
}

interface TimelineProps {
  title?: string;
  subtitle?: string;
  events: TimelineEvent[];
  backgroundColor?: string;
}

export function Timeline({
  title,
  subtitle,
  events,
  backgroundColor = "bg-backgroundBlue",
}: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={`py-16 px-4 md:px-8 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto">
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

        {/* Timeline container */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-[60px] left-0 right-0 h-0.5 bg-brown-700/50" />

          {/* Scrollable events */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((event, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 md:w-80"
              >
                {/* Year marker */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-backgroundBlue z-10" />
                  <span className="mt-3 text-primary font-bold text-lg">
                    {event.year}
                  </span>
                </div>

                {/* Event card */}
                <div className="bg-backgroundDark rounded-xl p-5 border border-brown-800/50 hover:border-primary/30 transition-all h-full">
                  {event.icon && (
                    <div className="w-12 h-12 mb-4 rounded-lg bg-brown-800/50 flex items-center justify-center overflow-hidden">
                      <img
                        src={event.icon}
                        alt=""
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  )}
                  <h4 className="text-lg font-semibold text-white-200 mb-2">
                    {event.title}
                  </h4>
                  {event.description && (
                    <p className="text-white-500 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons - centered below timeline */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={() => scroll("left")}
            className="p-5 md:p-6 rounded-2xl bg-backgroundDark border border-brown-800/50 text-white-300 hover:text-white-100 hover:border-primary/50 hover:bg-primary/20 transition-all active:scale-95"
            aria-label="Vieritä vasemmalle"
          >
            <ChevronLeftIcon width={40} height={40} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-5 md:p-6 rounded-2xl bg-backgroundDark border border-brown-800/50 text-white-300 hover:text-white-100 hover:border-primary/50 hover:bg-primary/20 transition-all active:scale-95"
            aria-label="Vieritä oikealle"
          >
            <ChevronRightIcon width={40} height={40} />
          </button>
        </div>

        {/* Scroll hint for mobile */}
        <p className="text-center text-white-600 text-sm mt-4 md:hidden">
          Käytä nuolia navigoidaksesi
        </p>
      </div>
    </section>
  );
}