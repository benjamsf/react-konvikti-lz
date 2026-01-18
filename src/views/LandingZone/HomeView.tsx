import { useState } from "react";
import { BriefContainer } from "../../components/BriefContainer";
import { HeadlineContainer } from "../../components/HeadlineContainer";
import { Layout } from "../../components/Layout";
import { ImageSlideModal, type GallerySlide } from "../../components/ImageSlideModal";
import trooper from "../../assets/heroimages/hero1.jpeg";
import Icon1 from "../../assets/littleimgs/img1.png";
import Icon2 from "../../assets/littleimgs/img2.png";
import Icon3 from "../../assets/littleimgs/img3.png";
import Icon4 from "../../assets/littleimgs/img4.png";
import slide1 from "../../assets/heroimages/hero2.jpeg";
import slide2 from "../../assets/heroimages/hero3.jpeg";
import slide3 from "../../assets/heroimages/hero4.jpeg";
import slide4 from "../../assets/heroimages/hero5.jpeg";
import slide5 from "../../assets/heroimages/hero6.jpeg";
import logo from "../../assets/logo_green.png";
import { useTranslation } from "react-i18next";

export function HomeView() {
  const { t } = useTranslation();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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
      icon: Icon2,
    },
    {
      title: t("homePunch3.Title"),
      text: t("homePunch3.Text"),
      icon: Icon3,
    },
    {
      title: t("homePunch4.Title"),
      text: t("homePunch4.Text"),
      icon: Icon4,
    },
    {
      title: t("homePunch5.Title"),
      text: t("homePunch5.Text"),
      icon: logo,
    },
  ];

  const GALLERY_SLIDES: GallerySlide[] = [
    {
      image: slide1,
      title: "Olohuone",
      description: "Tilava yhteinen olohuone, jossa voi viettää aikaa yhdessä.",
    },
    {
      image: slide2,
      title: "Keittiö",
      description: "Täysin varusteltu yhteiskeittiö.",
    },
    {
      image: slide3,
      title: "Makuuhuone",
    },
    {
      image: slide4,
      title: "Piha-alue",
      description: "Vihreä piha grillailua ja ulkoilua varten.",
    },
    {
      image: slide5,
    },
  ];

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
          onButtonClick={() => setIsGalleryOpen(true)}
        />
        <BriefContainer
          headTitle={t("homeBrief.HeadTitle")}
          items={punchLines}
          backgroundColor="bg-backgroundBlue"
        />
        <ImageSlideModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          slides={GALLERY_SLIDES}
        />
      </div>
    </Layout>
  );
}