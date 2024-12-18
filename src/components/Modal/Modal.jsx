import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";

export const Modal = ({ isOpen, onClose, title, description, children }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className={clsx(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-md rounded-lg bg-white p-6 shadow-md"
          )}
        >
          {/* Title */}
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>

          {/* Description */}
          {description && (
            <Dialog.Description className="mt-2 text-sm text-gray-600">
              {description}
            </Dialog.Description>
          )}

          {/* Modal Body */}
          <div className="mt-4">{children}</div>

          {/* Bottom Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2  text-gray text-sm rounded border border-grey"
            >
              Close
            </button>
          </div>

          {/* Close Icon (Top-Right Corner) */}
          <Dialog.Close
            className={clsx(
              "absolute top-4 right-4 text-gray-600 hover:text-black focus:outline-none"
            )}
          >
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
