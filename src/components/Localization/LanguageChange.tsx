import { useTranslation } from "react-i18next";
import { availableLanguages } from "./languages";

export const useLanguageChange = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    void i18n.changeLanguage(language);
  };

  return { changeLanguage, availableLanguages };
};
