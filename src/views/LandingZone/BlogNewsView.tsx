import { Layout } from "../../components/Layout";
import { BlogFeed } from "../../components/Blog";
import { useTranslation } from "react-i18next";
import { HeroSection } from "../../components/HeroSection";
import heroimage from "../../assets/heroimages/hero4.jpeg";

export function BlogNewsView() {
  const { t } = useTranslation();

  return (
    <Layout showFooter={true}>
      <HeroSection
          image={heroimage}
          height="tall"
          title={t("blogHero.Title")}
        />
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <p className="text-textLight">
              {t(
                "blogNews.subtitle",
                "Lue uusimmat uutiset ja blogikirjoitukset"
              )}
            </p>
          </header>

          <BlogFeed showFilters={true} />
        </div>
      </div>
    </Layout>
  );
}
