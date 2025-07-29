import { createContext, useContext, useState } from "react";

const AgentSocketObjects = createContext();

export const useAgentSocketObjects = () => useContext(AgentSocketObjects);

export const AgentSocketObjectsProvider = ({ children }) => {
  const [redirectToRoom, setRedirectToRoom] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [isCalling, setIsCalling] = useState(null);

  return (
    <AgentSocketObjects.Provider
      value={{
        redirectToRoom,
        setRedirectToRoom,
        callObject,
        setCallObject,
        isCalling,
        setIsCalling,
      }}
    >
      {children}
    </AgentSocketObjects.Provider>
  );
};
