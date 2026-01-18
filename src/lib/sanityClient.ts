/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

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

// Use a generic type that works with Sanity image objects
type SanityImageSource = {
  asset?: { _ref?: string; _id?: string };
  _ref?: string;
  _id?: string;
};

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
