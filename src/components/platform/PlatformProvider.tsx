import React, { ReactNode } from "react";
import PlatformContext from "./PlatformContext";

type Platform = "iOS" | "Android";

interface PlatformProviderProps {
  children: ReactNode;
}

function getDefaultPlatform(): Platform {
  if (/Android/i.test(navigator.userAgent)) {
    return "Android";
  }
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return "iOS";
  }
  return "iOS"; // Default to iOS if we can't detect
}

const PlatformProvider: React.FC<PlatformProviderProps> = ({ children }) => {
  const [platform, setPlatform] = React.useState<Platform>(
    getDefaultPlatform(),
  );
  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};

export default PlatformProvider;
