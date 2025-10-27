import { Layout } from "../../components/Layout";
import { ButtonRow } from "../../components/ButtonRow";
import { HeadlineContainer } from "../../components/HeadlineContainer";
import { CardsContainer } from "../../components/CardsContainer";
import { useTranslation } from "react-i18next";
import { BigConvictusCard } from "./HubView/BigConvictusCard";
import { SmallConvictusCard } from "./HubView/SmallConvictusCard";

export function HubView() {
  const { t } = useTranslation();

  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/1BvkiLpCad0wS3lSWYPZ2OOKcCMe_ZiC3fiD59KtYc5Q/viewform";


  const headlines = [
    {
      title: t("hubHead1.Title"),
      titleStyling: "text-3xl md:text-5xl font-title text-white mb-4",
      subtitle: t("hubHead1.Sub"),
    },
  ];

  const headlines2 = [
    {
      title: t("hubHead2.Title"),
      titleStyling: "text-3xl md:text-5xl font-title text-white mb-4",
      subtitle: t("hubHead2.Sub"),
    },
  ];

  return (
    <Layout showFooter={true}>
      <div className="flex flex-col flex-shrink-0 gap-4">
        <HeadlineContainer items={headlines} backgroundColor="bg-background" />
        <CardsContainer>
          <BigConvictusCard />
          <SmallConvictusCard />
        </CardsContainer>
        <div className="flex flex-col text-center"></div>
        <HeadlineContainer
          items={headlines2}
          backgroundColor="bg-backgroundBlue"
        />
      
        <ButtonRow
          buttons={[
            {
              children: t("hubButtonRow.SubmitChallenge"),
              onClick: () =>
                window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer"),
              variant: { color: "error", width: "auto" },
            },
          ]}
        />
      </div>

    </Layout>
  );
}
