import { Layout } from "../../components/Layout";
import { ButtonRow } from "../../components/ButtonRow";
import { HeadlineContainer } from "../../components/HeadlineContainer";
import { CardsContainer } from "../../components/CardsContainer";
import { HeroSection } from "../../components/HeroSection";
import { AsukashakuSection } from "../../components/Blog";
import { useTranslation } from "react-i18next";
import { BigConvictusCard } from "./InfoView/BigConvictusCard";
import { SmallConvictusCard } from "./InfoView/SmallConvictusCard";
import heroimage from "../../assets/heroimages/hero9.jpeg";

export function InfoView() {
  const { t } = useTranslation();

  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/1BvkiLpCad0wS3lSWYPZ2OOKcCMe_ZiC3fiD59KtYc5Q/viewform";

  const headlines = [
    {
      title: t("infoHead1.Title"),
      titleStyling: "text-3xl md:text-5xl font-title mb-4",
      subtitle: t("infoHead1.Sub"),
    },
  ];

  const headlines2 = [
    {
      title: t("infoHead2.Title"),
      titleStyling: "text-3xl md:text-5xl font-title mb-4",
      subtitle: t("infoHead2.Sub"),
    },
  ];

  return (
    <Layout showFooter={true}>
      <div className="flex flex-col flex-shrink-0 gap-0">
        <HeroSection
          image={heroimage}
          height="tall"
          title={t("infoHero.Title")}
        />
        
        <HeadlineContainer items={headlines} backgroundColor="bg-background" />
        
        <CardsContainer>
          <BigConvictusCard />
          <SmallConvictusCard />
        </CardsContainer>

        <HeadlineContainer
          items={headlines2}
          backgroundColor="bg-background"
        />

        <AsukashakuSection maxPosts={6} showTitle={true} />

        <ButtonRow
          buttons={[
            {
              children: t("infoButtonRow.Application"),
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