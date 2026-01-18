import { useState } from "react";
import { urlFor } from "../../lib/sanityClient";
import type { SanityImage } from "../../types/blog";
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons";

interface GalleryImage extends SanityImage {
  caption?: string;
  alt?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  layout: "grid-2" | "grid-3" | "carousel";
  caption?: string;
}

export function ImageGallery({ images, layout, caption }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  const goToCarouselPrev = () => {
    setCarouselIndex(carouselIndex === 0 ? images.length - 1 : carouselIndex - 1);
  };

  const goToCarouselNext = () => {
    setCarouselIndex(carouselIndex === images.length - 1 ? 0 : carouselIndex + 1);
  };

  if (layout === "carousel") {
    return (
      <figure className="my-8">
        <div className="relative">
          {/* Main Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-brown-900">
            <img
              src={urlFor(images[carouselIndex]).width(900).url()}
              alt={images[carouselIndex].alt || ""}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openLightbox(carouselIndex)}
            />
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToCarouselPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-backgroundDark/80 hover:bg-primary/80 rounded-full text-white-300 transition-all"
                aria-label="Edellinen"
              >
                <ChevronLeftIcon width={24} height={24} />
              </button>
              <button
                onClick={goToCarouselNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-backgroundDark/80 hover:bg-primary/80 rounded-full text-white-300 transition-all"
                aria-label="Seuraava"
              >
                <ChevronRightIcon width={24} height={24} />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-backgroundDark/80 rounded-full text-white-400 text-sm">
            {carouselIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={`
                  flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden 
                  transition-all duration-200
                  ${idx === carouselIndex 
                    ? "ring-2 ring-primary opacity-100" 
                    : "opacity-50 hover:opacity-80"
                  }
                `}
              >
                <img
                  src={urlFor(img).width(100).height(100).url()}
                  alt={img.alt || ""}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Caption */}
        {(caption || images[carouselIndex].caption) && (
          <figcaption className="text-center text-white-500 text-sm mt-3 italic">
            {images[carouselIndex].caption || caption}
          </figcaption>
        )}

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        )}
      </figure>
    );
  }

  // Grid layout
  const gridCols = layout === "grid-3" ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <figure className="my-8">
      {caption && (
        <figcaption className="text-white-400 font-medium mb-3">{caption}</figcaption>
      )}
      
      <div className={`grid grid-cols-1 ${gridCols} gap-3`}>
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => openLightbox(idx)}
            className="relative aspect-square rounded-xl overflow-hidden bg-brown-900 group"
          >
            <img
              src={urlFor(img).width(400).height(400).url()}
              alt={img.alt || ""}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white-200 text-xs truncate">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </figure>
  );
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
        aria-label="Sulje"
      >
        <Cross1Icon width={24} height={24} />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Edellinen"
          >
            <ChevronLeftIcon width={32} height={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Seuraava"
          >
            <ChevronRightIcon width={32} height={32} />
          </button>
        </>
      )}

      {/* Image */}
      <div 
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={urlFor(currentImage).width(1400).url()}
          alt={currentImage.alt || ""}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        
        {/* Caption & Counter */}
        <div className="mt-4 text-center">
          {currentImage.caption && (
            <p className="text-white-300 text-sm mb-2">{currentImage.caption}</p>
          )}
          <p className="text-white-500 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}