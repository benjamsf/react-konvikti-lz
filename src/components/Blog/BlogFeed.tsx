import { useState, useMemo } from "react";
import { useBlogPosts } from "../../hook/useBlogPosts";
import { BlogPostCard } from "./BlogPostCard";
import { BlogPostDetail } from "./BlogPostDetail";
import type { BlogPost, BlogCategory } from "../../types/blog";
import { MagnifyingGlassIcon, Cross1Icon } from "@radix-ui/react-icons";

interface BlogFeedProps {
  showFilters?: boolean;
  maxPosts?: number;
}

const CATEGORY_OPTIONS: { value: BlogCategory | "all"; label: string }[] = [
  { value: "all", label: "Kaikki" },
  { value: "blog", label: "Blogi" },
  { value: "news", label: "Uutiset" },
  { value: "announcement", label: "Tiedotteet" },
  { value: "event", label: "Tapahtumat" },
  { value: "asukashaku", label: "Asukashaut" },
];

export function BlogFeed({ showFilters = true, maxPosts }: BlogFeedProps) {
  const { data: posts, isLoading, error } = useBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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
          (post.tags?.some((tag) => tag.toLowerCase().includes(query)) ?? false)
      );
    }

    if (maxPosts) {
      result = result.slice(0, maxPosts);
    }

    return result;
  }, [posts, selectedCategory, searchQuery, maxPosts]);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
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
          Virhe ladattaessa postauksia
        </p>
        <p className="text-white-600 text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
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
              placeholder="Etsi postauksia..."
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
                  ${selectedCategory === option.value
                    ? "bg-primary text-white-100 shadow-lg shadow-primary/20"
                    : "bg-backgroundDark text-white-400 hover:bg-brown-800 border border-brown-700/50 hover:border-brown-600"
                  }
                `}
              >
                {option.label}
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
              ? "Hakuehdoilla ei löytynyt postauksia."
              : "Ei vielä julkaistuja postauksia."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogPostCard
              key={post._id}
              post={post}
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      )}
    </div>
  );
}