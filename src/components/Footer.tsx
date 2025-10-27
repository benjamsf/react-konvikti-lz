import { Trans } from "react-i18next";
import { DropdownMenu } from "./DropdownMenu";
import { useLanguageChange } from "./Localization/LanguageChange";
import packageJson from "../../package.json";

export function Footer() {
  const { changeLanguage, availableLanguages } = useLanguageChange();
  const appVersion = packageJson.version;

  // Convert available languages to dropdown items
  const languageItems = availableLanguages.map((lang) => ({
    label: lang.name,
    value: lang.code,
  }));

  return (
    <div className="font-heading text-uppercase text-center text-sm text-gray-500 pt-5 mt-10 mx-auto max-w-screen-xl">
      <hr className="mx-auto" />

      <div className="pt-4 py-3">
        Kasvua Turvallisuudesta v{appVersion}
        <br />
        <DropdownMenu
          triggerLabel="Language"
          items={languageItems}
          onSelect={(value) => changeLanguage(value)}
        />
      </div>
      <br />
      <hr className="mx-auto w-56" />

      <div className="py-5 text-xs">
        &copy; <Trans i18nKey="footer.allRightsReservedMain" />
      </div>

      <hr className="mx-auto w-56" />
    </div>
  );
}
