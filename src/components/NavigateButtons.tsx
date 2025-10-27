import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface NavigateButtonsProps {
  backUrl: string;
  forwardUrl: string;
  alterBack?: string;
  alterForward?: string;
}

export function NavigateButtons({
  backUrl,
  forwardUrl,
  alterBack,
  alterForward,
}: NavigateButtonsProps) {
  const navigate = useNavigate();
  const [backClicked, setBackClicked] = useState(false);
  const [ContinueClicked, setContinueClicked] = useState(false);

  const handleBackClick = () => {
    setBackClicked(true);
    navigate(backUrl);
    setBackClicked(false);
  };

  const handleContinueClick = () => {
    setContinueClicked(true);
    navigate(forwardUrl);
    setContinueClicked(false);
  };

  return (
    <div className="fixed bottom-2 left-0 right-0 flex justify-center">
      <section className="items-start rounded bg-zinc-800 flex rounded-lg max-w min-h-[75px] max-w-full gap-2.5 mt-24 p-2.5 max-md:justify-center">
        <Button
          styling={`transform transition-transform duration-200 justify-center items-center rounded ${
            backClicked ? "scale-95" : "scale-100"
          } self-stretch flex min-w-[150px] flex-col px-6 py-3 ${
            backClicked ? "bg-blue-900" : "bg-zinc-800"
          }`}
          onPointerDown={() => setBackClicked(true)}
          onPointerUp={() => setBackClicked(false)}
          onClick={handleBackClick}
        >
          {alterBack || "Takaisin"}
        </Button>

        <div className="self-stretch bg-neutral-800 flex w-1 h-11 flex-col" />

        <Button
          styling={`transform transition-transform duration-200 bg-blue-900 justify-center items-center ${
            ContinueClicked ? "scale-25" : "scale-100"
          } self-stretch flex min-w-[150px] flex-col px-6 py-3`}
          onPointerDown={() => setContinueClicked(true)}
          onPointerUp={() => setContinueClicked(false)}
          onClick={handleContinueClick}
        >
          {alterForward || "Jatka"}
        </Button>
      </section>
    </div>
  );
}
