import { useState, useRef } from "react";
import {
  Swiper as SwiperInstance,
  SwiperSlide,
  SwiperProps,
} from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { HomeView } from "./HomeView";
import { HubView } from "./HubView";
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

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (index: number) => {
    swiperRef.current?.slideTo(index); // Navigate to the desired slide
    setActiveIndex(index); // Update active index for styling
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

  const views = [t("homeViewTitle"), t("hubViewTitle")];

  const totalSlides = views.length;

  // Determine whether to show left/right AttentionSwipe
  const showLeftSwipe = activeIndex > 0;
  const showRightSwipe = activeIndex < totalSlides - 1;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar
        views={views}
        activeViewIndex={activeIndex}
        toggleSidebar={toggleSidebar}
        onNavigate={handleNavigation} // Pass the navigation handler
      />

      {/* Swiper */}
      <div className="pt-14">
        <SwiperInstance {...swiperConfig}>
          <SwiperSlide>
            <div className="min-h-[calc(100vh-56px)] flex flex-col">
              <HomeView />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="min-h-[calc(100vh-56px)] flex flex-col">
              <HubView />
            </div>
          </SwiperSlide>
          {/* Add more SwiperSlides here if needed */}
        </SwiperInstance>
      </div>

      {/* Conditionally render AttentionSwipe */}
      {showLeftSwipe && (
        <AttentionSwipe position="left" text={t("attentionSwipe.leftText")} />
      )}
      {showRightSwipe && (
        <AttentionSwipe position="right" text={t("attentionSwipe.rightText")} />
      )}

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
    </div>
  );
}
