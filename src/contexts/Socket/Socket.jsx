import { useUser } from "contexts/User/User";
import useWebSocketConnection from "hooks/useWebSocketConnectionHook ";
import { createContext, useContext, useState } from "react";

const Socket = createContext();

export const useSocket = () => useContext(Socket);

export const SocketProvider = ({ children }) => {
  const [socketType, setSocketType] = useState();
  const [user, setUser] = useState();
  const { socket } = useWebSocketConnection(socketType, user);

  return (
    <Socket.Provider value={{ socket, setSocketType, setUser }}>
      {children}
    </Socket.Provider>
  );
};
