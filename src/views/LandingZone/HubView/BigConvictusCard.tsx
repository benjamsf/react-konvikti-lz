import { LargeCard } from "../../../components/LargeCard";
import { Button } from "../../../components/Button";
import trooper from "../../../assets/heroimages/hero2.jpeg";
import { useTranslation, Trans } from "react-i18next";

export function BigConvictusCard() {
  const { t } = useTranslation();

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
        >
          {t("bigConvictusCard.Button1")}
        </Button>

        {/* Button 2 */}
        <Button
          type="button"
          styling="min-h-[60px]"
          variant={{ color: "blackGrey", width: "auto" }}
        >
          {t("bigConvictusCard.Button2")}
        </Button>
      </LargeCard>

    </div>
  );
}
