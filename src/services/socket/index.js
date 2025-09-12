export const loadCompanySocketEvents = (
  socket,
  setModal,
  setPositionOnQueue,
  setRedirectToRoom,
  setCallObject
) => {
  socket.on("getPositionOnQueue", (response) => {
    setPositionOnQueue(response);
  });
  socket.on("redirectToRoom", (response) => {
    setModal({ open: false });
    setRedirectToRoom(response.redirect);
    setCallObject(response.content);
  });
  socket.on("callNotAnswered", () => {
    socket.emit("callAvailableAgent", () => {});
  });
};

export const handleCallAvailableAgent = (socket, setPositionOnQueue) =>
  socket.emit("callAvailableAgent", (res) => {
    setPositionOnQueue(res);

    console.log(res);
    return;
  });

export const loadAgentSocketEvents = (
  socket,
  setModal,
  setIsCalling,
  setRedirectToRoom,
  setCallObject
) => {
  socket.on("incomingCall", (message) => {
    setModal({ open: true });
    setIsCalling(true);
    setCallObject(message);
  });

  socket.on("redirectToRoom", (response) => {
    setRedirectToRoom(response);
  });

  socket.emit("checkCompaniesOnHold", (res) => {});
};

export const handleAnswerIncomingCallSocket = (socket, message) => {
  socket.emit("updatePositionsOnQueue", () => null);
  socket.emit("handleAcceptedCall", message);
};

export const handleIncomingCallNotAnsweredSocket = (socket, message) => {
  socket.emit("handleCallNextAgentAfterFailedCall", message);
};

export const handleRegisterNotAnsweredCallSocket = (socket, message) => {
  socket.emit("registerNotAnsweredCall", message);
};

export const handleGetAvailableAgents = async (socket, setAvailableAgents) =>
  socket.emit("getAvailableAgents", (callback) => {
    setAvailableAgents(callback);
  });

export const registerCallInformation = async (socket, call) => {
  socket.emit("registerCallInformation", call);
};

export const handleChangeAgentStatusToBusy = (socket) =>
  socket.emit("handleChangeAgentStatusToBusy", { id: socket.id });

export const handleChangeAgentStatusToAvailable = (socket) => {
  socket.emit("handleChangeAgentStatusToAvailable", { id: socket.id });
  socket.emit("checkCompaniesOnHold", (res) => {});
};

export const handleDisconectAgent = (socket) =>
  socket.emit("handleDisconnectAgent");
