import { useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { BlogPost, SanityImageWithMeta } from "../../types/blog";
import { urlFor } from "../../lib/sanityClient";
import {
  ArrowLeftIcon,
  CalendarIcon,
  PersonIcon,
  Share1Icon,
} from "@radix-ui/react-icons";

interface BlogPostDetailProps {
  post: BlogPost;
  onClose: () => void;
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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

interface ImageComponentProps {
  value: SanityImageWithMeta;
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: ImageComponentProps) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-6">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-gray-400 text-sm mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-textLight mt-6 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-400 my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-textLight leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-primary hover:text-primary-400 underline"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-textLight space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-textLight space-y-2">
        {children}
      </ol>
    ),
  },
};

export function BlogPostDetail({ post, onClose }: BlogPostDetailProps) {
  const [copied, setCopied] = useState(false);

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(600).url()
    : null;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  return (
    <article className="max-w-4xl mx-auto">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-textLight hover:text-white mb-6 transition-colors"
      >
        <ArrowLeftIcon width={20} height={20} />
        <span>Takaisin</span>
      </button>

      {coverImageUrl && (
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 text-sm font-medium text-white rounded ${
              CATEGORY_COLORS[post.category] ?? "bg-gray-600"
            }`}
          >
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-400">
          <span className="flex items-center gap-2">
            <PersonIcon width={16} height={16} />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <CalendarIcon width={16} height={16} />
            {formatDate(post.publishedAt)}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 hover:text-white transition-colors ml-auto"
            title="Jaa"
          >
            <Share1Icon width={16} height={16} />
            <span>{copied ? "Kopioitu!" : "Jaa"}</span>
          </button>
        </div>
      </header>

      <div className="mb-8">
        <PortableText value={post.content} components={portableTextComponents} />
      </div>

      {post.tags && post.tags.length > 0 && (
        <footer className="pt-6 border-t border-outlineLight">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-backgroundLight rounded-lg text-gray-400 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
