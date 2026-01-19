import { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "rounded-lg px-4 py-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed",
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
        "text-red-500 bg-black border border-red-500 hover:bg-red-600 hover:text-white focus:ring-red-500 disabled:bg-gray-800 disabled:text-gray-500",
      blackGrey:
        "text-white bg-black border border-gray-500 hover:bg-backgroundDark focus:ring-gray-300 disabled:bg-gray-900",
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

export type ButtonColors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "error"
  | "blackGrey";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode; // New prop for an icon
  variant?: VariantProps<typeof button>;
  styling?: string;
}

export function Button({
  children,
  icon,
  variant,
  styling,
  ...restProps
}: ButtonProps) {
  const combinedClassName = `${button(variant)} ${styling || ""}`;

  return (
    <button className={combinedClassName} {...restProps}>
      {/* Optional Icon */}
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
