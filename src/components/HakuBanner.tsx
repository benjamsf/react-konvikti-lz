import { useState } from "react";
import { createPortal } from "react-dom";
import { useActiveHaku } from "../hook/useBlogPosts";
import { BlogPostDetail } from "./Blog/BlogPostDetail";
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

  const handleOpenPost = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setShowPost(true);
  };

  if (showPost) {
    return createPortal(
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="min-h-screen py-8 px-4">
          <BlogPostDetail
            post={activeHaku}
            onClose={() => setShowPost(false)}
          />
        </div>
      </div>,
      document.body,
    );
  }

  // Use portal to render at body level for true fixed positioning
  return createPortal(
    <div className="fixed top-20 left-4 z-40 max-w-xs">
      <div className="relative bg-success rounded-xl shadow-lg shadow-success/30 overflow-hidden">
        <button
          onClick={handleOpenPost}
          className="w-full px-4 py-3 text-left hover:bg-success-700/30 transition-colors flex items-center gap-3"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>

          <div className="min-w-0">
            <p className="text-white font-bold text-sm">
              {t("hakuBanner.title", "Haku käynnissä!")}
            </p>
            <p className="text-white/80 text-xs truncate">{activeHaku.title}</p>
          </div>
        </button>

        {/* Dismiss button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute top-1 right-1 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-colors"
          aria-label={t("hakuBanner.dismiss", "Sulje")}
        >
          <Cross1Icon width={12} height={12} />
        </button>
      </div>
    </div>,
    document.body,
  );
}
