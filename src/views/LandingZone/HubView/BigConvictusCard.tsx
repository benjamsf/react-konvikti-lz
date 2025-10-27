import { useState } from "react";
import { LargeCard } from "../../../components/LargeCard";
import { Button } from "../../../components/Button";
import { SlideModal } from "../../../components/SlideModal";
import trooper from "../../../assets/heroimages/hero2.jpeg";
import { useTranslation, Trans } from "react-i18next";
import enSlide6 from "../../../assets/decks/en/mentors/index.html?raw";

export function BigConvictusCard() {
  const { t } = useTranslation();

  // State to manage modals
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const slideData = {
    1: { en: enSlide6 },
  };

  // Handlers for modals

  const handleInternetClick = () => setActiveModal(1);
  const proceedToForm = () => {
    window.open(
      "https://docs.google.com/forms/d/1nZvXljd76vq-I7lQOfjTI5KhSQl_vtGFa0TKN8IbZs0/vievform",
    );
  };
  const handleOtherClick = (): void => proceedToForm();

  return (
    <div>
      <LargeCard
        image={trooper}
        title={<>{t("bigConvictusCard.title")}</>}
        details={<Trans i18nKey="bigConvictusCard.details" />}
      >
        {/* Button 1 */}
        <Button
          type="button"
          styling="min-h-[60px]"
          variant={{ color: "blackGrey", width: "auto" }}
          onClick={handleInternetClick}
        >
          {t("bigConvictusCard.Button1")}
        </Button>

        {/* Button 2 */}
        <Button
          type="button"
          styling="min-h-[60px]"
          variant={{ color: "blackGrey", width: "auto" }}
          onClick={handleOtherClick}
        >
          {t("bigConvictusCard.Button2")}
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
