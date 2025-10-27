import React from "react";
import { useTranslation } from "react-i18next";
import { IframeModal } from "./IframeModal";

interface SlideModalProps {
  fiSlide?: string; // Optional Finnish slide content
  enSlide?: string; // Optional English slide content
  open: boolean;
  onClose: () => void;
}

export const SlideModal: React.FC<SlideModalProps> = ({
  fiSlide,
  enSlide,
  open,
  onClose,
}) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const currentLanguage = i18n.language; // Get the current language

  // Determine which slide to display based on language
  const slideContent = currentLanguage === "fi" && fiSlide ? fiSlide : enSlide;

  // Convert `raw` imported slide content into a Blob URL
  const blobUrl = slideContent
    ? URL.createObjectURL(new Blob([slideContent], { type: "text/html" }))
    : "";

  // Cleanup Blob URL when the modal is closed
  React.useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  return (
    <IframeModal
      iframeSrc={blobUrl}
      open={open}
      onClose={onClose}
      title={t("slideViewer")}
    />
  );
};
