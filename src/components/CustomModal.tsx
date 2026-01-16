/**
 * @file Custom Modal Component
 * @module components/CustomModal
 * @description This reusable React component provides a customizable modal dialog
 *              built upon the UI library's Dialog primitives (e.g., Shadcn UI).
 *              It features an optional title, a consistent header with a logo,
 *              and a scrollable content area. It is designed to be controlled
 *              externally (e.g., by state or a context provider).
 */
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Props for the CustomModal component.
 * @interface CustomModalProps
 * @property {boolean} open - Controls the visibility of the modal. `true` to show, `false` to hide.
 * @property {string} [title] - Optional title to display in the modal header.
 * @property {React.ReactNode} children - The content to be rendered inside the scrollable area of the modal.
 * @property {() => void} onClose - Callback function invoked when the modal is requested to be closed (e.g., by clicking outside or pressing Escape).
 */
interface CustomModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * A customizable and reusable modal dialog component.
 *
 * This component wraps the `Dialog` primitives from the UI library to create
 * a modal with a consistent look and feel across the application. It includes
 * an optional header with a title and a logo, and a main content area that can scroll.
 *
 * Usage:
 * The `open` prop controls its visibility. The `onClose` callback is triggered
 * when the modal needs to be closed (e.g., by user interaction with the dialog's close mechanisms).
 *
 * @param {CustomModalProps} props - The properties for the component.
 * @returns {JSX.Element} A modal dialog component.
 */
export function CustomModal({
  open,
  title,
  children,
  onClose,
}: CustomModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md w-[95%] md:w-full max-w-md mx-auto max-h-[85vh] md:max-h-[75vh] p-0 rounded-2xl shadow-xl bg-white animate-in fade-in zoom-in-90 overflow-hidden flex flex-col">
        {title && (
          <DialogHeader className="p-6 pb-4 border-b border-gray-100 shrink-0">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="/images/rongai-movers.png"
                  alt="Rongai Movers Logo"
                />
              </div>
            </div>
            <DialogTitle className="text-xl font-semibold text-center text-gray-900">
              {title}
            </DialogTitle>
          </DialogHeader>
        )}

        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto grow">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
