import React, { ReactNode } from "react";

interface CardsContainerProps {
  children: ReactNode;
}

export function CardsContainer({ children }: CardsContainerProps) {
  const childrenCount = React.Children.count(children);
  const containerClass =
    childrenCount > 1
      ? "mx-6 h-[calc(100vh - 4rem)] flex flex-col flex-col gap-3 md:gap-4 lg:grid lg:grid-cols-2 lg:mx-28 gap-4 xl:grid-cols-2 xl:gap-8 xl:mx-60"
      : "mx-2 p-2 h-[calc(100vh - 4rem)] flex flex-col items-center justify-center";

  return <div className={containerClass}>{children}</div>;
}
