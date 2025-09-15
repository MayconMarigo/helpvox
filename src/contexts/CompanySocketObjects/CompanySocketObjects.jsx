import { createContext, useContext, useState } from "react";

const CompanySocketObjects = createContext();

export const useCompanySocketObjects = () => useContext(CompanySocketObjects);

export const CompanySocketObjectsProvider = ({ children }) => {
  const [positionInQueue, setPositionOnQueue] = useState(0);
  const [redirectToRoom, setRedirectToRoom] = useState(null);
  const [callObject, setCallObject] = useState(null);

  return (
    <CompanySocketObjects.Provider
      value={{
        positionInQueue,
        redirectToRoom,
        callObject,
        setPositionOnQueue,
        setRedirectToRoom,
        setCallObject,
      }}
    >
      {children}
    </CompanySocketObjects.Provider>
  );
};
