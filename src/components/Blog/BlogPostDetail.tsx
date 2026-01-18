import { useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { BlogPost, SanityImageWithMeta, SanityImage, ImageSize } from "../../types/blog";
import { urlFor } from "../../lib/sanityClient";
import {
  ArrowLeftIcon,
  CalendarIcon,
  PersonIcon,
  Share1Icon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { ImageGallery } from "./ImageGallery";

const GOOGLE_APPLICATION_FORM = import.meta.env.VITE_GOOGLE_APPLICATION_FORM || "";

interface BlogPostDetailProps {
  post: BlogPost;
  onClose: () => void;
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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

interface ImageComponentProps {
  value: SanityImageWithMeta;
}

interface GalleryImage extends SanityImage {
  caption?: string;
  alt?: string;
}

interface GalleryComponentProps {
  value: {
    images: GalleryImage[];
    layout: "grid-2" | "grid-3" | "carousel";
    caption?: string;
  };
}

const IMAGE_SIZE_CLASSES: Record<ImageSize, string> = {
  small: "max-w-sm mx-auto",
  medium: "max-w-xl mx-auto",
  large: "w-full",
};

const IMAGE_WIDTHS: Record<ImageSize, number> = {
  small: 400,
  medium: 600,
  large: 900,
};

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: ImageComponentProps) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const size: ImageSize = value.size || "large";
      const sizeClass = IMAGE_SIZE_CLASSES[size];
      const width = IMAGE_WIDTHS[size];
      
      return (
        <figure className={`my-8 ${sizeClass}`}>
          <img
            src={urlFor(value).width(width).url()}
            alt={value.alt || ""}
            className="rounded-xl w-full shadow-lg"
          />
          {value.caption && (
            <figcaption className="text-center text-white-500 text-sm mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    gallery: ({ value }: GalleryComponentProps) => {
      if (!value?.images || value.images.length === 0) {
        return null;
      }
      return (
        <ImageGallery
          images={value.images}
          layout={value.layout || "grid-2"}
          caption={value.caption}
        />
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-title font-semibold text-white-200 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-title font-medium text-white-300 mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-white-400 my-6 bg-brown-800/30 rounded-r-lg pr-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-white-400 leading-relaxed mb-5">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-primary-300 hover:text-primary-200 underline underline-offset-2 transition-colors"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-white-200">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 text-white-400 space-y-2 marker:text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 text-white-400 space-y-2 marker:text-primary">
        {children}
      </ol>
    ),
  },
};

export function BlogPostDetail({ post, onClose }: BlogPostDetailProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1400).height(600).url()
    : null;

  const isAsukashaku = post.category === "asukashaku";
  const isHakuOpen = post.hakuStatus === "open";

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
      {/* Back Button */}
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 text-white-400 hover:text-white-200 mb-8 transition-colors group"
      >
        <ArrowLeftIcon 
          width={20} 
          height={20} 
          className="transition-transform group-hover:-translate-x-1" 
        />
        <span>Takaisin</span>
      </button>

      {/* Cover Image */}
      {coverImageUrl && (
        <div className="relative h-64 md:h-[400px] rounded-2xl overflow-hidden mb-10 shadow-2xl">
          <img
            src={coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-backgroundDark/60 to-transparent" />
        </div>
      )}

      {/* Header */}
      <header className="mb-10">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span
            className={`
              px-4 py-1.5 text-sm font-semibold rounded-full
              ${CATEGORY_COLORS[post.category] ?? "bg-brown-700 text-white-300"}
            `}
          >
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
          
          {isAsukashaku && (
            <span
              className={`
                px-4 py-1.5 text-sm font-bold rounded-full
                inline-flex items-center gap-2
                ${isHakuOpen 
                  ? "bg-success text-white-100" 
                  : "bg-brown-600 text-white-400"
                }
              `}
            >
              <span className={`w-2 h-2 rounded-full ${isHakuOpen ? "bg-white-100 animate-pulse" : "bg-white-500"}`} />
              {isHakuOpen ? "Haku käynnissä!" : "Haku päättynyt"}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-title font-bold text-white-200 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-white-500">
          <span className="inline-flex items-center gap-2">
            <PersonIcon width={18} height={18} />
            <span>{post.author}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarIcon width={18} height={18} />
            <span>{formatDate(post.publishedAt)}</span>
          </span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 hover:text-white-200 transition-colors ml-auto"
            title="Jaa"
          >
            <Share1Icon width={18} height={18} />
            <span>{copied ? "Kopioitu!" : "Jaa"}</span>
          </button>
        </div>
      </header>

      {/* Asukashaku Application CTA */}
      {isAsukashaku && isHakuOpen && GOOGLE_APPLICATION_FORM && (
        <div className="mb-10 p-6 bg-success/10 border border-success/30 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white-200 font-semibold text-lg mb-1">
                {t("asukashaku.applyTitle", "Kiinnostuitko? Hae mukaan!")}
              </h3>
              <p className="text-white-500 text-sm">
                {t("asukashaku.applyDescription", "Haku on auki – täytä hakulomake ja liity yhteisöömme.")}
              </p>
            </div>
            <a
              href={GOOGLE_APPLICATION_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 
                px-6 py-3 
                bg-success hover:bg-success-700 
                text-white-100 font-semibold 
                rounded-xl 
                transition-all duration-200
                hover:scale-105
                flex-shrink-0
              "
            >
              {t("asukashaku.applyButton", "Täytä hakemus")}
              <ExternalLinkIcon width={18} height={18} />
            </a>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-10">
        <PortableText value={post.content} components={portableTextComponents} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <footer className="pt-8 border-t border-brown-700/50">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-brown-800/50 hover:bg-brown-700/50 rounded-full text-white-400 text-sm transition-colors"
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