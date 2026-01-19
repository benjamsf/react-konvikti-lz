import { useState, useRef, useMemo } from "react";
import { useAsukashakuPosts } from "../../hook/useBlogPosts";
import { BlogPostCard } from "./BlogPostCard";
import { BlogPostDetail } from "./BlogPostDetail";
import type { BlogPost } from "../../types/blog";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface AsukashakuSectionProps {
  showTitle?: boolean;
  maxPosts?: number;
}

export function AsukashakuSection({
  showTitle = true,
  maxPosts,
}: AsukashakuSectionProps) {
  const { t } = useTranslation();
  const { data: posts, isLoading, error } = useAsukashakuPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sort posts: active (open) first, then by date
  const sortedPosts = useMemo(() => {
    if (!posts) return [];
    const sorted = [...posts].sort((a, b) => {
      // Open status comes first
      if (a.hakuStatus === "open" && b.hakuStatus !== "open") return -1;
      if (a.hakuStatus !== "open" && b.hakuStatus === "open") return 1;
      // Then sort by date (newest first)
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
    // Apply maxPosts limit if specified
    return maxPosts ? sorted.slice(0, maxPosts) : sorted;
  }, [posts, maxPosts]);

  // Touch handling for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  const goToPrev = () => {
    if (sortedPosts && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (sortedPosts && activeIndex < sortedPosts.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Touch handlers that capture events and prevent parent Swiper from handling them
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    // Stop propagation to prevent LandingZoneSwiper from capturing
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    // Stop propagation
    e.stopPropagation();
  };

  if (selectedPost) {
    return (
      <section className="py-12 px-4 md:px-8 bg-backgroundBlue">
        <div className="max-w-6xl mx-auto">
          <BlogPostDetail post={selectedPost} onClose={handleCloseDetail} />
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-12 px-4 md:px-8 bg-backgroundBlue">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 rounded-full border-2 border-brown-600 border-t-primary animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !posts || posts.length === 0) {
    return null;
  }

  const postCount = sortedPosts.length;
  const showNavigation = postCount > 1;

  return (
    <section className="py-12 px-4 md:px-8 bg-backgroundBlue">
      <div className="max-w-6xl mx-auto">
        {showTitle && (
          <div className="mb-10 text-center">
            <p className="text-white-500 max-w-2xl mx-auto">
              {t("asukashaku.subtitle", "Avoimet ja aiemmat asukashaut")}
            </p>
          </div>
        )}

        {/* Swipeable Card Stack Container */}
        <div
          className="flex items-center justify-center gap-2 md:gap-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow */}
          {showNavigation && (
            <button
              onClick={goToPrev}
              disabled={activeIndex === 0}
              className={`
                p-5 md:p-8 rounded-2xl transition-all duration-200 flex-shrink-0
                ${
                  activeIndex === 0
                    ? "opacity-20 cursor-not-allowed"
                    : "bg-brown-700/70 hover:bg-primary/80 text-white-300 hover:text-white-100 active:scale-95"
                }
              `}
              aria-label="Edellinen"
            >
              <ChevronLeftIcon width={56} height={56} />
            </button>
          )}

          {/* Card Stack */}
          <div className="relative w-full max-w-sm h-[420px] touch-pan-y">
            {sortedPosts.map((post, index) => {
              const offset = index - activeIndex;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <div
                  key={post._id}
                  className="absolute inset-0 transition-all duration-300 ease-out"
                  style={{
                    transform: `
                      translateX(${offset * 8}px)
                      translateY(${Math.abs(offset) * 8}px)
                      scale(${1 - Math.abs(offset) * 0.05})
                    `,
                    zIndex: sortedPosts.length - Math.abs(offset),
                    opacity: offset === 0 ? 1 : 0.6 - Math.abs(offset) * 0.2,
                    pointerEvents: offset === 0 ? "auto" : "none",
                  }}
                >
                  <BlogPostCard post={post} onReadMore={handleReadMore} />
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          {showNavigation && (
            <button
              onClick={goToNext}
              disabled={activeIndex === postCount - 1}
              className={`
                p-5 md:p-8 rounded-2xl transition-all duration-200 flex-shrink-0
                ${
                  activeIndex === postCount - 1
                    ? "opacity-20 cursor-not-allowed"
                    : "bg-brown-700/70 hover:bg-primary/80 text-white-300 hover:text-white-100 active:scale-95"
                }
              `}
              aria-label="Seuraava"
            >
              <ChevronRightIcon width={56} height={56} />
            </button>
          )}
        </div>

        {/* Pagination Dots */}
        {showNavigation && (
          <div className="flex justify-center gap-2 mt-8">
            {sortedPosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`
                  h-2 rounded-full transition-all duration-200
                  ${
                    idx === activeIndex
                      ? "bg-primary w-6"
                      : "bg-brown-600 hover:bg-brown-500 w-2"
                  }
                `}
                aria-label={`Postaus ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Swipe hint */}
        <p className="text-center text-white-600 text-sm mt-4 md:hidden">
          ← Pyyhkäise kortteja →
        </p>
      </div>
    </section>
  );
}
