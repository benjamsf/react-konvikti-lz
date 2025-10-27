import { CardsContainer } from "./CardsContainer";
import { ButtonFoldableCard } from "./ButtonFoldableCard";

interface ServiceUsageCardProps {
  children?: React.ReactNode;
}

export function ServiceUsageCard({ children }: ServiceUsageCardProps) {
  return (
    <div>
      <CardsContainer>
        <ButtonFoldableCard title="Käyttömalli">
          <div className="flex flex-col items-center justify-center p-5">
            {children}
          </div>
        </ButtonFoldableCard>
      </CardsContainer>
    </div>
  );
}
