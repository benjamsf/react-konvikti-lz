import React, { forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode; // Allow custom content
}

export const InfoModal = forwardRef<HTMLDivElement, InfoModalProps>(
  ({ open, onClose, children }, ref) => {
    return (
      <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black z-40 opacity-70" />
          <Dialog.Content
            ref={ref}
            className="fixed inset-0 z-50 flex items-center justify-center p-1"
          >
            <div className="bg-background rounded-lg max-w-md mx-auto flex flex-col max-h-[80vh] min-w-[400px]">
              <div className="flex flex-col overflow-auto p-6">{children}</div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);
