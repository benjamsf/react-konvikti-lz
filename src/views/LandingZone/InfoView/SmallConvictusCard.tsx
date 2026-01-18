import { useState } from "react";
import { LargeCard } from "../../../components/LargeCard";
import { Button } from "../../../components/Button";
import { SlideModal } from "../../../components/SlideModal";
import trooper from "../../../assets/heroimages/hero3.jpeg";
import { useTranslation, Trans } from "react-i18next";
import enSlide6 from "../../../assets/decks/en/investors/index.html?raw";

export function SmallConvictusCard() {
  const { t } = useTranslation();

  // State to manage modals
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const slideData = {
    1: { en: enSlide6 },
  };

  // Handlers for modals

  const handleInternetClick = () => setActiveModal(1);

  return (
    <div>
      <LargeCard
        image={trooper}
        title={<>{t("smallConvictusCard.title")}</>}
        details={<Trans i18nKey="smallConvictusCard.details" />}
      >
        {/* Button 1 */}
        <Button
          type="button"
          styling="min-h-[60px]"
          variant={{ color: "blackGrey", width: "auto" }}
          onClick={handleInternetClick}
        >
          {t("smallConvictusCard.Button1")}
        </Button>
      </LargeCard>

      {/* Render SlideModals */}
      {Object.entries(slideData).map(([id, { en }]) => (
        <SlideModal
          key={id}
          enSlide={en}
          open={activeModal === parseInt(id)}
          onClose={() => setActiveModal(null)}
        />
      ))}
    </div>
  );
}
