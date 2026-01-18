import { Trans, useTranslation } from "react-i18next";
import { DropdownMenu } from "./DropdownMenu";
import { useLanguageChange } from "./Localization/LanguageChange";
import { SocialLinks } from "./SocialLinks";
import { PrivacyPolicyModal } from "./legal/PrivacyPolicyModal";
import packageJson from "../../package.json";
import logo from "../assets/logo_green.png";

export function Footer() {
  const { t } = useTranslation();
  const { changeLanguage, availableLanguages } = useLanguageChange();
  const appVersion = packageJson.version;
  const currentYear = new Date().getFullYear();

  const languageItems = availableLanguages.map((lang) => ({
    label: lang.name,
    value: lang.code,
  }));

  const handleLanguageChange = (value: string) => {
    changeLanguage(value);
  };

  return (
    <footer className="bg-backgroundDark border-t border-brown-800/50 pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo and description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img src={logo} alt="Konvikti" className="h-10 w-auto" />
              <span className="text-white-200 font-title font-bold text-xl">
                Konvikti
              </span>
            </div>
            <p className="text-white-500 text-sm md:text-sm leading-relaxed">
              {t("footer.description", "Claustrum Theologicum - Teologisen tiedekunnan opiskelijoiden koti vuodesta 1950.")}
            </p>
          </div>

          {/* Links and contact */}
          <div className="text-center md:text-left">
            <h3 className="text-white-200 font-semibold mb-4">
              {t("footer.linksAndContactTitle", "Linkit ja yhteystiedot")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  href={import.meta.env.VITE_GOOGLE_RECRUITMENT_FORM || "#"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-400 hover:text-primary transition-colors text-base md:text-sm"
                >
                  {t("footer.joinOrg", "Hae jäseneksi")}
                </a>
              </li>
              <li>
                <PrivacyPolicyModal 
                  triggerClassName="text-white-400 hover:text-primary transition-colors text-base md:text-sm cursor-pointer"
                />
              </li>
            </ul>

            {/* Apotti contact */}
            <div className="mt-6 pt-4 border-t border-brown-800/30">
              <p className="text-white-300 font-medium text-base md:text-sm mb-1">
                {t("footer.apottiTitle", "Apotti (isännöitsijä)")}
              </p>
              <a 
                href="mailto:apotti@konvikti.fi" 
                className="text-primary-400 hover:text-primary text-base md:text-sm transition-colors"
              >
                apotti@konvikti.fi
              </a>
            </div>
          </div>

          {/* Social and language */}
          <div className="text-center md:text-left">
            <h3 className="text-white-200 font-semibold mb-4">
              {t("footer.followUs", "Seuraa meitä")}
            </h3>
            <div className="flex justify-center md:justify-start">
              <SocialLinks
                facebookUrl="https://www.facebook.com/konvikti"
                instagramUrl="https://www.instagram.com/konvikti/"
                iconSize={24}
                className="mb-6"
              />
            </div>

            {/* Language selector */}
            <div className="flex justify-center md:justify-start relative z-50">
              <DropdownMenu
                triggerLabel="Language / Kieli"
                items={languageItems}
                onSelect={handleLanguageChange}
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-brown-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-white-600 text-xs">
              &copy; {currentYear} <Trans i18nKey="footer.allRightsReservedMain" />
            </p>
            <p className="text-white-600 text-xs">
              Konvikti v{appVersion}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}