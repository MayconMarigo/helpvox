import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useEffect, useState } from "react";
import { CallsService } from "services/call";
import StyledButton from "shared/Button";
import {
  Container,
  RatingContainer,
  Star,
  StarContainer,
} from "./RatingView.styles";
import LoaderContainer from "shared/LoaderContainer";
import { useAlert } from "contexts/Alert/Alert";

export default function RatingView() {
  const [hovered, setHovered] = useState(0);
  const handleHover = (index) => {
    setHovered(index);
  };
  const [callId, setCallId] = useState(null);
  const { setPageLoading } = usePageLoader();
  const [selected, setSelected] = useState(0);

  const { setContent } = useAlert();

  useEffect(() => {
    const id = window.location.search.split("?callId=")[1];

    if (!id) {
      window.location.replace("/authenticated/calls");
    }

    setCallId(id);
  }, [window.location]);

  const handleMouseOut = () => {
    if (!!selected) return setHovered(null);

    setHovered(null);
  };

  const handleSubmitRating = async () => {
    if (!callId) {
      window.location.replace("/authenticated/calls");
      return;
    }
    try {
      setPageLoading(true);
      await CallsService.submitCallRating(callId, selected);

      setContent({
        message: "Agendamento deletado com sucesso.",
        type: "sucesso",
        isOpen: true,
      });

      window.location.replace("/authenticated/calls");
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    callId && (
      <Container>
        <LoaderContainer />
        <RatingContainer>
          <div style={{ textAlign: "center", color: "#fff" }}>
            <h2>Gostaríamos de saber sua opinião.</h2>
            <h2>Como você avalia o atendimento realizado?</h2>
          </div>
          <StarContainer>
            {Array(5)
              .fill("⭐")
              .map((value, index) => (
                <Star
                  onClick={() => {
                    setSelected(index + 1);
                    setHovered(0);
                  }}
                  selected={index <= selected - 1}
                  hovered={index <= hovered - 1}
                  onMouseMove={() => handleHover(index + 1)}
                  onMouseOut={handleMouseOut}
                >
                  {value}
                </Star>
              ))}
          </StarContainer>

          <StyledButton
            text="Enviar avaliação"
            inverse
            type="button"
            onClick={handleSubmitRating}
          />
        </RatingContainer>
      </Container>
    )
  );
}
