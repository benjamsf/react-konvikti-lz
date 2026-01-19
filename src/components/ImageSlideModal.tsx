import { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Cross2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

export interface GallerySlide {
  image: string;
  title?: string;
  description?: string;
}

interface ImageSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: GallerySlide[];
  initialSlide?: number;
}

export function ImageSlideModal({
  isOpen,
  onClose,
  slides,
  initialSlide = 0,
}: ImageSlideModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialSlide);
    }
  }, [isOpen, initialSlide]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToPrev, goToNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) goToNext();
    if (distance < -minSwipeDistance) goToPrev();
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const hasMultipleSlides = slides.length > 1;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-70 z-40" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg relative w-full max-w-[95vw] md:max-w-[90%] h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header with title and close */}
            <div className="flex-shrink-0 flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {hasMultipleSlides && (
                  <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {slides.length}
                  </span>
                )}
                {currentSlide.title && (
                  <h2 className="text-white text-xl font-bold">
                    {currentSlide.title}
                  </h2>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Cross2Icon width={24} height={24} />
              </button>
            </div>

            {/* Image container - takes remaining space */}
            <div
              className="flex-1 relative flex items-center justify-center overflow-hidden min-h-0 px-4"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Navigation arrows */}
              {hasMultipleSlides && (
                <>
                  <button
                    onClick={goToPrev}
                    disabled={currentIndex === 0}
                    className={`
                      absolute left-4 top-1/2 -translate-y-1/2 z-10
                      p-3 rounded-full
                      transition-all duration-200
                      ${
                        currentIndex === 0
                          ? "opacity-20 cursor-not-allowed"
                          : "bg-black/50 hover:bg-black/70 text-white active:scale-95"
                      }
                    `}
                    aria-label="Edellinen"
                  >
                    <ChevronLeftIcon width={32} height={32} />
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={currentIndex === slides.length - 1}
                    className={`
                      absolute right-4 top-1/2 -translate-y-1/2 z-10
                      p-3 rounded-full
                      transition-all duration-200
                      ${
                        currentIndex === slides.length - 1
                          ? "opacity-20 cursor-not-allowed"
                          : "bg-black/50 hover:bg-black/70 text-white active:scale-95"
                      }
                    `}
                    aria-label="Seuraava"
                  >
                    <ChevronRightIcon width={32} height={32} />
                  </button>
                </>
              )}

              {/* Image - constrained to fit */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title || `Kuva ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
                draggable={false}
              />
            </div>

            {/* Footer with description and dots */}
            <div className="flex-shrink-0 p-4">
              {currentSlide.description && (
                <p className="text-white/80 text-center mb-4 max-w-2xl mx-auto">
                  {currentSlide.description}
                </p>
              )}

              {hasMultipleSlides && (
                <div className="flex justify-center gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`
                        h-2 rounded-full transition-all duration-200
                        ${
                          idx === currentIndex
                            ? "bg-primary w-6"
                            : "bg-white/30 hover:bg-white/50 w-2"
                        }
                      `}
                      aria-label={`Kuva ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
