import { createContext, useContext, useState } from "react";

const CallerObject = createContext();

export const useCallerObject = () => useContext(CallerObject);

export const CallerObjectProvider = ({ children }) => {
  const [callerObject, setCallerObject] = useState(null);

  return (
    <CallerObject.Provider value={{ callerObject, setCallerObject }}>
      {children}
    </CallerObject.Provider>
  );
};
