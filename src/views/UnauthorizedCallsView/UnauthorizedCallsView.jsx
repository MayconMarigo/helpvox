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
import { useUser } from "contexts/User/User";
import * as logo2 from "../../assets/imgs/logo-login.png";
import { AuthenticationService } from "services/authentication";

export default function UnauthorizedCallsView() {
  const { user } = useUser();
  const { socket, setSocketType, setUser } = useSocket();
  useEffect(() => {
    if (user == null || user == undefined) return;
    if (user == false) return window.location.replace("/login");

    setSocketType("company");
    setUser({ name: user.name, id: user.id });
  }, [user]);
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
    (window.location.href = `/authenticated/room?name=${callObject.room.name}&t=${callObject.company.token}&returnUrl=${window.location.pathname}`);

  useEffect(() => {
    if (!redirectToRoom) return;

    joinCall();

    return () => socket.disconnect();
  }, [redirectToRoom]);

  const callAvailableAgent = () => {
    setModal({ open: true, type: "caller" });
    handleCallAvailableAgent(socket, setPositionOnQueue);
  };
  const image = logo2.default;

  const handleLogout = async (userType) =>
    await AuthenticationService.logout(userType);

  return (
    <LayoutContainer>
      <ContentBody>
        <img
          // src={user?.logoImage}
          src={image.src}
          style={{ maxHeight: "auto", maxWidth: "200px" }}
        />
        <h3>
          Bem vindo à central de <br />
          atendimento médico! ❤️
        </h3>
        <Image src={logo.default} alt="" />
        <StyledButton
          onClick={callAvailableAgent}
          text="Iniciar Atendimento"
          type="button"
          style={{ borderRadius: "2rem", height: "80px", fontSize: "1.5rem" }}
        />
        <p
          onClick={() => handleLogout("4")}
          style={{ cursor: "pointer", marginTop: "3rem" }}
        >
          Fazer Logout
        </p>
      </ContentBody>
    </LayoutContainer>
  );
}
