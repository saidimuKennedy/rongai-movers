import React, { createContext, useContext, useState, ReactNode } from "react";

// manage the state of the sign-in modal
interface AuthModalContextType {
  isSignInModalOpen: boolean;
  signInMessage: string | null;
  signInModalCallbackUrl: string | null; 
  openSignInModal: (options?: {
    message?: string;
    callbackUrl?: string;
  }) => void; 
  closeSignInModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

// wrap the app/ part and provide the context to the children
export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [signInMessage, setSignInMessage] = useState<string | null>(null);
  const [signInModalCallbackUrl, setSignInModalCallbackUrl] = useState<
    string | null
  >(null); 

  const openSignInModal = (options?: {
    message?: string;
    callbackUrl?: string;
  }) => {
    setSignInMessage(options?.message || null);
    setSignInModalCallbackUrl(options?.callbackUrl || null); 
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
    setSignInMessage(null);
    setSignInModalCallbackUrl(null);
  };

  return (
    // actual wrapping 
    <AuthModalContext.Provider
      value={{
        isSignInModalOpen,
        signInMessage,
        signInModalCallbackUrl, 
        openSignInModal,
        closeSignInModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

// allow context be consumed elsewhere in the app
export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
