import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import ChainedBackend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const commonLocales = import.meta.glob("./assets/locale/*.json");
const dynamicLocales = import.meta.glob("./assets/set/locale/*.json");

function loadJson(
  files: Record<string, () => Promise<unknown>>,
  path: string,
): Promise<unknown> {
  const loader = files[path];
  if (!loader) {
    throw new Error(`Missing locale file: ${path}`);
  }
  return loader().then((m: any) => m?.default ?? m);
}

void i18n
  .use(ChainedBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "fi",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    backend: {
      backends: [
        LocalStorageBackend,
        resourcesToBackend(async (lang: string, namespace: string) => {
          if (namespace === "dynamic") {
            const path = `./assets/set/locale/${lang}.json`;
            return loadJson(dynamicLocales, path);
          }
          const path = `./assets/locale/${lang}.json`;
          return loadJson(commonLocales, path);
        }),
      ],
      backendOptions: [
        {
          expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
      ],
    },
    ns: ["common", "dynamic", "productContent"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    },
  });

export default i18n;
