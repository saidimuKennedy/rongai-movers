import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useModal } from "@/context/ModalContext";
export interface ModalProps {
  // children is no longer used here directly, as content comes from context
}

export default function Modal({}: ModalProps) {
  const { isOpen, modalTitle, modalContent, closeModal } = useModal();
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsShowing(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";

      setTimeout(() => {
        setIsShowing(false);
      }, 300);
    }
  }, [isOpen]);
  if (!isShowing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeModal}
      />

      <div
        className={`bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative transform ${
          isOpen ? "scale-100" : "scale-95"
        } transition-transform duration-300`}
      >
        <div className="text-center mb-4">
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
            {modalTitle}
          </h2>
        </div>
        <div className="text-gray-900">
          {" "}
          {modalContent}
        </div>
      </div>
    </div>
  );
}
