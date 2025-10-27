import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import classNames from "classnames";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
}

const LogoutButton = ({
  label,
  className,
  disabled,
  type = "button",
}: Props) => {
  const { logout } = useKindeAuth(); // Use Kinde's logout function

  const buttonClasses = classNames("button", className, { disabled: disabled });

  return (
    <button
      className={buttonClasses}
      onClick={() => void logout()}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default LogoutButton;
