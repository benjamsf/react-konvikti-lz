import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface IframeModalProps {
  iframeSrc: string; // URL or HTML content for the iframe
  open: boolean;
  onClose: () => void;
  title?: string;
}

export const IframeModal: React.FC<IframeModalProps> = ({
  iframeSrc,
  open,
  onClose,
  title,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-70 z-40" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg relative max-w-full w-full max-h-full h-auto md:max-w-[90%] md:max-h-[90%]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 p-2 text-white z-50"
            >
              <Cross2Icon width={24} height={24} />
            </button>
            {title && (
              <h2 className="text-white text-xl font-bold text-center mt-4 mb-4">
                {title}
              </h2>
            )}
            <div className="relative w-full h-[80vh] overflow-hidden rounded-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={iframeSrc}
                title="Iframe Content"
                allowFullScreen
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
