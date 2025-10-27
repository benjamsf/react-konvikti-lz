import React, { createContext } from "react";

type Platform = "iOS" | "Android";

interface PlatformContextProps {
  platform: Platform;
  setPlatform: React.Dispatch<React.SetStateAction<Platform>>;
}

const PlatformContext = createContext<PlatformContextProps | undefined>(
  undefined,
);

export default PlatformContext;
