import React, { useEffect } from "react";
import { Footer } from "./Footer";
import { PublicFooter } from "./PublicFooter";
import { HakuBanner } from "./HakuBanner";

interface LayoutProps {
  showFooter?: boolean;
  showPublicFooter?: boolean;
  heroImage?: string;
  heroTitle?: string;
  heroText?: string;
  children?: React.ReactNode;
}

export function Layout({
  showFooter = false,
  showPublicFooter = false,
  heroImage,
  heroTitle,
  heroText,
  children,
}: LayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="layout flex flex-col min-h-screen">
      {/* Hero Section */}
      {heroImage && (
        <div className="relative w-full h-screen">
          {/* Hero Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            {heroTitle && (
              <h1 className="text-4xl md:text-6xl font-title mb-4">
                {heroTitle}
              </h1>
            )}
            {heroText && (
              <p className="text-lg md:text-2xl font-subtitle">{heroText}</p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow">
        <div className="content">{children}</div>
      </div>

      {/* Footer */}
      {showFooter && <Footer />}
      {showPublicFooter && <PublicFooter />}

      {/* Active Haku Banner */}
      <HakuBanner />
    </div>
  );
}
