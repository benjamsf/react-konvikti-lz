import SwipeIcon from "../assets/icons/swipe.svg";

interface AttentionSwipeProps {
  position: "left" | "right"; // Determines the position
  text?: string; // Customizable text below the icon
}

export function AttentionSwipe({
  position,
  text = "Swipe!",
}: AttentionSwipeProps) {
  const isLeft = position === "left";

  return (
    <div
      className={`fixed bottom-4 ${
        isLeft ? "left-4" : "right-4"
      } flex flex-col items-center gap-2 z-50`} // Added z-50 to ensure it is above other content
    >
      {/* Icon */}
      <img
        src={SwipeIcon}
        alt="Swipe Icon"
        className={`w-8 h-8 md:w-12 md:h-12 ${
          isLeft ? "rotate-110" : ""
        } animate-bounce`} // Added animation for more visibility
      />

      {/* Text */}
      <p className="text-sm md:text-base text-white font-medium">{text}</p>
    </div>
  );
}
