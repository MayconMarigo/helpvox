import { useAlert } from "contexts/Alert/Alert";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useSocket } from "contexts/Socket/Socket";
import { useUser } from "contexts/User/User";
import { useEffect, useState } from "react";
import { AuthenticationService } from "services/authentication";
import { handleGetAvailableAgents } from "services/socket";
import StyledButton from "shared/Button";
import Checkbox from "shared/Checkbox/Checkbox";
import CSVDownloadButton from "shared/CSVDownloadButton/CSVDownloadButton";
import StyledInput from "shared/Input";
import Modal from "shared/Modal";
import Table from "shared/Table";
import { SUCCESS_MESSAGES } from "utils/constants";
import { phoneMask } from "utils/mask/mask";
import { FilterContainer } from "./ListDepartments.styles";

export default function ListDepartments({ type = 2 }) {
  const [usersList, setUsersList] = useState([]);
  const [availableAgents, setAvailableAgents] = useState(null);
  const [usersForCSV, setUsersForCSV] = useState(null);
  const { setContent } = useAlert();

  const { setPageLoading } = usePageLoader();
  const { user } = useUser();
  const { setSocketType, setUser, socket } = useSocket();

  useEffect(() => {
    if (user == null || user == undefined) return;

    setUser(user);
    setSocketType("observer");
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    (async () => {
      await handleGetAvailableAgents(socket, setAvailableAgents);
    })();
  }, [socket]);

  useEffect(() => {
    const fetchUsers = async () => {
      setPageLoading(true);
      try {
        const departments =
          await AuthenticationService.getAllDepartmentsByCompanyId(user.id);
        setUsersForCSV(departments);

        console.log(departments);
        setUsersList(departments);
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    fetchUsers();
  }, [availableAgents]);

  const [filteredUsers, setFilteredUsers] = useState(null);

  const handleFilterUsers = (e) => {
    if (!e.target.value) setFilteredUsers(null);

    const filter = usersList.filter((user) =>
      user.name.includes(e.target.value)
    );

    setFilteredUsers(filter);
  };

  // const CSVHeadersByType = (type) => {
  //   const types = {
  //     2: [
  //       { label: "Nome", key: "name" },
  //       { label: "Email", key: "email" },
  //       { label: "Telefone", key: "phone" },
  //       { label: "Status", key: "status" },
  //     ],
  //     3: [
  //       { label: "Nome", key: "name" },
  //       { label: "Função", key: "speciality" },
  //       { label: "Status", key: "status" },
  //       { label: "Online", key: "online" },
  //     ],
  //     4: [
  //       { label: "Id", key: "id" },
  //       { label: "Nome", key: "name" },
  //       { label: "Email", key: "email" },
  //       { label: "Telefone", key: "phone" },
  //       { label: "Status", key: "status" },
  //       { label: "CPF", key: "cpf" },
  //     ],
  //   };

  //   return types[type];
  // };

  const CSVHeaders = [
    // { label: "Id", key: "id" },
    { label: "Setor", key: "name" },
    { label: "Código", key: "code" },
  ];

  const CSVData = filteredUsers || usersList;

  const customHeadersByType = (type) => {
    const types = {
      2: [
        { name: "Nome" },
        { name: "Email" },
        { name: "Telefone", width: 160 },
        { name: "Status", width: 80 },
      ],
      3: [
        { name: "Nome" },
        { name: "Função", width: 250 },
        { name: "Status", width: 100 },
        { name: "Online", width: 100 },
      ],
      4: [
        { name: "Nome" },
        { name: "Email" },
        { name: "Telefone", width: 160 },
        { name: "Status", width: 80 },
        { name: "CPF", width: 120 },
      ],
    };

    return types[type];
  };

  const customHeaders = [
    // { name: "Id" },
    { name: "Setor", width: 300 },
    { name: "Código", width: 200 },
  ];

  const handleTitleByUserId = {
    2: "Editar Usuário",
    3: "Editar Intérprete",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const toogleIsOpen = () => setIsOpen((prev) => !prev);
  const toogleIsChecked = () => setChecked((prev) => !prev);

  const handleDeleteUsers = async () => {
    try {
      setPageLoading(true);

      await AuthenticationService.bulkDeleteUsers(user.id);

      setContent({
        message: SUCCESS_MESSAGES.USERS_SUCCESSFULL_DELETED,
        type: "sucesso",
        isOpen: true,
      });

      window.location.reload();
    } catch (error) {
      setContent({
        message: error.message,
        type: "erro",
        isOpen: true,
      });
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <>
      <FilterContainer>
        <StyledInput
          htmlLabel={"Filtrar por Setor"}
          required={false}
          onChange={handleFilterUsers}
        />
        <CSVDownloadButton
          headers={CSVHeaders}
          data={usersForCSV}
          name="Relatorio_Usuarios"
        />
      </FilterContainer>
      {usersList && (
        <Table
          headers={customHeaders}
          content={filteredUsers || usersList}
          canEdit={false}
        />
      )}
    </>
  );
}
