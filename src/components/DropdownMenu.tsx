import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownMenuProps {
  triggerLabel: string;
  items: readonly DropdownItem[];
  onSelect: (value: string) => void;
  contentStyle?: string;
  triggerStyle?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  triggerLabel,
  items,
  onSelect,
  contentStyle = "flex flex-col text-xl text-white bg-backgroundLight shadow-lg rounded",
  triggerStyle = "underline cursor-pointer",
}) => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className={triggerStyle}>
        {triggerLabel}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className={contentStyle}>
          {items.map((item, index) => (
            <DropdownMenuPrimitive.Item
              key={index}
              className="p-2 hover:bg-primary-800 cursor-pointer"
              onSelect={() => onSelect(item.value)}
            >
              {item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};
