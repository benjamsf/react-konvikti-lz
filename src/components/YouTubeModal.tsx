import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
}

export function YouTubeModal({
  isOpen,
  onClose,
  videoId,
  title = "Video",
}: YouTubeModalProps) {
  // Extract video ID if full URL is provided
  const extractVideoId = (idOrUrl: string): string => {
    // If it's already just an ID (no slashes or special chars)
    if (/^[a-zA-Z0-9_-]{11}$/.test(idOrUrl)) {
      return idOrUrl;
    }

    // Try to extract from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = idOrUrl.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return idOrUrl;
  };

  const actualVideoId = extractVideoId(videoId);
  const embedUrl = `https://www.youtube.com/embed/${actualVideoId}?autoplay=1&rel=0`;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] animate-in fade-in-0" />
        <Dialog.Content
          className="
            fixed inset-4 md:inset-8 lg:inset-16
            z-[60]
            flex flex-col
            bg-backgroundDark
            rounded-2xl
            border border-brown-700/50
            shadow-2xl
            overflow-hidden
            animate-in fade-in-0 zoom-in-95
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-brown-700/50 flex-shrink-0">
            <Dialog.Title className="text-white-200 font-medium truncate pr-4">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="p-2 rounded-lg text-white-400 hover:text-white-200 hover:bg-brown-700/50 transition-colors"
                aria-label="Sulje"
              >
                <Cross2Icon width={20} height={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Video Container */}
          <div className="flex-1 min-h-0 p-2 md:p-4">
            <div className="relative w-full h-full">
              <iframe
                src={isOpen ? embedUrl : ""}
                title={title}
                className="absolute inset-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
