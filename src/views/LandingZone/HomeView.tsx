import { useState } from "react";
import { BriefContainer } from "../../components/BriefContainer";
import { HeadlineContainer } from "../../components/HeadlineContainer";
import { Layout } from "../../components/Layout";
import { YouTubeModal } from "../../components/YouTubeModal";
import {
  useIntroVideo,
  type SupportedLanguage,
} from "../../hook/useSiteSettings";
import trooper from "../../assets/heroimages/hero1.jpeg";
import Icon1 from "../../assets/littleimgs/img1.png";
import Icon2 from "../../assets/littleimgs/img2.png";
import Icon3 from "../../assets/littleimgs/img3.png";
import Icon4 from "../../assets/littleimgs/img4.png";
import logo from "../../assets/logo_green.png";
import { useTranslation } from "react-i18next";

// Fallback video ID if Sanity hasn't been configured yet
const FALLBACK_VIDEO_ID = "dQw4w9WgXcQ";

export function HomeView() {
  const { t, i18n } = useTranslation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Get current language for Sanity queries
  const currentLanguage = (
    i18n.language?.startsWith("en") ? "en" : "fi"
  ) as SupportedLanguage;

  // Fetch intro video from Sanity
  const { introVideo } = useIntroVideo(currentLanguage);

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

  // Use Sanity video or fallback
  const videoId = introVideo?.youtubeUrl || FALLBACK_VIDEO_ID;
  const videoTitle =
    introVideo?.title || t("homeVideo.title", "Tervetuloa Konviktiin");

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
          onButtonClick={() => setIsVideoOpen(true)}
        />
        <BriefContainer
          headTitle={t("homeBrief.HeadTitle")}
          items={punchLines}
          backgroundColor="bg-backgroundBlue"
        />
        <YouTubeModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoId={videoId}
          title={videoTitle}
        />
      </div>
    </Layout>
  );
}
