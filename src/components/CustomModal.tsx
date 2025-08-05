import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CustomModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

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
