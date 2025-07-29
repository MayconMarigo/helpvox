import { useCallingCall } from "contexts/CallingModal/CallingModal";
import { useSocket } from "contexts/Socket/Socket";
import { useEffect } from "react";
import {
  handleCallAvailableAgent,
  loadCompanySocketEvents,
} from "services/socket";
import Badge from "shared/Badge/Badge";
import StyledButton from "shared/Button";
import {
  ContentBody,
  ContentContainer,
  ContentHeader,
  CredentialsContainer,
  LayoutContainer,
  NavigatorBody,
  NavigatorContainer,
  NavigatorHeader,
  RightContent,
} from "./styles";

import { useCompanySocketObjects } from "contexts/CompanySocketObjects/CompanySocketObjects";
import Image from "next/image";
import * as logo from "../../assets/imgs/ui-calls.jpg";

export default function UnauthorizedCallsView() {
  const image = logo.default;
  const { socket, setSocketType, setUser } = useSocket();
  useEffect(() => {
    setSocketType("company");
    setUser({ name: "Anônimo", id: null });
  }, []);
  const {
    redirectToRoom,
    callObject,
    setPositionOnQueue,
    setRedirectToRoom,
    setCallObject,
  } = useCompanySocketObjects();
  const { setModal } = useCallingCall();

  useEffect(() => {
    if (!socket) return;

    loadCompanySocketEvents(
      socket,
      setModal,
      setPositionOnQueue,
      setRedirectToRoom,
      setCallObject
    );
  }, [socket]);

  const joinCall = () =>
    (window.location.href = `/public/room?name=${callObject.room.name}&t=${callObject.company.token}&returnUrl=${window.location.pathname}`);

  useEffect(() => {
    if (!redirectToRoom) return;

    joinCall();
  }, [redirectToRoom]);

  const callAvailableAgent = () => {
    setModal({ open: true, type: "caller" });
    handleCallAvailableAgent(socket, setPositionOnQueue);
  };

  return (
    <LayoutContainer>
      <NavigatorContainer>
        <NavigatorHeader></NavigatorHeader>
        <NavigatorBody></NavigatorBody>
      </NavigatorContainer>
      <ContentContainer>
        <ContentHeader spacing={false}>
          <RightContent>
            <Badge name={"AN"} />
            <CredentialsContainer>
              <p>Empresa</p>
              <h5>Anônimo</h5>
            </CredentialsContainer>
          </RightContent>
        </ContentHeader>
        <ContentBody>
          <h3>Seja bem vindo</h3>
          <StyledButton
            onClick={callAvailableAgent}
            text="Conectar com agente disponível"
            type="button"
          />
          <Image src={image} alt="" />
        </ContentBody>
      </ContentContainer>
    </LayoutContainer>
  );
}
