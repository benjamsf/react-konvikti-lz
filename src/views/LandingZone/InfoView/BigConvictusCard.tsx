import { useState } from "react";
import { LargeCard } from "../../../components/LargeCard";
import { Button } from "../../../components/Button";
import {
  ImageSlideModal,
  type GallerySlide,
} from "../../../components/ImageSlideModal";
import heroImage from "../../../assets/heroimages/hero9.jpeg";
import { useTranslation, Trans } from "react-i18next";

import slide1 from "../../../assets/heroimages/hero2.jpeg";
import slide2 from "../../../assets/heroimages/hero3.jpeg";
import slide3 from "../../../assets/heroimages/hero4.jpeg";
import slide4 from "../../../assets/heroimages/hero5.jpeg";
import slide5 from "../../../assets/heroimages/hero6.jpeg";

const GALLERY_SLIDES: GallerySlide[] = [
  {
    image: slide1,
    title: "We're going to have an introduction of Iso-Konvikti here.",
    description: "For the moment, we got placeholders in place.",
  },
  {
    image: slide2,
    title: "We're going to have an introduction of Iso-Konvikti here.",
    description: "For the moment, we got placeholders in place.",
  },
  {
    image: slide3,
    title: "We're going to have an introduction of Iso-Konvikti here.",
    description: "For the moment, we got placeholders in place.",
  },
  {
    image: slide4,
    title: "We're going to have an introduction of Iso-Konvikti here.",
    description: "For the moment, we got placeholders in place.",
  },
  {
    image: slide5,
    title: "We're going to have an introduction of Iso-Konvikti here.",
    description: "For the moment, we got placeholders in place.",
  },
];

export function BigConvictusCard() {
  const { t } = useTranslation();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <LargeCard
        image={heroImage}
        title={<>{t("bigConvictusCard.title")}</>}
        details={<Trans i18nKey="bigConvictusCard.details" />}
      >
        <Button
          type="button"
          styling="min-h-[60px]"
          variant={{ color: "blackGrey", width: "auto" }}
          onClick={() => setIsGalleryOpen(true)}
        >
          {t("bigConvictusCard.Button1")}
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
