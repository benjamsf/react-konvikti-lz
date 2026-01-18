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
import Icon1 from "../../assets/littleimgs/img1.png";
import Icon2 from "../../assets/littleimgs/img2.png";
import Icon3 from "../../assets/littleimgs/img3.png";
import Icon4 from "../../assets/littleimgs/img4.png";

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

  const punchLines = [
    {
      title: t("infoPunch1.Title"),
      text: t("infoPunch1.Text"),
      icon: Icon1,
    },
    {
      title: t("infoPunch2.Title"),
      text: t("infoPunch2.Text"),
      icon: Icon2,
    },
    {
      title: t("infoPunch3.Title"),
      text: t("infoPunch3.Text"),
      icon: Icon3,
    },
    {
      title: t("infoPunch4.Title"),
      text: t("infoPunch4.Text"),
      icon: Icon4,
    },
    {
      title: t("infoPunch5.Title"),
      text: t("infoPunch5.Text"),
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

      <RecruitmentCriteria
        title={t("infoRecruitment.title", "Mitä hakijalta odotetaan?")}
        subtitle={t("infoRecruitment.subtitle", "Nämä asiat vaikuttavat hakemuksesi arviointiin")}
        backgroundColor="bg-backgroundBlue"
      />
        <HeadlineContainer
          items={headlines3}
          backgroundColor="bg-background"
        />

      </div>
    </Layout>
  );
}