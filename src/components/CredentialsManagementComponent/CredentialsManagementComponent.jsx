import StyledInput from "shared/Input";
import {
  Container,
  FilterContainer,
  TableContainer,
} from "./CredentialsManagementComponent.styles";
import Dropdown from "shared/Dropdown";
import { useEffect, useState } from "react";
import Table from "shared/Table";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { AuthenticationService } from "services/authentication";
import { useUser } from "contexts/User/User";
import StyledButton from "shared/Button";

export default function CredentialsManagementComponent() {
  const [filterType, setFilterType] = useState("credential");
  const [filter, setFilter] = useState("");
  const [credentials, setCredentials] = useState([]);
  const { user } = useUser();
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [filteredContent, setFilteredContent] = useState([]);

  const { setPageLoading } = usePageLoader();

  const handleDropdownChange = (type) => setFilterType(type);
  const handleFilter = (e) => setFilter(e.target.value);

  const fetchCredentials = async () => {
    try {
      setPageLoading(true);

      const data = await AuthenticationService.getAllCredentialsByUserId(
        user.id
      );

      setCredentials(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  useEffect(() => {
    if (credentials.length == 0) return;

    console.log(credentials)

    const f = credentials.filter((line) =>
      line[filterType].includes(filter)
    );
    setFilteredContent(f);
  }, [credentials]);

  const generateCredentials = async () => {
    try {
      setPageLoading(true);
      await AuthenticationService.generateCredentialsByUserId(user.id);

      await fetchCredentials();
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <Container>
      <h2>Credenciais</h2>

      <FilterContainer>
        <StyledInput
          htmlLabel="Filtrar por Tipo"
          onChange={handleFilter}
          required={false}
        />
        <Dropdown
          value={filterType}
          htmlLabel="Tipo"
          onChange={(e) => handleDropdownChange(e)}
          content={[
            { value: "credential", text: "Credencial" },
            { value: "status", text: "Status" },
          ]}
        />
        <StyledButton
          text="Gerar nova credencial"
          type="button"
          onClick={generateCredentials}
        />
      </FilterContainer>

      <TableContainer>
        <Table
          headers={[{ name: "Credencial" }, { name: "Status", width: 100 }]}
          content={filteredContent || []}
          modal={{ type: "credential", title: "Editar Credencial" }}
        />
      </TableContainer>
    </Container>
  );
}
