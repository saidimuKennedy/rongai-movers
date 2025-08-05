import { CustomModal } from "@/components/CustomModal";
import React, { createContext, useContext, useState, ReactNode } from "react";


interface ModalContextType {
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;
}

const ShadModalContext = createContext<ModalContextType | undefined>(undefined);

export const useShadModal = () => {
  const ctx = useContext(ShadModalContext);
  if (!ctx)
    throw new Error("useShadModal must be used within ShadModalProvider");
  return ctx;
};

export const ShadModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (title: string, content: ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalTitle("");
    setModalContent(null);
  };

  return (
    <ShadModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <CustomModal open={isOpen} title={modalTitle} onClose={closeModal}>
        {modalContent}
      </CustomModal>
    </ShadModalContext.Provider>
  );
};
