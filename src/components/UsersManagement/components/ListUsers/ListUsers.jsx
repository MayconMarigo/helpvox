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
import { FilterContainer } from "./ListUsers.styles";

export default function ListUsers({ type = 2 }) {
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
    if (availableAgents == null) return;
    const fetchUsers = async () => {
      setPageLoading(true);
      try {
        const users = await AuthenticationService.getAllUsers(
          user.type,
          user.id,
          type
        );
        const copy = JSON.parse(JSON.stringify(users));
        setUsersForCSV(copy);

        users.map((user) => {
          if (user.phone) user.phone = phoneMask(user.phone);
          delete user.id;
          return user;
        });
        if (type == 3) {
          users.map((user) => {
            if (availableAgents.find((agent) => agent == user.name)) {
              return (user.online = "Sim");
            }

            user.online = "Não";
          });
        }
        setUsersList(users);
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
      user.email.includes(e.target.value)
    );

    setFilteredUsers(filter);
  };

  const CSVHeadersByType = (type) => {
    const types = {
      2: [
        { label: "Nome", key: "name" },
        { label: "Email", key: "email" },
        { label: "Telefone", key: "phone" },
        { label: "Status", key: "status" },
      ],
      3: [
        { label: "Nome", key: "name" },
        { label: "Especialidade", key: "speciality" },
        { label: "Status", key: "status" },
        { label: "Online", key: "online" },
      ],
      4: [
        { label: "Id", key: "id" },
        { label: "Nome", key: "name" },
        { label: "Email", key: "email" },
        { label: "Telefone", key: "phone" },
        { label: "Status", key: "status" },
        { label: "CPF", key: "cpf" },
      ],
    };

    return types[type];
  };

  const CSVHeaders = CSVHeadersByType(type);

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
        { name: "Especialidade", width: 250 },
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

  const customHeaders = customHeadersByType(type);

  const handleTitleByUserId = {
    2: "Editar Usuário",
    3: "Editar Médico",
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

      window.location.reload()
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
      {isOpen && (
        <Modal handleCloseIconClick={toogleIsOpen}>
          <h3>AVISO!</h3>
          <p>
            Essa ação irá apagar todos os funcionários cadastrados por esse
            usuário!{" "}
            <strong style={{ textDecoration: "underline" }}>
              Essa ação é irreversível.{" "}
            </strong>
            Recomendamos primeiramente exportar a planilha de funcionários nessa
            página clicando em{" "}
            <strong style={{ textDecoration: "underline" }}>
              "Exportar CSV"
            </strong>{" "}
            antes de prosseguir.
          </p>
          <p></p>
          <div
            style={{
              margin: "1rem 0",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Checkbox checked={checked} setChecked={toogleIsChecked} />
            <p>Estou ciente e concordo em prosseguir.</p>
          </div>

          <StyledButton
            text="Remover funcionários"
            disabled={!checked}
            onClick={handleDeleteUsers}
          />
        </Modal>
      )}
      <FilterContainer>
        <StyledInput
          htmlLabel={"Filtrar por email"}
          required={false}
          onChange={handleFilterUsers}
        />
        <CSVDownloadButton
          headers={CSVHeaders}
          data={usersForCSV}
          name="Relatorio_Usuarios"
        />
        <StyledButton text="Apagar meus Funcionários" onClick={toogleIsOpen} />
      </FilterContainer>
      <Table
        headers={customHeaders}
        content={filteredUsers || usersList}
        modal={{ type: type, title: handleTitleByUserId[type] }}
      />
    </>
  );
}
