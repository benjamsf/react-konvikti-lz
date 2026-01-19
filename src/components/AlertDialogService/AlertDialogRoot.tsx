import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../Button";
import { useAlertDialogStore } from "./alertDialogStore";

export function AlertDialogRoot() {
  const { open, props, closeDialog } = useAlertDialogStore();

  return (
    <AlertDialog.Root open={open} onOpenChange={closeDialog}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundLight p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-white m-0 text-lg font-medium">
            {props?.title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-white mt-4 mb-5 text-md leading-normal">
            {props?.description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            {/* Cancel Button */}
            {props?.cancelLabel && (
              <AlertDialog.Cancel asChild>
                <Button
                  variant={{ color: "tertiary" }}
                  onClick={props?.onCancel}
                >
                  {props.cancelLabel}
                </Button>
              </AlertDialog.Cancel>
            )}
            {/* Confirm Button */}
            <AlertDialog.Action asChild>
              <Button
                variant={{ color: props?.confirmColor ?? "error" }} // Default to "error"
                onClick={props?.onConfirm}
              >
                {props?.confirmLabel}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
