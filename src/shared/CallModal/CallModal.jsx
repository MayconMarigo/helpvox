import PhoneGif from "assets/gifs/phone-gif.gif";
import CiclicLogo from "assets/svgs/CiclicLogo";
import Image from "next/image";
import { useEffect, useState } from "react";
import StyledButton from "shared/Button";
import { ModalBackground, ModalContainer } from "./CallModal.styles";
import { useCompanySocketObjects } from "contexts/CompanySocketObjects/CompanySocketObjects";

export default function CallModal({ modal, setModal, setCallAccepted }) {
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
      ? "Buscando agentes disponíveis"
      : "Recebendo ligação"
  }${formatDots(dots)}`;

  const { positionInQueue } = useCompanySocketObjects();

  return (
    modal.open && (
      <ModalBackground>
        <ModalContainer>
          <CiclicLogo width={120} />
          <h3 style={{ marginTop: "1rem" }}>{text}</h3>
          {modal.type == "caller" && positionInQueue > 0 && (
            <h4 style={{ marginTop: "1rem" }}>
              Posição na fila: {positionInQueue}
            </h4>
          )}
          <Image src={PhoneGif} />
          {modal.type !== "caller" && (
            <StyledButton text="Atender" onClick={handleAcceptCall} />
          )}
        </ModalContainer>
      </ModalBackground>
    )
  );
}
