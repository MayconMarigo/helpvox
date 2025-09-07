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
import { useUser } from "contexts/User/User";

export default function RatingView() {
  const { user } = useUser();
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
          <img
            src={user?.logoImage}
            style={{ height: "auto", width: "100%", maxWidth: 200 }}
          />
          <div style={{ textAlign: "center", color: "#fff" }}>
            <h1 style={{ color: "#000" }}>Avalie o seu atendimento</h1>
            <h3 style={{ fontWeight: 500, color: "#000", marginTop: "1rem" }}>
              Como foi a sua experiência utilizando a central de intérpretes?
            </h3>
          </div>
          <StarContainer>
            {Array(5)
              .fill("★")
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
            text="ENVIAR"
            type="button"
            onClick={handleSubmitRating}
          />
        </RatingContainer>
      </Container>
    )
  );
}
