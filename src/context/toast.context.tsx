// components/ToastContext.tsx
"use client"; // If you're using Next.js App Router, this is necessary for client-side hooks

import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { ToastContainer, toast, ToastContent, Id } from "react-toastify"; // Import 'Id'
import "react-toastify/dist/ReactToastify.css"; // Import default styles

// --- 1. Define the Context Interface ---
interface ToastContextType {
  success: (content: ToastContent) => Id; // Changed return type to Id
  error: (content: ToastContent) => Id; // Changed return type to Id
  info: (content: ToastContent) => Id; // Changed return type to Id
  warn: (content: ToastContent) => Id; // Changed return type to Id
  // Add other toast types if needed
}

// --- 2. Create the Context ---
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// --- Custom Icon Components (or simple elements) ---
const CheckIcon = () => (
  <span style={{ marginRight: "8px" }}>
    <i className="ri-checkbox-circle-fill text-[24px] text-white"></i>
  </span>
);
const CloseIcon = () => (
  <span style={{ marginRight: "8px" }}>
    <i className="ri-close-circle-fill text-white text-[24px]"></i>
  </span>
);

// --- 3. Toast Provider Component ---
interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return {
      success: (content: ToastContent) =>
        toast.success(content, {
          // Changed parameter type to ToastContent
          className: "Toastify__toast--success-custom",
          icon: <CheckIcon />,
        }),
      error: (content: ToastContent) =>
        toast.error(content, {
          // Changed parameter type to ToastContent
          className: "Toastify__toast--error-custom",
          icon: <CloseIcon />,
        }),
      info: (content: ToastContent) => toast.info(content),
      warn: (content: ToastContent) => toast.warn(content),
      // Add other toast types as needed
    };
  }, []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </ToastContext.Provider>
  );
};

// --- 4. Custom Hook for Easy Consumption ---
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
