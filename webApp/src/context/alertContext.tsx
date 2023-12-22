// alertContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AlertContextProps {
  alert: { message: string } | null;
  setAlertMessage: (message: string) => void;
  clearAlert: () => void;
}

const initialState = {
  alert: null,
  setAlertMessage: () => {},
  clearAlert: () => {},
};

export const AlertContext = createContext<AlertContextProps>(initialState);

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AlertProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState<{ message: string } | null>(null);

  const setAlertMessage = (message: string) => {
    setAlert({ message });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  const alertCtxValue = {
    alert,
    setAlertMessage,
    clearAlert,
  };

  return (
    <AlertContext.Provider value={alertCtxValue}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
