import { forwardRef, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "rounded-lg px-4 py-2 font-bold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed",
  variants: {
    color: {
      primary:
        "text-white bg-primary hover:bg-primary-700 focus:ring-primary-300 disabled:bg-primary-200",
      secondary:
        "text-primary-900 bg-primary-300 hover:bg-primary-400 focus:ring-primary-300 disabled:bg-primary-200",
      tertiary: "text-primary bg-transparent",
      success:
        "text-white bg-success-700 hover:bg-success-500 focus:ring-success-200 disabled:bg-success-200",
      error:
        "text-white bg-error hover:bg-error-700 focus:ring-error-200 disabled:bg-error-200",
    },
    width: {
      full: "w-full",
      auto: "w-auto",
    },
  },
  defaultVariants: {
    color: "primary",
    width: "auto",
  },
});

export type ButtonColors = VariantProps<typeof button>["color"];

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: VariantProps<typeof button>;
  styling?: string;
}

// Use forwardRef to handle the ref parameter
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, styling, ...restProps }, ref) => {
    const combinedClassName = `${button(variant)} ${styling || ""}`;

    return (
      <button ref={ref} className={combinedClassName} {...restProps}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
