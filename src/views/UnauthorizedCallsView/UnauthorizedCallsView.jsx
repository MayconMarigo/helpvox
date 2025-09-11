import { useCallingCall } from "contexts/CallingModal/CallingModal";
import { useSocket } from "contexts/Socket/Socket";
import { useEffect, useState } from "react";
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
// import Image from "next/image";
import * as logo from "../../assets/imgs/ui-calls.jpg";
import { useUser } from "contexts/User/User";
import * as logo2 from "../../assets/imgs/logo-kof.png";
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

  const [status, setStatus] = useState("Testando conexão...");
  const [color, setColor] = useState("black");

  function checkConnection() {
    const startTime = new Date().getTime();
    const img = new Image();
    const fileSizeInBytes = 1048576; // 1 MB

    img.onload = function () {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000; // segundos
      const bitsLoaded = fileSizeInBytes * 8; // bits
      const speedBps = bitsLoaded / duration;
      const speedMbps = speedBps / (1024 * 1024);

      if (speedMbps >= 5) {
        setStatus("Conexão Boa");
        setColor("green");
      } else {
        setStatus("Conexão Ruim");
        setColor("red");
      }
    };

    img.onerror = function () {
      setStatus("Erro ao testar a conexão");
      setColor("gray");
    };

    // Cache-buster
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png?_=" +
      new Date().getTime();
  }

  useEffect(() => {
    checkConnection(); // roda ao montar
    const interval = setInterval(checkConnection, 10000); // roda a cada 10s
    return () => clearInterval(interval); // limpa ao desmontar
  }, []);

  return (
    <LayoutContainer>
      <ContentBody>
        <img
          // src={user?.logoImage}
          src={image.src}
          style={{ maxHeight: "auto", maxWidth: "200px" }}
        />
        <h3 style={{ textAlign: "center" }}>
          Bem vindo à central de <br />
          Intérpretes! ❤️
        </h3>
        {/* <Image src={logo.default} alt="" /> */}
        <iframe
          // width="560"
          height="315"
          src="https://www.youtube.com/embed/hsdldbjSUS8?si=ulyQ65XK5_Yj1Knb&rel=0&controls=0&showinfo=0&modestbranding=1&fs=0&autohide=1&loop=1&playlist=hsdldbjSUS8&autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <p style={{ color }}>{status}</p>
        <StyledButton
          onClick={callAvailableAgent}
          text="Fazer Videochamada"
          type="button"
          style={{
            borderRadius: "2rem",
            height: "80px",
            fontSize: "1.5rem",
            backgroundColor: "#0dc45f",
            border: "none",
          }}
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
