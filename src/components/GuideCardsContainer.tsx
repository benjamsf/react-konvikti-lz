import { ReactNode } from "react";

interface GuideCardsContainerProps {
  children: ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function GuideCardsContainer({
  children,
  containerRef,
}: GuideCardsContainerProps) {
  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center mx-auto p-2 gap-4 w-full max-w-[600px]"
    >
      {children}
    </div>
  );
}
