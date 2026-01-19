import React from "react";
import { Button, ButtonProps } from "./Button";

interface ButtonRowProps {
  buttons: ButtonProps[];
}

export const ButtonRow: React.FC<ButtonRowProps> = ({ buttons }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 px-2 pb-2 mt-4">
      {buttons.map((buttonProps, index) => (
        <Button
          key={index}
          {...buttonProps}
          styling={`flex-grow-0 ${buttonProps.styling ?? ""}`}
        >
          {buttonProps.children}
        </Button>
      ))}
    </div>
  );
};
