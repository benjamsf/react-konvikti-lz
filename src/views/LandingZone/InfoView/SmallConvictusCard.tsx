import { useState } from "react";
import { LargeCard } from "../../../components/LargeCard";
import { Button } from "../../../components/Button";
import {
  ImageSlideModal,
  type GallerySlide,
} from "../../../components/ImageSlideModal";
import trooper from "../../../assets/heroimages/hero3.jpeg";
import { useTranslation, Trans } from "react-i18next";

import slide1 from "../../../assets/heroimages/hero5.jpeg";
import slide2 from "../../../assets/heroimages/hero6.jpeg";

// Define the slides for the gallery
const GALLERY_SLIDES: GallerySlide[] = [
  {
    image: slide1,
    title: "We're going to have an introduction of Pikku-Konvikti here.",
    description: "For the moment, we got placeholders in place.",
  },
  {
    image: slide2,
    title: "We're going to have an introduction of Pikku-Konvikti here.",
    description: "For the moment, we got placeholders in place.",
  },
];

export function SmallConvictusCard() {
  const { t } = useTranslation();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <LargeCard
        image={trooper}
        title={<>{t("smallConvictusCard.title")}</>}
        details={<Trans i18nKey="smallConvictusCard.details" />}
      >
        <Button
          type="button"
          styling="min-h-[60px]"
          variant={{ color: "blackGrey", width: "auto" }}
          onClick={() => setIsGalleryOpen(true)}
        >
          {t("smallConvictusCard.Button1")}
        </Button>
      </LargeCard>

      <ImageSlideModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        slides={GALLERY_SLIDES}
      />
    </>
  );
}
