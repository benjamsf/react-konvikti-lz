import { useState, useCallback } from "react";
import type { GallerySlide } from "../components/ImageSlideModal";

interface UseImageSlideModalReturn {
  isOpen: boolean;
  currentSlide: number;
  openModal: (slideIndex?: number) => void;
  closeModal: () => void;
}

export function useImageSlideModal(): UseImageSlideModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openModal = useCallback((slideIndex = 0) => {
    setCurrentSlide(slideIndex);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    currentSlide,
    openModal,
    closeModal,
  };
}

// Re-export GallerySlide type for convenience
export type { GallerySlide };