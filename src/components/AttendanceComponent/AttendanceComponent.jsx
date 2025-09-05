import React, { useEffect, useState } from "react";
import LoaderContainer from "shared/LoaderContainer";
import { Container } from "./AttendanceComponent.styles";
import StyledButton from "shared/Button";
import { useCallingCall } from "contexts/CallingModal/CallingModal";
import { useAgentSocketObjects } from "contexts/AgentSocketObjects/AgentSocketObjects";
import { useUser } from "contexts/User/User";
import { useSocket } from "contexts/Socket/Socket";
import {
  handleAnswerIncomingCallSocket,
  handleChangeAgentStatusToAvailable,
  handleChangeAgentStatusToBusy,
  handleIncomingCallNotAnsweredSocket,
  handleRegisterNotAnsweredCallSocket,
  loadAgentSocketEvents,
} from "services/socket";
import { formatDateToBackend } from "utils/date/date";
import { CALL_RESPONSE_TIME } from "utils/constants";
import * as logo2 from "../../assets/imgs/logo-login.png";
import * as logo from "../../assets/imgs/ui-calls.jpg";

export default function AttendanceComponent() {
  const [triggerNotAnswered, setTriggerNotAnswered] = useState(false);

  const {
    modal,
    callAccepted,
    setModal,
    isOnline,
    setIsOnline,
    setModalCaller,
  } = useCallingCall();
  const { callObject, setCallObject, setRedirectToRoom, setIsCalling } =
    useAgentSocketObjects();

  const { user } = useUser();

  const { socket, setUser, setSocketType } = useSocket();
  useEffect(() => {
    setSocketType(user.type);
    setUser({ name: user.name, id: user.id });
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const socketType = {
      agent: () =>
        loadAgentSocketEvents(
          socket,
          setModal,
          setIsCalling,
          setRedirectToRoom,
          setCallObject
        ),
    };

    socketType["agent"]();

    return;
  }, [socket]);

  useEffect(() => {
    if (!triggerNotAnswered) return;

    handleIncomingCallNotAnsweredSocket(socket, {
      agentId: callObject.agent.socketId,
      companyId: callObject.company.socketId,
    });

    handleRegisterNotAnsweredCallSocket(socket, {
      agentSocketId: callObject.agent.socketId,
      callId: callObject.room.name,
      callerId: callObject.company.userId,
      receiverId: callObject.agent.userId,
      connected: 0,
      startTime: formatDateToBackend(new Date()),
      endTime: formatDateToBackend(new Date()),
      videoUrl: null,
      isAnonymous: callObject.company.userId == null,
    });

    setTriggerNotAnswered(false);
    setModal({ isOpen: false });
    handleChangeAgentStatusToBusy(socket);
    handleChangeAvailability();

    return;
  }, [triggerNotAnswered]);

  useEffect(() => {
    if (!socket) return;
    const socketType = {
      agent: () =>
        loadAgentSocketEvents(
          socket,
          setModal,
          setIsCalling,
          setRedirectToRoom,
          setCallObject
        ),
    };

    socketType["agent"]();

    return;
  }, [socket]);

  useEffect(() => {
    if (!modal.open) return;

    setModalCaller(callObject.company.name);
    const timer = setTimeout(() => {
      setTriggerNotAnswered(true);
    }, CALL_RESPONSE_TIME);

    return () => clearTimeout(timer);
  }, [modal.open]);

  useEffect(() => {
    if (!callAccepted) return;

    handleAnswerIncomingCallSocket(socket, callObject);

    joinCall();
  }, [callAccepted]);

  const joinCall = () => {
    return (window.location.href = `/authenticated/room?name=${callObject.room.name}&t=${callObject.agent.token}&returnUrl=${window.location.pathname}`);
  };

  const buttonText = isOnline ? "Ficar indisponível" : "Ficar disponível";

  const handleChangeAvailability = () => setIsOnline((prev) => !prev);

  useEffect(() => {
    if (!socket) return;
    if (!isOnline) {
      handleChangeAgentStatusToBusy(socket);
      return;
    }
    handleChangeAgentStatusToAvailable(socket);

    return;
  }, [isOnline]);

  const image = logo2.default;

  return (
    <>
      <LoaderContainer />
      <Container>
        <h2 style={{ padding: "2rem" }}>Consultório Online</h2>
        <img src={image.src} style={{ maxHeight: "auto", maxWidth: "200px" }} />

        <h4 style={{ fontSize: "2rem" }}>
          Você está
          <span style={{ color: isOnline ? "green" : "red", fontSize: "2rem" }}>
            {isOnline ? " Online" : " Offline"}
          </span>
        </h4>

        <img
          src={logo.default.src}
          style={{ maxHeight: "auto", maxWidth: "600px" }}
        />
        <div style={{ maxWidth: 300 }}>
          <StyledButton text={buttonText} onClick={handleChangeAvailability} />
        </div>
      </Container>
    </>
  );
}
