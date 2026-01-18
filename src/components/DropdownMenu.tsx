import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownMenuProps {
  triggerLabel: string;
  items: DropdownItem[];
  onSelect: (value: string) => void;
}

export function DropdownMenu({ triggerLabel, items, onSelect }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button 
          className="
            inline-flex items-center gap-2 
            px-4 py-2 
            bg-brown-800/50 hover:bg-brown-700/50
            border border-brown-700/50 hover:border-primary/50
            rounded-lg 
            text-white-400 hover:text-white-200
            text-sm font-medium
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/50
          "
        >
          {triggerLabel}
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="
            z-[100]
            min-w-[160px]
            bg-backgroundDark
            border border-brown-700/50
            rounded-lg
            p-1
            shadow-xl shadow-black/30
            animate-in fade-in-0 zoom-in-95
            data-[side=bottom]:slide-in-from-top-2
            data-[side=top]:slide-in-from-bottom-2
          "
          sideOffset={5}
          align="start"
        >
          {items.map((item) => (
            <DropdownMenuPrimitive.Item
              key={item.value}
              className="
                relative
                flex items-center
                px-3 py-2
                text-sm text-white-400
                rounded-md
                cursor-pointer
                outline-none
                transition-colors
                hover:bg-primary/20 hover:text-white-200
                focus:bg-primary/20 focus:text-white-200
                data-[highlighted]:bg-primary/20 data-[highlighted]:text-white-200
              "
              onSelect={() => onSelect(item.value)}
            >
              {item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}