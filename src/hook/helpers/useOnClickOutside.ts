// useOnClickOutside.ts
import { useEffect } from "react";

function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const isClickInside = refs.some((ref) => {
        const el = ref.current;
        return el && el.contains(event.target as Node);
      });
      if (!isClickInside) {
        handler(event);
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener); // For mobile devices
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]); // Include refs and handler in dependencies
}

export { useOnClickOutside };
