import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({children}: ModalProps) {
  const { isOpen, modalTitle, modalContent, closeModal } = useModal();
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsShowing(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        setIsShowing(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isShowing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={closeModal}
      />
      
      {/* Modal Content */}
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden transform ${
          isOpen ? 'scale-100' : 'scale-95'
        } transition-transform duration-300`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {modalTitle}
          </h3>
          <button 
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto max-h-[60vh] text-gray-900 dark:text-gray-100">
          {modalContent}
        </div>
      </div>
    </div>
  );
}