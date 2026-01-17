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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-error text-lg">
          Virhe ladattaessa postauksia. Yritä myöhemmin uudelleen.
        </p>
        <p className="text-gray-500 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {showFilters && (
        <div className="mb-6 space-y-4">
          <div className="relative">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder="Etsi postauksia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-backgroundLight text-white pl-10 pr-10 py-3 rounded-lg border border-outlineLight outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Cross1Icon width={16} height={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedCategory(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === option.value
                    ? "bg-primary text-white"
                    : "bg-backgroundLight text-textLight hover:bg-gray-700 border border-outlineLight"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
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
