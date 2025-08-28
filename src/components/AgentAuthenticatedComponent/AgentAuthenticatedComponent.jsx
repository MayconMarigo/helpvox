import { useAgentSocketObjects } from "contexts/AgentSocketObjects/AgentSocketObjects";
import { useCallingCall } from "contexts/CallingModal/CallingModal";
import { useSocket } from "contexts/Socket/Socket";
import { useUser } from "contexts/User/User";
import { useEffect, useState } from "react";
import {
  handleAnswerIncomingCallSocket,
  handleIncomingCallNotAnsweredSocket,
  handleRegisterNotAnsweredCallSocket,
  loadAgentSocketEvents,
} from "services/socket";
import { CALL_RESPONSE_TIME } from "utils/constants";
import { formatDateToBackend } from "utils/date/date";
import { Container } from "./AgentAuthenticatedComponent.styles";

export default function AgentAuthenticatedComponent() {
  const [triggerNotAnswered, setTriggerNotAnswered] = useState(false);

  const { modal, callAccepted, setModal } = useCallingCall();
  const { callObject, setCallObject, setRedirectToRoom, setIsCalling } =
    useAgentSocketObjects();

  const { user } = useUser();

  const { socket, setUser } = useSocket();
  useEffect(() => {
    setUser({ name: user.name, id: user.id });
  }, [user]);

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
  }, [triggerNotAnswered]);

  // useEffect(() => {
  //   if (!socket) return;
  //   const socketType = {
  //     agent: () =>
  //       loadAgentSocketEvents(
  //         socket,
  //         setModal,
  //         setIsCalling,
  //         setRedirectToRoom,
  //         setCallObject
  //       ),
  //   };

  //   socketType["agent"]();

  //   return;
  // }, [socket]);

  useEffect(() => {
    if (!modal.open) return;

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

  return (
    <Container>
      <h2>Seja bem vindo</h2>
    </Container>
  );
}
