import { useQuery } from "@tanstack/react-query";
import { client, urlFor } from "../lib/sanity";

// Types
export interface SanityStaffMember {
  _id: string;
  name: string;
  title: string;
  description?: string;
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
  role: string;
  order: number;
  isActive: boolean;
  year?: string;
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

// Queries
const STAFF_QUERY = `*[_type == "staffMember" && isActive == true] | order(order asc) {
  _id,
  name,
  title,
  description,
  image,
  order,
  isActive
}`;

const BOARD_QUERY = `*[_type == "boardMember" && isActive == true] | order(order asc) {
  _id,
  name,
  role,
  order,
  isActive,
  year
}`;

// Fetch functions
async function fetchStaffMembers(): Promise<StaffMember[]> {
  const data = await client.fetch<SanityStaffMember[]>(STAFF_QUERY);
  
  return data.map((member) => ({
    _id: member._id,
    name: member.name,
    title: member.title,
    description: member.description,
    image: member.image ? urlFor(member.image).width(400).height(400).url() : undefined,
  }));
}

async function fetchBoardMembers(): Promise<BoardMember[]> {
  const data = await client.fetch<SanityBoardMember[]>(BOARD_QUERY);
  
  return data.map((member) => ({
    _id: member._id,
    name: member.name,
    role: member.role,
  }));
}

// Hooks
export function useStaffMembers() {
  return useQuery({
    queryKey: ["staffMembers"],
    queryFn: fetchStaffMembers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBoardMembers() {
  return useQuery({
    queryKey: ["boardMembers"],
    queryFn: fetchBoardMembers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
