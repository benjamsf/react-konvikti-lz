import { useState } from "react";
import { useActiveHaku } from "../../hooks/useBlogPosts";
import { BlogPostDetail } from "../Blog/BlogPostDetail";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

export function HakuBanner() {
  const { t } = useTranslation();
  const { data: activeHaku, isLoading } = useActiveHaku();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showPost, setShowPost] = useState(false);

  if (isLoading || !activeHaku || isDismissed) {
    return null;
  }

  if (showPost) {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="min-h-screen py-8 px-4">
          <BlogPostDetail 
            post={activeHaku} 
            onClose={() => setShowPost(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-40">
      <div 
        className="
          bg-success/95 backdrop-blur-sm
          rounded-2xl shadow-2xl shadow-success/20
          border border-success-700/50
          overflow-hidden
          animate-slide-up
        "
      >
        <button
          onClick={() => setShowPost(true)}
          className="w-full p-4 text-left hover:bg-success-700/20 transition-colors"
        >
          <div className="flex items-start gap-3">
            {/* Pulsing indicator */}
            <div className="flex-shrink-0 mt-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white-100"></span>
              </span>
            </div>
            
            <div className="flex-grow min-w-0">
              <p className="text-white-100 font-bold text-sm mb-1">
                {t("hakuBanner.title", "Haku käynnissä!")}
              </p>
              <p className="text-white-200 text-sm font-medium truncate">
                {activeHaku.title}
              </p>
              <p className="text-white-300/80 text-xs mt-1">
                {t("hakuBanner.cta", "Klikkaa lukeaksesi lisää →")}
              </p>
            </div>
          </div>
        </button>

        {/* Dismiss button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="
            absolute top-2 right-2 
            p-1.5 rounded-full 
            text-white-300/70 hover:text-white-100 
            hover:bg-white/10
            transition-colors
          "
          aria-label={t("hakuBanner.dismiss", "Sulje")}
        >
          <Cross1Icon width={14} height={14} />
        </button>
      </div>
    </div>
  );
}