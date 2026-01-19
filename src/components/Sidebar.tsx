import {
  Cross2Icon,
  HomeIcon,
  InfoCircledIcon,
  ReaderIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import jellona from "../assets/logo_green.png";
import { useTranslation } from "react-i18next";
import packageJson from "../../package.json";

interface SidebarProps {
  onClose: () => void;
  onNavigate?: (index: number) => void;
  activeIndex?: number;
}

export function Sidebar({
  onClose,
  onNavigate,
  activeIndex = 0,
}: SidebarProps) {
  const { t } = useTranslation();
  const appVersion = packageJson.version;

  // Navigation items matching the swiper slides
  const navItems = [
    {
      index: 0,
      label: t("homeViewTitle", "Etusivu"),
      icon: HomeIcon,
    },
    {
      index: 1,
      label: t("InfoViewTitle", "Hae asukkaaksi"),
      icon: InfoCircledIcon,
    },
    {
      index: 2,
      label: t("blogNewsViewTitle", "Blogi ja uutiset"),
      icon: ReaderIcon,
    },
    {
      index: 3,
      label: t("navbar.Org"),
      icon: PersonIcon,
    },
  ];

  const handleNavClick = (index: number) => {
    if (onNavigate) {
      onNavigate(index);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-backgroundDark z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-brown-800/50">
          <div className="flex items-center gap-3">
            <img src={jellona} alt="Konvikti Logo" className="w-12 h-auto" />
            <div>
              <h1 className="text-lg font-title font-bold text-white-200">
                Konvikti
              </h1>
              <p className="text-xs text-white-500">
                {t("mobileGuide", "Navigaatio")}
              </p>
            </div>
          </div>
          <button
            className="p-2 rounded-lg text-white-400 hover:text-white-200 hover:bg-brown-700/50 transition-colors"
            onClick={onClose}
            aria-label="Sulje"
          >
            <Cross2Icon width={20} height={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeIndex === item.index;

              return (
                <li key={item.index}>
                  <button
                    onClick={() => handleNavClick(item.index)}
                    className={`
                      w-full flex items-center gap-4 px-4 py-3 rounded-xl
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "text-white-400 hover:bg-brown-700/50 hover:text-white-200"
                      }
                    `}
                  >
                    <Icon width={20} height={20} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-brown-800/50 space-y-3">
          <div className="text-white-500 text-sm px-2">
            <p>
              {t("sidebarInfo5", "Konvikti")} - v{appVersion}
            </p>
            <p className="italic text-xs mt-1">{t("sidebarInfo6", "")}</p>
            <p className="text-xs mt-1">MIT (c) Benjam Bröijer</p>
          </div>
        </div>
      </div>
    </>
  );
}
