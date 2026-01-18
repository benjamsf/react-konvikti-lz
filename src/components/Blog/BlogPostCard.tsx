import type { BlogPost } from "../../types/blog";
import { urlFor } from "../../lib/sanityClient";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore?: (post: BlogPost) => void;
  compact?: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  blog: "Blogi",
  news: "Uutiset",
  announcement: "Tiedote",
  event: "Tapahtuma",
  asukashaku: "Asukashaku",
};

const CATEGORY_COLORS: Record<string, string> = {
  blog: "bg-primary-600 text-white-200",
  news: "bg-success text-white-200",
  announcement: "bg-error text-white-200",
  event: "bg-primary text-white-200",
  asukashaku: "bg-brown-700 text-white-200",
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function BlogPostCard({ post, onReadMore, compact = false }: BlogPostCardProps) {
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(600).height(400).url()
    : null;

  const isAsukashaku = post.category === "asukashaku";
  const isHakuOpen = post.hakuStatus === "open";

  return (
    <article 
      className={`
        group relative bg-backgroundDark rounded-2xl overflow-hidden 
        border border-brown-800/50 
        transition-all duration-300 
        hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5
        hover:-translate-y-1
        flex flex-col
        ${compact ? "max-w-sm" : ""}
      `}
    >
      {/* Image Section */}
      <div className={`relative overflow-hidden ${compact ? "h-40" : "h-52"}`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brown-800 to-brown-900" />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-backgroundDark/90 via-backgroundDark/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`
              px-3 py-1.5 text-xs font-semibold rounded-full
              backdrop-blur-sm
              ${CATEGORY_COLORS[post.category] ?? "bg-brown-700 text-white-300"}
            `}
          >
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
        </div>

        {/* Asukashaku Status Badge */}
        {isAsukashaku && (
          <div className="absolute top-4 right-4">
            <span
              className={`
                px-3 py-1.5 text-xs font-bold rounded-full
                flex items-center gap-1.5
                ${isHakuOpen 
                  ? "bg-success/90 text-white-100 animate-pulse" 
                  : "bg-brown-600/90 text-white-400"
                }
              `}
            >
              <span className={`w-2 h-2 rounded-full ${isHakuOpen ? "bg-white-100" : "bg-white-500"}`} />
              {isHakuOpen ? "Haku käynnissä!" : "Haku päättynyt"}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-title text-xl font-semibold text-white-200 mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-white-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-white-600 mt-auto pt-4 border-t border-brown-800/50">
          <span className="flex items-center gap-1.5">
            <PersonIcon width={14} height={14} className="text-white-500" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarIcon width={14} height={14} className="text-white-500" />
            {formatDate(post.publishedAt)}
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs bg-brown-800/50 rounded-full text-white-500 hover:bg-brown-700/50 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-white-600">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Read More Link */}
        {onReadMore && (
          <button
            onClick={() => onReadMore(post)}
            className="mt-4 inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 text-sm font-medium transition-colors group/btn"
          >
            Lue lisää 
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
          </button>
        )}
      </div>
    </article>
  );
}