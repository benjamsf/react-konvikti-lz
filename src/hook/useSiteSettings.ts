import { useQuery } from "react-query";
import { sanityClient } from "../lib/sanityClient";

// Supported languages
export type SupportedLanguage = "fi" | "en";

// Types from Sanity
interface SanitySiteSettings {
  _id: string;
  introVideo?: {
    youtubeUrl?: string;
    title_fi?: string;
    title_en?: string;
  };
  socialMedia?: {
    facebookUrl?: string;
    instagramUrl?: string;
    instagramHandle?: string;
  };
  contactEmail?: string;
}

// Transformed types for components
export interface IntroVideo {
  youtubeUrl: string;
  title: string;
}

export interface SocialMedia {
  facebookUrl?: string;
  instagramUrl?: string;
  instagramHandle?: string;
}

export interface SiteSettings {
  introVideo?: IntroVideo;
  socialMedia?: SocialMedia;
  contactEmail?: string;
}

// Query - singleton document
const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  introVideo,
  socialMedia,
  contactEmail
}`;

// Fetch function
async function fetchSiteSettings(
  language: SupportedLanguage,
): Promise<SiteSettings | null> {
  const data = await sanityClient.fetch<SanitySiteSettings | null>(
    SITE_SETTINGS_QUERY,
  );

  if (!data) return null;

  return {
    introVideo: data.introVideo?.youtubeUrl
      ? {
          youtubeUrl: data.introVideo.youtubeUrl,
          title:
            language === "en" && data.introVideo.title_en
              ? data.introVideo.title_en
              : data.introVideo.title_fi || "Esittelyvideo",
        }
      : undefined,
    socialMedia: data.socialMedia,
    contactEmail: data.contactEmail,
  };
}

// Hook
export function useSiteSettings(language: SupportedLanguage = "fi") {
  return useQuery<SiteSettings | null, Error>({
    queryKey: ["siteSettings", language],
    queryFn: () => fetchSiteSettings(language),
    staleTime: 1000 * 60 * 10, // 10 minutes - settings don't change often
  });
}

// Convenience hook for just the intro video
export function useIntroVideo(language: SupportedLanguage = "fi") {
  const { data, isLoading, error } = useSiteSettings(language);

  return {
    introVideo: data?.introVideo,
    isLoading,
    error,
  };
}
