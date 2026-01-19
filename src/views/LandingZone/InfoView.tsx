import { Layout } from "../../components/Layout";
import { HeadlineContainer } from "../../components/HeadlineContainer";
import { RecruitmentCriteria } from "../../components/RecruitmentCriteria";
import { CardsContainer } from "../../components/CardsContainer";
import { HeroSection } from "../../components/HeroSection";
import { AsukashakuSection } from "../../components/Blog";
import { useTranslation } from "react-i18next";
import { BigConvictusCard } from "./InfoView/BigConvictusCard";
import { SmallConvictusCard } from "./InfoView/SmallConvictusCard";
import heroimage from "../../assets/heroimages/hero9.jpeg";

export function InfoView() {
  const { t } = useTranslation();

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

  const headlines3 = [
    {
      title: t("infoLastInfo.title"),
      titleStyling: "text-3xl md:text-5xl font-title mb-4",
      text: t("infoLastInfo.sub"),
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

        <HeadlineContainer items={headlines2} backgroundColor="bg-background" />

        <AsukashakuSection maxPosts={6} showTitle={true} />

        <RecruitmentCriteria
          title={t("infoRecruitment.title", "Mitä hakijalta odotetaan?")}
          subtitle={t(
            "infoRecruitment.subtitle",
            "Nämä asiat vaikuttavat hakemuksesi arviointiin",
          )}
          backgroundColor="bg-backgroundBlue"
        />
        <HeadlineContainer items={headlines3} backgroundColor="bg-background" />
      </div>
    </Layout>
  );
}
