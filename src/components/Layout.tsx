import React, { useEffect } from "react";
import { Footer } from "./Footer";
import { PublicFooter } from "./PublicFooter";
import { HakuBanner } from "./HakuBanner";
import { HeroSection } from "./HeroSection";

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
      {heroImage && (
        <HeroSection
          image={heroImage}
          title={heroTitle}
          text={heroText}
          overlayOpacity={0.5}
        />
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
