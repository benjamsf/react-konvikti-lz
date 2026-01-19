import React from "react";
import { Button } from "../../../components/Button";
import { InfoModal } from "../../../components/InfoModal";
import { Trans, useTranslation } from "react-i18next";

interface GithubModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({
  open,
  onClose,
  onProceed,
}) => {
  const { t } = useTranslation();

  return (
    <InfoModal open={open} onClose={onClose}>
      <div className="text-center text-white">
        <h2 className="text-xl font-bold mb-4">{t("githubModal.title")}</h2>
        <p className="text-lg mb-6">
          <Trans i18nKey="githubModal.message">
            You are about to leave this site and open a GitHub repository.
            <br />
            Please make sure you have the necessary permissions to access this
            repository.
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
          {t("githubModal.cancel")}
        </Button>
        <Button
          type="button"
          variant={{ color: "blackGrey", width: "auto" }}
          styling="px-8 py-3 text-base font-semibold"
          onClick={onProceed}
        >
          {t("githubModal.proceed")}
        </Button>
      </div>
    </InfoModal>
  );
};
