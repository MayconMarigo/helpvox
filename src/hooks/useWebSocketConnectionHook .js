import { BASE_SOCKET_API_URL } from "@utils/constants";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useWebSocketConnection = (type, user) => {
  const [socket, setSocket] = useState(null);

  const registerToSocket = (baseUrl, type) =>
    io(baseUrl, {
      path: "/ws/socket.io",
      transports: ["websocket"],
      query: {
        type: type,
        user: JSON.stringify({
          name: user.name,
          id: user.id,
        }),
      },
    });

  useEffect(() => {
    if (!type || type === "admin") return;

    const connection = registerToSocket(BASE_SOCKET_API_URL, type);
    setSocket(connection);

    return () => connection.disconnect();
  }, [type]);

  return { socket };
};

export default useWebSocketConnection;
