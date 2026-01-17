import type { BlogPost } from "../../types/blog";
import { urlFor } from "../../lib/sanityClient";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore?: (post: BlogPost) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  blog: "Blogi",
  news: "Uutiset",
  announcement: "Tiedote",
  event: "Tapahtuma",
};

const CATEGORY_COLORS: Record<string, string> = {
  blog: "bg-primary",
  news: "bg-success",
  announcement: "bg-error",
  event: "bg-purple-600",
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function BlogPostCard({ post, onReadMore }: BlogPostCardProps) {
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(400).height(250).url()
    : null;

  return (
    <article className="bg-backgroundLight rounded-lg overflow-hidden border border-outlineLight transition-transform hover:scale-[1.02] flex flex-col">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span
              className={`px-2 py-1 text-xs font-medium text-white rounded ${
                CATEGORY_COLORS[post.category] ?? "bg-gray-600"
              }`}
            >
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          </div>
        </div>
      )}

      {!imageUrl && (
        <div className="relative pt-10 px-4">
          <div className="absolute top-2 left-2">
            <span
              className={`px-2 py-1 text-xs font-medium text-white rounded ${
                CATEGORY_COLORS[post.category] ?? "bg-gray-600"
              }`}
            >
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          </div>
        </div>
      )}

      <div className={`p-4 flex flex-col flex-grow ${!imageUrl ? "" : ""}`}>
        <h3 className="font-bold text-white text-xl mb-2 line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-textLight text-sm mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <PersonIcon width={12} height={12} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon width={12} height={12} />
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-background rounded text-gray-400"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-500">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {onReadMore && (
          <button
            onClick={() => onReadMore(post)}
            className="mt-4 text-primary hover:text-primary-400 text-sm font-medium transition-colors text-left"
          >
            Lue lisää →
          </button>
        )}
      </div>
    </article>
  );
}
