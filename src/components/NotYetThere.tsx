import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

interface NotYetThereProps {
  onClose: () => void; // Pass the modal close function
}

export const NotYetThere: React.FC<NotYetThereProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="text-center text-white p-6">
      <h2 className="text-xl font-bold mb-4">{t("notYetThere.title")}</h2>
      <p className="text-lg mb-6">{t("notYetThere.message")}</p>
      <div className="flex justify-center">
        <Button
          type="button"
          variant={{ color: "error", width: "auto" }}
          styling="px-8 py-3 text-base font-semibold"
          onClick={onClose} // Closes the modal
        >
          {t("close")}
        </Button>
      </div>
    </div>
  );
};
