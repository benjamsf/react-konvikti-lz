import { Cross2Icon } from "@radix-ui/react-icons";
import { useAuth0 } from "@auth0/auth0-react";
import jellona from "../assets/logo.png";
import { useTranslation } from "react-i18next";
import LogoutButton from "../hook/auth/Logoutbutton";
import packageJson from "../../package.json";
import { useNavigate } from "react-router-dom";

export function Sidebar({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const appVersion = packageJson.version;
  const { logout } = useAuth0();
  const navigate = useNavigate(); // Initialize useNavigate

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-30 z-40"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-4/5 max-w-md bg-zinc-900 z-50 p-4 text-white shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={jellona} alt="Jellona Logo" className="w-11 h-10 mr-4" />
            <h1 className="text-xl font-bold">{t("mobileGuide")}</h1>
          </div>
          <button
            className="p-2 rounded-full flex items-center justify-center hover:bg-zinc-800"
            onClick={onClose}
          >
            <Cross2Icon className="text-white" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="pt-4 space-y-4">
          <div
            className="cursor-pointer hover:bg-zinc-800 p-2 rounded"
            onClick={() => {
              navigate("/"); // Navigate to "/"
              onClose(); // Close the sidebar
            }}
          >
            {t("sidebarInfo1")}
          </div>
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="cursor-pointer hover:bg-zinc-800 p-2 rounded">
            {t("sidebarInfo5")} - v{appVersion}
          </div>
          <div className="cursor-pointer italic hover:bg-zinc-800 p-2 rounded">
            {t("sidebarInfo6")}
          </div>
          <button
            className="bg-red-900 w-full p-2 rounded hover:bg-red-700"
            onClick={() => void handleLogout()} // Use `void` to handle the promise
          >
            <LogoutButton label={t("logoutLabel")} type="submit" />
          </button>
        </div>
      </div>
    </>
  );
}
