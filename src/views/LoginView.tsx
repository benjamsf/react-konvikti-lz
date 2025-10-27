import trooper from "../assets/heroimages/hero4.jpeg";
import { Button } from "../components/Button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Layout } from "../components/Layout";
import { CardsContainer } from "../components/CardsContainer";
import { useTranslation } from "react-i18next";
import pvarkiLogo from "../assets/logo.png";

export const LoginView = () => {
  const { login } = useKindeAuth();
  const { t } = useTranslation();

  // Function to navigate to the 'Request Access' page
  const handleRegisterClick = () => {
    window.location.href = "https://opendefence-cobra.eu.kinde.com/knock-knock";
  };

  return (
    <Layout>
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image with Black Tint */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${trooper})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <CardsContainer>
          <main className="px-10 flex flex-col gap-6 items-center justify-start bg-backgroundLight bg-opacity-80 rounded-lg pb-8 pt-13">
            {/* Title */}
            <h1 className="text-white text-center font-oswald font-bold text-2xl pt-8">
              {t("logInto")}
            </h1>

            {/* Logo */}
            <img src={pvarkiLogo} alt="OpenDefence LOGO" className="w-20" />

            {/* Subtitle */}
            <span className="text-white text-center font-oswald font-bold text-3xl">
              {"Konvikti"}
            </span>

            {/* Buttons */}
            <div className="flex justify-center gap-6 w-full mt-4">
              {/* Register Button */}
              <Button
                type="button"
                variant={{ color: "blackGrey", width: "auto" }}
                styling="px-8 py-3 text-base font-semibold"
                onClick={handleRegisterClick}
              >
                {t("logInto.register")}
              </Button>

              {/* Login Button */}
              <Button
                type="button"
                variant={{ color: "blackGrey", width: "auto" }}
                styling="px-8 py-3 text-base font-semibold"
                onClick={() => {
                  void login();
                }} // Wrapped in curly braces
              >
                {t("logInto.login")}
              </Button>
            </div>
          </main>
        </CardsContainer>
      </div>
    </Layout>
  );
};
