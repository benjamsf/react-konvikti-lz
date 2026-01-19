import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface CollapsibleRulesCardProps {
  title: string;
  content?: PortableTextBlock[];
  lastUpdated?: string;
  isLoading?: boolean;
  defaultOpen?: boolean;
}

export function CollapsibleRulesCard({
  title,
  content,
  lastUpdated,
  isLoading = false,
  defaultOpen = false,
}: CollapsibleRulesCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (isLoading) {
    return (
      <div className="bg-backgroundDark rounded-2xl border border-brown-800/50 overflow-hidden animate-pulse">
        <div className="px-6 py-5">
          <div className="h-6 bg-brown-800/50 rounded w-1/3" />
        </div>
      </div>
    );
  }

  if (!content || content.length === 0) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fi-FI", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-backgroundDark rounded-2xl border border-brown-800/50 overflow-hidden">
      {/* Header - clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full px-6 py-5
          flex items-center justify-between gap-4
          text-left
          hover:bg-brown-800/20
          transition-colors
          group
        "
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-primary/20 text-primary">
            <FileTextIcon width={24} height={24} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-title font-semibold text-white-200">
              {title}
            </h3>
            {lastUpdated && (
              <p className="text-white-500 text-sm mt-1">
                Päivitetty: {formatDate(lastUpdated)}
              </p>
            )}
          </div>
        </div>
        <div className="p-2 rounded-lg text-white-400 group-hover:text-white-200 group-hover:bg-brown-700/50 transition-all">
          {isOpen ? (
            <ChevronUpIcon width={24} height={24} />
          ) : (
            <ChevronDownIcon width={24} height={24} />
          )}
        </div>
      </button>

      {/* Content - collapsible with proper containment */}
      {isOpen && (
        <div className="border-t border-brown-800/50">
          <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
            <div className="prose prose-invert prose-sm max-w-none">
              <PortableText
                value={content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-white-400 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-title font-semibold text-white-200 mt-8 mb-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-title font-medium text-white-300 mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc list-inside text-white-400 space-y-2 mb-4 ml-4">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside text-white-400 space-y-2 mb-4 ml-4">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="text-white-400">{children}</li>
                    ),
                    number: ({ children }) => (
                      <li className="text-white-400">{children}</li>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white-200">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
