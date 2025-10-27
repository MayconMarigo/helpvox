import React, { useEffect, useState } from "react";
import LoaderContainer from "shared/LoaderContainer";
import { Container, InputContainer } from "./CompanyAdjustments.styles";
import StyledInput from "shared/Input";
import Dropdown from "shared/Dropdown";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { AuthenticationService } from "services/authentication";
import StyledButton from "shared/Button";
import { useAlert } from "contexts/Alert/Alert";

export default function CompanyAdjustments() {
  const { setPageLoading } = usePageLoader();
  const [companyUsers, setCompanyUsers] = useState([]);
  const [company, setCompany] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { setContent } = useAlert();

  useEffect(() => {
    const fetchAllCompanyData = async () => {
      try {
        setPageLoading(true);
        const users = await AuthenticationService.getAllUsers("admin", 0, 2);

        const dropdownContent = users?.map((user) => {
          return {
            text: user?.name,
            value: user?.id,
          };
        });

        setCompanyUsers(dropdownContent);
        setCompany(dropdownContent[0]?.value);

        fetchDashboardData();
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    fetchAllCompanyData();
  }, []);

  const insertManualCall = async () => {
    try {
      setPageLoading(true);

      await AuthenticationService.createManualCall(company, quantity);

      setContent({
        message: "Chamada inserida com sucesso.",
        type: "sucesso",
        isOpen: true,
      });
    } catch (error) {
      setContent({
        message: "Erro ao inserir chamada, tente novamente mais tarde.",
        type: "erro",
        isOpen: true,
      });
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <>
      <LoaderContainer />
      <Container>
        <h2>Ajustes Manuais</h2>

        <h3 style={{ margin: "2rem 0" }}>Inserir chamada manual</h3>
        <InputContainer>
          <Dropdown
            content={companyUsers}
            htmlLabel="Empresa"
            value={company || []}
            onChange={setCompany}
          />
          <StyledInput
            htmlLabel="Quantidade de minutos"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </InputContainer>
        <StyledButton
          style={{ marginTop: "2rem" }}
          text="Registrar Chamada"
          onClick={insertManualCall}
        />
      </Container>
    </>
  );
}
