import React from "react";
import { Button } from "../../../components/Button";
import { InfoModal } from "../../../components/InfoModal";
import { Trans, useTranslation } from "react-i18next";

interface DriveModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const DriveModal: React.FC<DriveModalProps> = ({
  open,
  onClose,
  onProceed,
}) => {
  const { t } = useTranslation();

  return (
    <InfoModal open={open} onClose={onClose}>
      <div className="text-center text-white">
        <h2 className="text-xl font-bold mb-4">{t("driveModal.title")}</h2>
        <p className="text-lg mb-6">
          <Trans i18nKey="driveModal.message">
            You are about to leave this site and open a Google Drive
            collaboration space.
            <br />
            You'll need a <strong>Google (G-Suite) account</strong> for it.
            <br />
            <ul>
              <li>
                NOTE: If you don't have access already, the link opens in an
                <strong>access request</strong>.
              </li>
              <li>Write a short note to the admin to gain access.</li>
            </ul>
          </Trans>
        </p>
      </div>
      <div className="flex justify-center gap-6">
        <Button
          type="button"
          variant={{ color: "error", width: "auto" }}
          styling="px-8 py-3 text-base font-semibold"
          onClick={onClose}
        >
          {t("driveModal.cancel")}
        </Button>
        <Button
          type="button"
          variant={{ color: "blackGrey", width: "auto" }}
          styling="px-8 py-3 text-base font-semibold"
          onClick={onProceed}
        >
          {t("driveModal.proceed")}
        </Button>
      </div>
    </InfoModal>
  );
};
