import { useState, useRef } from "react";
import {
  Swiper as SwiperInstance,
  SwiperSlide,
  SwiperProps,
} from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { HomeView } from "./HomeView";
import { InfoView } from "./InfoView";
import { OrgView } from "./OrgView";
import { BlogNewsView } from "./BlogNewsView";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { AttentionSwipe } from "../../components/AttentionSwipe";
import { useTranslation } from "react-i18next";

export function LandingZoneSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  const swiperConfig: SwiperProps = {
    spaceBetween: 0,
    slidesPerView: 1,
    autoHeight: true,
    simulateTouch: true,
    touchStartPreventDefault: false,
    touchReleaseOnEdges: true,
    allowTouchMove: true,
    onSlideChange: handleSlideChange,
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
    },
  };

  const views = [
    t("navbar.Home"),
    t("navbar.Info"),
    t("navbar.Blog"),
    t("navbar.Org"),
  ];

  const totalSlides = views.length;

  const showLeftSwipe = activeIndex > 0;
  const showRightSwipe = activeIndex < totalSlides - 1;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar
        views={views}
        activeViewIndex={activeIndex}
        toggleSidebar={toggleSidebar}
        onNavigate={handleNavigation}
      />

      <div className="pt-14">
        <SwiperInstance {...swiperConfig}>
          <SwiperSlide>
            <div className="min-h-[calc(100vh-56px)] flex flex-col">
              <HomeView />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="min-h-[calc(100vh-56px)] flex flex-col">
              <InfoView />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="min-h-[calc(100vh-56px)] flex flex-col">
              <BlogNewsView />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="min-h-[calc(100vh-56px)] flex flex-col">
              <OrgView />
            </div>
          </SwiperSlide>
        </SwiperInstance>
      </div>

      {showLeftSwipe && (
        <AttentionSwipe position="left" text={t("attentionSwipe.leftText")} />
      )}
      {showRightSwipe && (
        <AttentionSwipe position="right" text={t("attentionSwipe.rightText")} />
      )}

      {isSidebarOpen && (
        <Sidebar
          onClose={closeSidebar}
          onNavigate={handleNavigation}
          activeIndex={activeIndex}
        />
      )}
    </div>
  );
}
