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
  CallCard,
  CallsContainer,
  ContentBody,
  ContentContainer,
  ContentHeader,
  CredentialsContainer,
  DeafCenterCardsContainer,
  DFCardContainer,
  DFCardTitle,
  LayoutContainer,
  NavigatorBody,
  NavigatorContainer,
  NavigatorHeader,
  RightContent,
  SuperTabContainer,
  Tab,
  TabContainer,
  TabsHeader,
} from "./styles";

import parse from "react-html-parser";
import { IoCall } from "react-icons/io5";

import { useCompanySocketObjects } from "contexts/CompanySocketObjects/CompanySocketObjects";
// import Image from "next/image";
import * as logo from "../../assets/imgs/ui-calls.jpg";
import { useUser } from "contexts/User/User";
import * as logo2 from "../../assets/imgs/logo-kof.png";
import * as superTabsImage from "../../assets/imgs/logo-supertabs.png";
import { AuthenticationService } from "services/authentication";
import Modal from "shared/Modal";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import LoaderContainer from "shared/LoaderContainer";
import { miscelaneousService } from "services/miscelaneous";
import { workerService } from "services/worker";
import { dailyJsService } from "services/dailyJs";
import { useAlert } from "contexts/Alert/Alert";

export default function UnauthorizedCallsView() {
  const { user } = useUser();
  const { socket, setSocketType, setUser } = useSocket();
  const { setPageLoading } = usePageLoader();

  useEffect(() => {
    if (user == null || user == undefined) return;
    if (user == false) return window.location.replace("/login");

    setSocketType("company");
    setUser({ name: user.name, id: user.id, recordCall: user.recordCall });
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
  const imageSuperTab = superTabsImage.default;

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

  const [dcCardsArray, setDcCardsArray] = useState([]);
  const [workerCalls, setWorkerCalls] = useState([]);

  const [tab, setTab] = useState("startCall");

  const getAllDcCards = async () => {
    try {
      setPageLoading(true);

      const dcCards = await miscelaneousService.getAllDCCards();
      setDcCardsArray(dcCards);
    } catch (error) {
    } finally {
      setPageLoading(false);
    }
  };

  const getAllWorkerCalls = async () => {
    try {
      setPageLoading(true);

      const wCalls = await workerService.getAllWorkerCalls(user.id);
      setWorkerCalls(wCalls);
    } catch (error) {
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (tab !== "deafCenter") return;

    getAllDcCards();
  }, [tab]);

  useEffect(() => {
    if (tab !== "myCalls") return;

    getAllWorkerCalls();
  }, [tab]);

  const tabs = [
    { key: "startCall", content: "Central de ligações 🤟" },
    { key: "myCalls", content: "Minhas Ligações" },
    { key: "deafCenter", content: "Central do Surdo" },
  ];

  const [modal, setContentModal] = useState({ isOpen: false, content: "" });

  const DeafCenterCard = ({ img, title, content }) => (
    <DFCardContainer>
      <img src={img} alt="" />
      <DFCardTitle>{title}</DFCardTitle>
      <StyledButton
        text="Saber Mais"
        onClick={() => setContentModal({ isOpen: true, content })}
        style={{ fontSize: "1.2rem" }}
      />
    </DFCardContainer>
  );

  const { setContent } = useAlert();

  const handleDownloadCall = async (callId) => {
    try {
      const callDownloadUrl = await dailyJsService.getRecordFromRoomId(callId);

      window.open(callDownloadUrl);
      setContent({
        message: "Download realizado com sucesso.",
        type: "sucesso",
        isOpen: true,
      });
    } catch (error) {
      setContent({
        message:
          "Erro ao realizar download, tente novamente em alguns instantes.",
        type: "erro",
        isOpen: true,
      });
    }
  };

  const superTabs = {
    startCall: (
      <ContentBody colorScheme={user.colorScheme}>
        <img
          // src={user?.logoImage}
          src={user.logoImage ? user.logoImage : image.src}
          style={{ maxHeight: "auto", maxWidth: "200px" }}
        />
        <h3 style={{ textAlign: "center" }}>
          Bem vindo à Central de Intérpretes de Libras 🤟
        </h3>
        {/* <Image src={logo.default} alt="" /> */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/sgoLD9M5h_4?si=XdmwgNTOf6xUAdXA&rel=0&controls=0&showinfo=0&modestbranding=1&fs=0&autohide=1&loop=1&playlist=sgoLD9M5h_4&autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <p
          style={{
            color,
            fontSize: "20px",
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          {status}
        </p>
        <StyledButton
          onClick={callAvailableAgent}
          text="Fazer Videochamada"
          type="button"
          style={{
            borderRadius: "2rem",
            fontSize: "1.5rem",
            backgroundColor: "#0dc45f",
            border: "none",
            margin: "3rem 0",
          }}
        />
        <p
          onClick={() => handleLogout("4")}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        >
          Fazer Logout
        </p>
      </ContentBody>
    ),
    myCalls: (
      <CallsContainer>
        {workerCalls.map((call) => (
          <CallCard>
            <p>📞 Ligação feita em {call.startTime.replace(" ", " às ")}</p>
            <p>Duração: {call.callDuration} min</p>

            {call.callId && user.recordCall && (
              <StyledButton
                text="Baixar gravação"
                style={{
                  maxWidth: "300px",
                  marginTop: "2rem",
                  fontSize: "1.2rem",
                }}
                onClick={() => handleDownloadCall(call.callId)}
              />
            )}
          </CallCard>
        ))}
      </CallsContainer>
    ),
    deafCenter: (
      <DeafCenterCardsContainer>
        <LoaderContainer />
        {modal.isOpen && (
          <Modal
            handleCloseIconClick={() =>
              setContentModal({ ...modal, isOpen: false })
            }
          >
            {parse(modal.content)}
          </Modal>
        )}
        {/* <h2 style={{ width: "100%", textAlign: "center", color: "#fff" }}>
          Central do Surdo
        </h2> */}
        {dcCardsArray.map((card) => (
          <DeafCenterCard
            title={card.title || ""}
            content={card.content || ""}
            img={card.img || ""}
          />
        ))}
      </DeafCenterCardsContainer>
    ),
  };

  const handleSelectTab = (value) => setTab(value);

  return (
    <SuperTabContainer>
      <img
        src={imageSuperTab.src}
        style={{ maxHeight: "auto", maxWidth: "350px", marginBottom: "1rem" }}
      />
      <LayoutContainer
        colorScheme={user.colorScheme}
        expand={dcCardsArray.length > 0}
      >
        <TabsHeader>
          <TabContainer colorScheme={user.colorScheme}>
            {tabs.map((value, index) => (
              <Tab
                colorScheme={user.colorScheme}
                onClick={() => handleSelectTab(value.key)}
                selected={tab == value.key}
                position={index}
              >
                {value.content}
              </Tab>
            ))}
          </TabContainer>
        </TabsHeader>
        {superTabs[tab]}
      </LayoutContainer>
    </SuperTabContainer>
  );
}
