import { useState, useRef, useMemo } from "react";
import { useBlogPosts } from "../../hook/useBlogPosts";
import { BlogPostCard } from "./BlogPostCard";
import { BlogPostDetail } from "./BlogPostDetail";
import type { BlogPost, BlogCategory } from "../../types/blog";
import {
  MagnifyingGlassIcon,
  Cross1Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

interface BlogFeedProps {
  showFilters?: boolean;
  maxPosts?: number;
}

const CATEGORY_OPTIONS: { value: BlogCategory | "all"; labelKey: string }[] = [
  { value: "all", labelKey: "blogFeed.categories.all" },
  { value: "blog", labelKey: "blogFeed.categories.blog" },
  { value: "news", labelKey: "blogFeed.categories.news" },
  { value: "announcement", labelKey: "blogFeed.categories.announcement" },
  { value: "event", labelKey: "blogFeed.categories.event" },
  { value: "asukashaku", labelKey: "blogFeed.categories.asukashaku" },
];

export function BlogFeed({ showFilters = true, maxPosts }: BlogFeedProps) {
  const { t } = useTranslation();
  const { data: posts, isLoading, error } = useBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Touch handling refs for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    let result = [...posts];

    if (selectedCategory !== "all") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          (post.excerpt?.toLowerCase().includes(query) ?? false) ||
          (post.tags?.some((tag) => tag.toLowerCase().includes(query)) ??
            false),
      );
    }

    if (maxPosts) {
      result = result.slice(0, maxPosts);
    }

    return result;
  }, [posts, selectedCategory, searchQuery, maxPosts]);

  // Reset active index when filters change
  useMemo(() => {
    setActiveIndex(0);
  }, [selectedCategory, searchQuery]);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  // Navigation functions
  const goToPrev = () => {
    if (filteredPosts && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (filteredPosts && activeIndex < filteredPosts.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
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

    e.stopPropagation();
  };

  if (selectedPost) {
    return <BlogPostDetail post={selectedPost} onClose={handleCloseDetail} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-brown-700 border-t-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 mb-4">
          <Cross1Icon className="w-8 h-8 text-error" />
        </div>
        <p className="text-error text-lg font-medium mb-2">
          {t("blogFeed.error.title", "Virhe ladattaessa postauksia")}
        </p>
        <p className="text-white-600 text-sm">{error.message}</p>
      </div>
    );
  }

  const postCount = filteredPosts.length;
  const showNavigation = postCount > 1;

  return (
    <div className="w-full" style={{ touchAction: "pan-y" }}>
      {showFilters && (
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-md">
            <MagnifyingGlassIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white-500"
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder={t(
                "blogFeed.searchPlaceholder",
                "Etsi postauksia...",
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full bg-backgroundDark text-white-300
                pl-12 pr-12 py-3.5
                rounded-xl
                border border-brown-700/50
                outline-none
                focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                placeholder:text-white-600
                transition-all duration-200
              "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white-500 hover:text-white-300 transition-colors"
                aria-label={t("blogFeed.clearSearch", "Tyhjennä haku")}
              >
                <Cross1Icon width={16} height={16} />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedCategory(option.value)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${
                    selectedCategory === option.value
                      ? "bg-primary text-white-100 shadow-lg shadow-primary/20"
                      : "bg-backgroundDark text-white-400 hover:bg-brown-800 border border-brown-700/50 hover:border-brown-600"
                  }
                `}
              >
                {t(option.labelKey)}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brown-800/50 mb-4">
            <MagnifyingGlassIcon className="w-8 h-8 text-white-500" />
          </div>
          <p className="text-white-400 text-lg">
            {searchQuery || selectedCategory !== "all"
              ? t(
                  "blogFeed.noResultsFiltered",
                  "Hakuehdoilla ei löytynyt postauksia.",
                )
              : t("blogFeed.noPosts", "Ei vielä julkaistuja postauksia.")}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Layout: Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post._id}
                post={post}
                onReadMore={handleReadMore}
              />
            ))}
          </div>

          {/* Mobile Layout: Card deck with swipe, arrows below */}
          <div className="md:hidden flex flex-col items-center gap-4">
            {/* Card Stack - Large on mobile */}
            <div
              className="relative w-full max-w-md h-[480px] touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "none" }}
            >
              {filteredPosts.map((post, index) => {
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
                      zIndex: filteredPosts.length - Math.abs(offset),
                      opacity: offset === 0 ? 1 : 0.6 - Math.abs(offset) * 0.2,
                      pointerEvents: offset === 0 ? "auto" : "none",
                    }}
                  >
                    <BlogPostCard post={post} onReadMore={handleReadMore} />
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows Below - Small on mobile */}
            {showNavigation && (
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={goToPrev}
                  disabled={activeIndex === 0}
                  className={`
                    p-2 rounded-lg transition-all duration-200 flex-shrink-0
                    ${
                      activeIndex === 0
                        ? "opacity-20 cursor-not-allowed"
                        : "bg-brown-700/70 hover:bg-primary/80 text-white-300 hover:text-white-100 active:scale-95"
                    }
                  `}
                  aria-label={t("blogFeed.navigation.previous", "Edellinen")}
                >
                  <ChevronLeftIcon width={32} height={32} />
                </button>

                <button
                  onClick={goToNext}
                  disabled={activeIndex === postCount - 1}
                  className={`
                    p-2 rounded-lg transition-all duration-200 flex-shrink-0
                    ${
                      activeIndex === postCount - 1
                        ? "opacity-20 cursor-not-allowed"
                        : "bg-brown-700/70 hover:bg-primary/80 text-white-300 hover:text-white-100 active:scale-95"
                    }
                  `}
                  aria-label={t("blogFeed.navigation.next", "Seuraava")}
                >
                  <ChevronRightIcon width={32} height={32} />
                </button>
              </div>
            )}

            {/* Swipe hint */}
            <p className="text-center text-white-600 text-sm">
              {t("blogFeed.swipeHint", "← Pyyhkäise kortteja →")}
            </p>

            {/* Pagination Dots */}
            {showNavigation && (
              <div className="flex justify-center gap-2 mt-2">
                {filteredPosts.map((_, idx) => (
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
                    aria-label={t("blogFeed.navigation.goToPost", {
                      number: idx + 1,
                    })}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
