import { useState } from "react";
import { BriefContainer } from "../../components/BriefContainer";
import { SlideModal } from "../../components/SlideModal";
import { HeadlineContainer } from "../../components/HeadlineContainer";
import { Layout } from "../../components/Layout";
import trooper from "../../assets/heroimages/hero1.jpeg";
import Icon1 from "../../assets/icons/jager.svg";
import Icon2 from "../../assets/icons/byod2.png";
import Icon4 from "../../assets/icons/drone.png";
import Icon5 from "../../assets/icons/hacker.png";
import { useTranslation } from "react-i18next";
import enSlide1 from "../../assets/decks/en/index/index.html?raw";

export function HomeView() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const headlines = [
    {
      title: t("homeHead1.Title"),
      subtitle: t("homeHead1.Sub"),
      text: t("homeHead1.Text"),
    },
  ];
  const punchLines = [
    {
      title: t("homePunch1.Title"),
      text: t("homePunch1.Text"),
      icon: Icon1,
    },
    {
      title: t("homePunch2.Title"),
      text: t("homePunch2.Text"),
      icon: Icon4,
    },
    {
      title: t("homePunch3.Title"),
      text: t("homePunch3.Text"),
      icon: Icon5,
    },
    {
      title: t("homePunch4.Title"),
      text: t("homePunch4.Text"),
      icon: Icon2,
    },
    {
      title: t("homePunch5.Title"),
      text: t("homePunch5.Text"),
      icon: Icon1,
    },
  ];
  const slideData = {
    1: { en: enSlide1 },
  };

  return (
    <Layout
      showFooter={true}
      heroImage={trooper}
      heroTitle={t("homeHero.Title")}
      heroText={t("homeHero.subTitle")}
    >
      <div className="py-12">
        <HeadlineContainer
          items={headlines}
          backgroundColor="bg-background"
          buttonText={t("hubBrief.Button")}
          onButtonClick={() => setActiveModal(1)}
        />
        <BriefContainer
          headTitle={t("homeBrief.HeadTitle")}
          items={punchLines}
          backgroundColor="bg-backgroundBlue"
        />
      </div>
      {/* Render SlideModals */}
      {Object.entries(slideData).map(([id, { en }]) => (
        <SlideModal
          key={id}
          enSlide={en}
          open={activeModal === parseInt(id)}
          onClose={() => setActiveModal(null)}
        />
      ))}
    </Layout>
  );
}
