import PhoneGif from "assets/gifs/phone-gif.gif";
import CiclicLogo from "assets/svgs/CiclicLogo";
import BemmaisLogo from "assets/imgs/logo-kof.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import StyledButton from "shared/Button";
import { ModalBackground, ModalContainer } from "./CallModal.styles";
import { useCompanySocketObjects } from "contexts/CompanySocketObjects/CompanySocketObjects";
import { useUser } from "contexts/User/User";

export default function CallModal({
  modal,
  setModal,
  setCallAccepted,
  modalCaller,
}) {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    if (!modal.open) return;
    const dotsTimer = setTimeout(() => {
      if (dots == 3) {
        return setDots(1);
      }

      setDots((previous) => previous + 1);
    }, 500);

    return () => clearTimeout(dotsTimer);
  }, [dots, modal.open]);

  const formatDots = (numberOfDots) => {
    let dots = "";
    for (let i = 0; i < numberOfDots; i++) {
      dots += ".";
    }

    return dots;
  };

  const handleAcceptCall = () => {
    setModal({ ...modal, open: false });

    setCallAccepted(true);
  };

  const text = `${
    modal.type === "caller"
      ? "Buscando Intérpretes disponíveis"
      : `Recebendo ligação de ${modalCaller}`
  }`;
  // }${formatDots(dots)}`;

  const { user } = useUser();

  const { positionInQueue } = useCompanySocketObjects();

  return (
    modal.open && (
      <ModalBackground>
        <ModalContainer>
          <img
            src={user?.userTypeId == "3" ? BemmaisLogo.src : BemmaisLogo.src}
            alt=""
            width={120}
          />
          <h3 style={{ marginTop: "1rem", color: "#fff" }}>{text}</h3>
          {modal.type == "caller" && positionInQueue >= 0 && (
            <>
              <h3 style={{ marginTop: "1rem", color: "#fff" }}>
                Sua posição na fila é:
              </h3>
              <h3
                style={{ marginTop: "1rem", color: "#fff", fontSize: "4rem" }}
              >
                {positionInQueue == 0 ? "Chamando" : positionInQueue }
              </h3>
            </>
          )}
          {modal.type !== "caller" && (
            <StyledButton
              style={{
                marginTop: "2rem",
                borderRadius: "2rem",
                height: "80px",
                fontSize: "1.5rem",
                backgroundColor: "#0dc45f",
                border: "none",
              }}
              text="Atender"
              onClick={handleAcceptCall}
            />
          )}
        </ModalContainer>
      </ModalBackground>
    )
  );
}
