import { Layout } from "../components/Layout";
import { ServiceInfoCard } from "../components/ServiceInfoCard";
import { Button } from "../components/Button";
import { CardsContainer } from "../components/CardsContainer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function NotFoundView() {
  const { t } = useTranslation();

  return (
    <Layout showFooter={false}>
      <div className="flex flex-col flex-shrink-0 gap-3">
        <CardsContainer>
          <ServiceInfoCard
            title={t("notFoundView.title")}
            details={t("notFoundView.details")}
          />
          <Link to="/">
            <Button type="submit" variant={{ color: "primary", width: "full" }}>
              {t("notFoundView.returnButton")}
            </Button>
          </Link>
        </CardsContainer>
      </div>
    </Layout>
  );
}
