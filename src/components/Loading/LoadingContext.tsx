import { createContext } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const defaultLoadingContext: LoadingContextType = {
  isLoading: false,
  setLoading: () => {
    // init
  },
};

export const LoadingContext = createContext<LoadingContextType>(
  defaultLoadingContext,
);
