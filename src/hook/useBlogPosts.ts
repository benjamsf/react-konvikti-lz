import { useQuery } from "react-query";
import { sanityClient } from "../lib/sanityClient";
import type { BlogPost, BlogCategory } from "../types/blog";

const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  author,
  category,
  coverImage,
  excerpt,
  content,
  tags,
  publishedAt
}`;

const POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  author,
  category,
  coverImage,
  excerpt,
  content,
  tags,
  publishedAt
}`;

const POSTS_BY_CATEGORY_QUERY = `*[_type == "blogPost" && category == $category] | order(publishedAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  author,
  category,
  coverImage,
  excerpt,
  content,
  tags,
  publishedAt
}`;

async function fetchPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(POSTS_QUERY);
}

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
}

async function fetchPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  return sanityClient.fetch(POSTS_BY_CATEGORY_QUERY, { category });
}

export function useBlogPosts() {
  return useQuery<BlogPost[], Error>({
    queryKey: ["blogPosts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBlogPost(slug: string) {
  return useQuery<BlogPost | null, Error>({
    queryKey: ["blogPost", slug],
    queryFn: () => fetchPostBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogPostsByCategory(category: BlogCategory) {
  return useQuery<BlogPost[], Error>({
    queryKey: ["blogPosts", category],
    queryFn: () => fetchPostsByCategory(category),
    staleTime: 1000 * 60 * 5,
  });
}
