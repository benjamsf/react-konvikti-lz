import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityImageWithMeta extends SanityImage {
  caption?: string;
  alt?: string;
  size?: ImageSize;
}

export type ImageSize = "small" | "medium" | "large";

export type BlogCategory = "blog" | "news" | "announcement" | "event" | "asukashaku";

export type HakuStatus = "open" | "closed";

export interface BlogPost {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  author: string;
  category: BlogCategory;
  hakuStatus?: HakuStatus;
  coverImage?: SanityImage;
  excerpt?: string;
  content: PortableTextBlock[];
  tags?: string[];
  publishedAt: string;
}

export interface BlogPostFilters {
  category?: BlogCategory;
  searchQuery?: string;
}