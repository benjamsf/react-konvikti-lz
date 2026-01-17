import { Layout } from "../../components/Layout";
import { BlogFeed } from "../../components/Blog";
import { useTranslation } from "react-i18next";

export function BlogNewsView() {
  const { t } = useTranslation();

  return (
    <Layout showFooter={true}>
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-title text-white mb-2">
              {t("blogNews.title", "Blogi ja Uutiset")}
            </h1>
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
