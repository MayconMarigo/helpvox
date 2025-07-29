import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useEffect, useState } from "react";
import { AuthenticationService } from "services/authentication";
import StyledInput from "shared/Input";
import Table from "shared/Table";
import { phoneMask } from "utils/mask/mask";
import { FilterContainer } from "./ListUsers.styles";
import { useUser } from "contexts/User/User";
import CSVDownloadButton from "shared/CSVDownloadButton/CSVDownloadButton";

export default function ListUsers() {
  const [usersList, setUsersList] = useState([]);

  const { setPageLoading } = usePageLoader();
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      setPageLoading(true);
      try {
        const users = await AuthenticationService.getAllUsers(
          user.type,
          user.id
        );
        users.map((user) => {
          if (user.phone) user.phone = phoneMask(user.phone);
          delete user.id;

          return user;
        });

        setUsersList(users);
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const [filteredUsers, setFilteredUsers] = useState(null);

  const handleFilterUsers = (e) => {
    if (!e.target.value) setFilteredUsers(null);

    const filter = usersList.filter((user) =>
      user.email.includes(e.target.value)
    );

    setFilteredUsers(filter);
  };

  const CSVHeaders = [
    { label: "Nome", key: "name" },
    { label: "Email", key: "email" },
    { label: "Telefone", key: "phone" },
    // { label: "Tipo", key: "userTypeId" },
    { label: "Status", key: "status" },
  ];

  const CSVData = filteredUsers || usersList;

  return (
    <>
      <FilterContainer>
        <StyledInput
          htmlLabel={"Filtrar por email"}
          required={false}
          onChange={handleFilterUsers}
        />
        <CSVDownloadButton
          headers={CSVHeaders}
          data={CSVData}
          name="Relatorio_Usuarios"
        />
      </FilterContainer>
      <Table
        headers={[
          { name: "Nome" },
          { name: "Email" },
          { name: "Telefone", width: 170 },
          // { name: "Tipo", width: 110 },
          { name: "Status", width: 100 },
        ]}
        content={filteredUsers || usersList}
      />
    </>
  );
}
