import { InstagramLogoIcon } from "@radix-ui/react-icons";

// Facebook icon
function FacebookIcon({ width = 24, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface SocialLinksProps {
  facebookUrl?: string;
  instagramUrl?: string;
  className?: string;
  iconSize?: number;
}

export function SocialLinks({
  facebookUrl = "https://www.facebook.com/konvikti",
  instagramUrl = "https://www.instagram.com/konvikti/",
  className = "",
  iconSize = 24,
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {facebookUrl && (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-brown-800/50 text-white-400 hover:text-white-100 hover:bg-primary/50 transition-all duration-200"
          aria-label="Facebook"
        >
          <FacebookIcon width={iconSize} height={iconSize} />
        </a>
      )}
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-brown-800/50 text-white-400 hover:text-white-100 hover:bg-primary/50 transition-all duration-200"
          aria-label="Instagram"
        >
          <InstagramLogoIcon width={iconSize} height={iconSize} />
        </a>
      )}
    </div>
  );
}