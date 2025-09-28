import React, { useState } from "react";
import LoaderContainer from "shared/LoaderContainer";
import { Container } from "./ConfigsManagementView.styles";
import StyledToogle from "shared/Toogle/Toogle";
import StyledButton from "shared/Button";
import { useUser } from "contexts/User/User";
import { AuthenticationService } from "services/authentication";
import { usePageLoader } from "contexts/Page Loader/PageLoader";

export default function ConfigsManagementView() {
  const { user } = useUser();
  const { setPageLoading } = usePageLoader();

  const [isActive, setActive] = useState(user.recordCall ? "1" : "0");
  const toggleActive = () => setActive(isActive == "1" ? "0" : "1");

  const updateCompanyRecordCall = async () => {
    try {
      setPageLoading(true);
      await AuthenticationService.updateCompanyRecordCall(
        Number(isActive),
        user.id
      );
    } catch (error) {
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <>
      <LoaderContainer />
      <Container>
        <h2>Configurações</h2>

        <StyledToogle
          style={{ marginTop: "2rem" }}
          htmlLabel={"Ativar gravações na nuvem."}
          active={isActive}
          onClick={toggleActive}
          required={false}
        />

        <div style={{ marginTop: "2rem" }}>
          <StyledButton
            text="Salvar alterações"
            onClick={updateCompanyRecordCall}
          />
        </div>
      </Container>
    </>
  );
}
