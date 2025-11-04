import React, { useEffect, useState } from "react";
import LoaderContainer from "shared/LoaderContainer";
import { Container, InputContainer } from "./GenerateCompanyToken.styles";
import StyledInput from "shared/Input";
import Dropdown from "shared/Dropdown";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { AuthenticationService } from "services/authentication";
import StyledButton from "shared/Button";
import { useAlert } from "contexts/Alert/Alert";
import { useUser } from "contexts/User/User";

export default function GenerateCompanyToken() {
  const { setPageLoading } = usePageLoader();
  const [companyUsers, setCompanyUsers] = useState([]);
  const [company, setCompany] = useState(null);
  const [url, setUrl] = useState(null);
  const { setContent } = useAlert();
  const { user } = useUser();

  useEffect(() => {
    const fetchAllCompanyData = async () => {
      try {
        setPageLoading(true);
        const users = await AuthenticationService.getAllUsers(
          "company",
          user.id
        );

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

  const generateToken = async () => {
    try {
      setPageLoading(true);

      const data = await AuthenticationService.generateToken(user.id, company);

      const { token } = data;

      const finalUrl = `https://acessibilidade.helpvox.app/authenticated/redirect?t=${token}`;

      setUrl(finalUrl);

      setContent({
        message: "Token gerado com sucesso.",
        type: "sucesso",
        isOpen: true,
      });
    } catch (error) {
      setContent({
        message: "Erro ao gerar token, tente novamente mais tarde.",
        type: "erro",
        isOpen: true,
      });
    } finally {
      setPageLoading(false);
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setContent({
        message: "Link copiado com sucesso.",
        type: "sucesso",
        isOpen: true,
      });
    } catch (error) {
      setContent({
        message: "Erro ao copiar link, tente novamente em alguns instantes.",
        type: "erro",
        isOpen: true,
      });
    }
  };

  return (
    <>
      <LoaderContainer />
      <Container>
        <h2>Gerar Token</h2>

        {!url && (
          <InputContainer>
            <Dropdown
              content={companyUsers}
              htmlLabel="Empresa"
              value={company || []}
              onChange={setCompany}
            />
          </InputContainer>
        )}
        {url ? (
          <div style={{ marginTop: "2rem" }}>
            <StyledInput
              htmlLabel="URL para Login"
              value={url}
              type="text"
              disabled
            />
            <InputContainer>
              <StyledButton text="Copiar Link" onClick={copyUrl} />
              <StyledButton
                text="Gerar outro link"
                inverse
                onClick={() => setUrl(null)}
              />
            </InputContainer>
          </div>
        ) : (
          <StyledButton
            style={{ marginTop: "2rem" }}
            text="Gerar token para o usuário"
            onClick={generateToken}
          />
        )}
      </Container>
    </>
  );
}
