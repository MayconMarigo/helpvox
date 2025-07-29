import { createContext, useContext, useState } from "react";
import CallModal from "shared/CallModal/CallModal";

const CallingCall = createContext();

export const useCallingCall = () => useContext(CallingCall);

export const CallingCallProvider = ({ children }) => {
  const [modal, setModal] = useState({ open: false, type: "receiver" });
  const [callAccepted, setCallAccepted] = useState(false);

  return (
    <CallingCall.Provider
      value={{
        modal,
        setModal,
        callAccepted,
        setCallAccepted,
      }}
    >
      <CallModal
        modal={modal}
        setModal={setModal}
        setCallAccepted={setCallAccepted}
      />
      {children}
    </CallingCall.Provider>
  );
};
