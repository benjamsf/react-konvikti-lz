import { useQuery } from "react-query";
import { sanityClient, urlFor } from "../lib/sanityClient";
import type { PortableTextBlock } from "@portabletext/types";

// Supported languages
export type SupportedLanguage = "fi" | "en";

// Types from Sanity
export interface SanityStaffMember {
  _id: string;
  name: string;
  title_fi: string;
  title_en?: string;
  description_fi?: string;
  description_en?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  order: number;
  isActive: boolean;
}

export interface SanityBoardMember {
  _id: string;
  name: string;
  role_fi: string;
  role_en?: string;
  order: number;
  isActive: boolean;
  year?: string;
}

export interface SanityOrganizationRules {
  _id: string;
  title_fi: string;
  title_en?: string;
  content_fi?: PortableTextBlock[];
  content_en?: PortableTextBlock[];
  lastUpdated?: string;
  isPublished: boolean;
}

// Transformed types for components
export interface StaffMember {
  _id: string;
  name: string;
  title: string;
  description?: string;
  image?: string;
}

export interface BoardMember {
  _id: string;
  name: string;
  role: string;
}

export interface OrganizationRules {
  _id: string;
  title: string;
  content?: PortableTextBlock[];
  lastUpdated?: string;
}

// Queries
const STAFF_QUERY = `*[_type == "staffMember" && isActive == true] | order(order asc) {
  _id,
  name,
  title_fi,
  title_en,
  description_fi,
  description_en,
  image,
  order,
  isActive
}`;

const BOARD_QUERY = `*[_type == "boardMember" && isActive == true] | order(order asc) {
  _id,
  name,
  role_fi,
  role_en,
  order,
  isActive,
  year
}`;

const RULES_QUERY = `*[_type == "organizationRules" && isPublished == true][0] {
  _id,
  title_fi,
  title_en,
  content_fi,
  content_en,
  lastUpdated,
  isPublished
}`;

// Fetch functions
async function fetchStaffMembers(language: SupportedLanguage): Promise<StaffMember[]> {
  const data = await sanityClient.fetch<SanityStaffMember[]>(STAFF_QUERY);
  
  return data.map((member) => ({
    _id: member._id,
    name: member.name,
    title: language === "en" && member.title_en ? member.title_en : member.title_fi,
    description: language === "en" && member.description_en ? member.description_en : member.description_fi,
    image: member.image ? urlFor(member.image).width(400).height(400).url() : undefined,
  }));
}

async function fetchBoardMembers(language: SupportedLanguage): Promise<BoardMember[]> {
  const data = await sanityClient.fetch<SanityBoardMember[]>(BOARD_QUERY);
  
  return data.map((member) => ({
    _id: member._id,
    name: member.name,
    role: language === "en" && member.role_en ? member.role_en : member.role_fi,
  }));
}

async function fetchOrganizationRules(language: SupportedLanguage): Promise<OrganizationRules | null> {
  const data = await sanityClient.fetch<SanityOrganizationRules | null>(RULES_QUERY);
  
  if (!data) return null;
  
  return {
    _id: data._id,
    title: language === "en" && data.title_en ? data.title_en : data.title_fi,
    content: language === "en" && data.content_en ? data.content_en : data.content_fi,
    lastUpdated: data.lastUpdated,
  };
}

// Hooks
export function useStaffMembers(language: SupportedLanguage = "fi") {
  return useQuery<StaffMember[], Error>({
    queryKey: ["staffMembers", language],
    queryFn: () => fetchStaffMembers(language),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBoardMembers(language: SupportedLanguage = "fi") {
  return useQuery<BoardMember[], Error>({
    queryKey: ["boardMembers", language],
    queryFn: () => fetchBoardMembers(language),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useOrganizationRules(language: SupportedLanguage = "fi") {
  return useQuery<OrganizationRules | null, Error>({
    queryKey: ["organizationRules", language],
    queryFn: () => fetchOrganizationRules(language),
    staleTime: 1000 * 60 * 10, // 10 minutes - rules don't change often
  });
}