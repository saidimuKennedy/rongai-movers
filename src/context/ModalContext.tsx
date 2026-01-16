/**
 * @file Modal Context and Provider
 * @module context/ModalContext
 * @description This file provides a React Context (`ShadModalContext`) and a provider component (`ShadModalProvider`)
 *              to manage the state and functionality of a global custom modal (`CustomModal`).
 *              It allows components throughout the application to easily open and close a modal
 *              with dynamic title and content, centralizing modal state management.
 *              It orchestrates the display of the modal but does not directly render its content.
 */
import { CustomModal } from "@/components/CustomModal";
import React, { createContext, useContext, useState, ReactNode } from "react";

/**
 * Defines the shape of the modal context, providing functions to control the modal's visibility and content.
 * @interface ModalContextType
 * @property {function(string, ReactNode): void} openModal - Function to open the modal with a specified title and content.
 * @property {function(): void} closeModal - Function to close the modal.
 */
interface ModalContextType {
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;
}

/**
 * The React Context for the custom modal.
 * @type {React.Context<ModalContextType | undefined>}
 * @description This context stores the functions for opening and closing the modal.
 *              It is consumed by the `useShadModal` hook.
 */
const ShadModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * A custom hook to access the modal control functions from the `ShadModalContext`.
 *
 * @returns {ModalContextType} An object containing `openModal` and `closeModal` functions.
 * @throws {Error} If used outside of a `ShadModalProvider`.
 */
export const useShadModal = () => {
  const ctx = useContext(ShadModalContext);
  if (!ctx)
    throw new Error("useShadModal must be used within ShadModalProvider");
  return ctx;
};

/**
 * Provides the modal context to its children components and renders the `CustomModal`.
 *
 * This component manages the internal state of the modal (isOpen, modalContent, modalTitle)
 * and exposes functions to update this state via the `ShadModalContext`.
 *
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that will have access to the modal context.
 * @returns {JSX.Element} A React context provider wrapping the children and the `CustomModal`.
 */
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
