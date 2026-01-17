import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Replace these values after creating your Sanity project
const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "YOUR_PROJECT_ID";
const DATASET = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
