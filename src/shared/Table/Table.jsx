import { useAlert } from "contexts/Alert/Alert";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useUser } from "contexts/User/User";
import { useEffect, useState } from "react";
import { AuthenticationService } from "services/authentication";
import StyledButton from "shared/Button";
import Dropdown from "shared/Dropdown";
import StyledInput from "shared/Input";
import LoaderContainer from "shared/LoaderContainer";
import Modal from "shared/Modal";
import StyledToogle from "shared/Toogle/Toogle";
import { SUCCESS_MESSAGES } from "utils/constants";
import { encryptWithCypher } from "utils/encryption";
import {
  formatPhoneToBackend,
  limitQuantityOfCharacters,
} from "utils/formatter";
import { phoneMask } from "utils/mask/mask";
import { v4 as uuidv4 } from "uuid";
import {
  ButtonsContainer,
  InputContainer,
  NumberedButton,
  PaginationContainer,
  TableBody,
  TableContainer,
  TableData,
  TableHead,
  TableRow,
} from "./Table.styles";

export default function Table({
  headers,
  content,
  canEdit = true,
  modal = { type: "2", title: "Editar Usuário" },
}) {
  const ITEMS_PER_PAGE = 10;

  const { user } = useUser();
  const { setContent } = useAlert();
  const { setPageLoading } = usePageLoader();

  const [filteredContentPerPage, setFilteredContentPerPage] = useState();
  const [pagesQuantity, setPagesQuantity] = useState(5);
  const [actualPage, setActualPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [oldEmailOrName, setOldEmailOrName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("");
  const [status, setStatus] = useState(true);
  const [document, setDocument] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [role, setRole] = useState();
  const [companyRoles, setCompanyRoles] = useState(null);

  useEffect(() => {
    if (user.type !== "company") return;

    const fetchDepartments = async () => {
      try {
        const departments =
          await AuthenticationService.getAllDepartmentsByCompanyId(user.id);

        const clone = departments.map((department) => {
          return {
            value: department.name,
            text: department.name,
          };
        });
        const roles = [{ value: "0", text: "Escolha o setor" }];
        roles.push(...clone);

        setCompanyRoles(roles);
        setRole(clone[0].value);
      } catch (error) {}
    };
    fetchDepartments();
  }, [userType]);

  useEffect(() => {
    const sliced = content.slice(
      (actualPage - 1) * ITEMS_PER_PAGE,
      ITEMS_PER_PAGE * actualPage
    );
    setFilteredContentPerPage(sliced);
  }, [actualPage, content]);

  useEffect(() => {
    const TOTAL_PAGES = Math.ceil(content.length / ITEMS_PER_PAGE);
    setPagesQuantity(TOTAL_PAGES);
  }, [content]);

  const handlePage = (index) => setActualPage(index);

  const handleUserType = (type) =>
    type === "admin" ? "1" : type === "company" ? "2" : "3";

  const handleStatusType = (type) => (type === "Ativo" ? "1" : "0");

  const handleCloseModal = () => {
    setLoading(false);
    setIsOpen((previous) => !previous);
  };

  const handleEditUser = (line) => {
    setIsOpen(true);
    setPassword("");
    setFullName(line.name);
    setEmail(line.email);
    setPhone(line.phone);
    setDocument(line.cpf);
    const userType = handleUserType(line.userTypeId);
    setUserType(userType);
    const statusStype = handleStatusType(line.status);
    setStatus(statusStype);
  };

  const handleEditWorker = (line) => {
    setIsOpen(true);
    setPassword("");
    setFullName(line.name);
    setEmail(line.email);
    setPhone(line.phone);
    setDocument(line.cpf);
    const userType = handleUserType(line.userTypeId);
    setUserType(userType);
    const statusStype = handleStatusType(line.status);
    setStatus(statusStype);
    setRole(line.speciality);
  };

  const handleEditPhysician = (line) => {
    setIsOpen(true);
    setOldEmailOrName(line.name);
    setFullName(line.name);
    setSpeciality(line.speciality);
    const statusStype = handleStatusType(line.status);
    setStatus(statusStype);
  };

  const handleStatus = () => {
    const st = status === "1" ? "0" : "1";

    setStatus(st);
    setCredentialStatus(st);
  };

  const handleSubmitEditCredential = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await AuthenticationService.updateCredential(
        credentialName,
        credentialStatus
      );

      setContent({
        message: SUCCESS_MESSAGES.CREDENTIAL_SUCESSFULL_UPDATED,
        type: "sucesso",
        isOpen: true,
      });
      setLoading(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setContent({
        message:
          "Erro ao atualizar credencial, tente novamente em alguns instantes.",
        type: "erro",
        isOpen: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEditUser = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      nm: encryptWithCypher(fullName),
      em: encryptWithCypher(email),
      pn: encryptWithCypher(formatPhoneToBackend(phone)),
      pw: encryptWithCypher(password),
      sts: encryptWithCypher(status),
    };

    if (modal.type == "4") {
      payload.esp = role;
    }

    try {
      await AuthenticationService.updateUser(payload, user.type, modal.type);

      setContent({
        message: SUCCESS_MESSAGES.USER_SUCESSFULL_UPDATED,
        type: "sucesso",
        isOpen: true,
      });

      window.location.reload();
    } catch (error) {
      setContent({ message: error.message, type: "erro", isOpen: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEditPhysician = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      nm: encryptWithCypher(fullName),
      oem: encryptWithCypher(oldEmailOrName),
      pw: encryptWithCypher(password),
      sts: encryptWithCypher(status),
    };

    try {
      await AuthenticationService.updateUser(payload, user.type, modal.type);

      setContent({
        message: SUCCESS_MESSAGES.USER_SUCESSFULL_UPDATED,
        type: "sucesso",
        isOpen: true,
      });

      window.location.reload();
    } catch (error) {
      setContent({ message: error.message, type: "erro", isOpen: true });
    } finally {
      setLoading(false);
    }
  };

  const checkValueType = (value) => {
    try {
      if (new Date(value) == "Invalid Date") throw new Error();

      new Date(value);

      const start = value.split("T")[0].split("-").reverse().join("/");
      const end = value.split("T")[1].split(".")[0];

      return `${start} ${end}`;
    } catch (error) {
      return value;
    }
  };

  const [credentialName, setCredentialName] = useState("");
  const [credentiateName, setCredentiateName] = useState("");
  const [credentialStatus, setCredentialStatus] = useState(null);

  const handleEditCredential = (line) => {
    setIsOpen(true);
    setCredentialName(line.credential);
    setCredentiateName(line.user_name);
    const statusStype = handleStatusType(line.status);
    setCredentialStatus(statusStype);
  };

  const handleSubmitByType = {
    2: handleSubmitEditUser,
    3: handleSubmitEditPhysician,
    credential: handleSubmitEditCredential,
    4: handleSubmitEditUser,
  };

  const handleEditByType = {
    2: handleEditUser,
    3: handleEditPhysician,
    credential: handleEditCredential,
    4: handleEditWorker,
  };

  const modalByType = {
    2: (
      <>
        <InputContainer>
          <StyledInput
            disabled={loading}
            value={fullName}
            htmlLabel={"Nome Completo"}
            placeHolder="Digite o nome completo..."
            setValue={setFullName}
            fullWidth
            required
          />
          <StyledInput
            disabled
            value={email}
            htmlLabel={"Email"}
            placeHolder="Digite o email..."
            setValue={setEmail}
            fullWidth
          />
          <StyledToogle
            fullWidth
            htmlLabel={"Status"}
            active={status}
            onClick={handleStatus}
            disabled={loading}
            colorScheme={user.colorScheme}
          />
        </InputContainer>
        <InputContainer>
          <StyledInput
            disabled={loading}
            value={password}
            htmlLabel={"Senha"}
            placeHolder="Digite a senha..."
            setValue={setPassword}
            type="password"
            required={false}
            fullWidth
          />
          <StyledInput
            disabled={loading}
            value={phoneMask(phone)}
            htmlLabel={"Telefone"}
            placeHolder="Digite o telefone..."
            setValue={setPhone}
            fullWidth
            required={false}
            maxLength={15}
          />
        </InputContainer>

        <StyledButton text="Salvar alteração" type="submit" loading={loading} />
      </>
    ),
    3: (
      <>
        <InputContainer>
          <StyledInput
            required
            disabled={loading}
            value={fullName}
            htmlLabel={"Nome Completo"}
            placeHolder="Digite o nome completo..."
            setValue={setFullName}
            fullWidth
          />
          <StyledInput
            required={false}
            disabled={loading}
            value={password}
            htmlLabel={"Senha"}
            placeHolder="Digite a senha..."
            setValue={setPassword}
            type="password"
            fullWidth
          />
          <StyledToogle
            fullWidth
            htmlLabel={"Status"}
            active={status}
            onClick={handleStatus}
            disabled={loading}
            colorScheme={user.colorScheme}
          />
        </InputContainer>
        <InputContainer>
          <StyledInput
            disabled
            value={speciality}
            htmlLabel={"Função"}
            fullWidth
          />
        </InputContainer>
        <StyledButton text="Salvar alteração" type="submit" loading={loading} />
      </>
    ),
    4: (
      <>
        <InputContainer>
          <StyledInput
            disabled={loading}
            value={fullName}
            htmlLabel={"Nome Completo"}
            placeHolder="Digite o nome completo..."
            setValue={setFullName}
            fullWidth
          />
          <StyledInput
            disabled={loading}
            value={email}
            htmlLabel={"Email"}
            placeHolder="Digite o email..."
            setValue={setEmail}
            fullWidth
          />
          <StyledToogle
            fullWidth
            htmlLabel={"Status"}
            active={status}
            onClick={handleStatus}
            disabled={loading}
            colorScheme={user.colorScheme}
          />
        </InputContainer>
        <InputContainer>
          <StyledInput
            disabled={loading}
            value={password}
            htmlLabel={"Senha"}
            placeHolder="Digite a senha..."
            setValue={setPassword}
            type="password"
            required={false}
            fullWidth
          />
          <StyledInput
            disabled={true}
            value={document}
            htmlLabel={"CPF"}
            fullWidth
            required={false}
          />
          <StyledInput
            disabled={loading}
            value={phoneMask(phone)}
            htmlLabel={"Telefone"}
            placeHolder="Digite o telefone..."
            setValue={setPhone}
            fullWidth
            required={false}
            maxLength={15}
          />
        </InputContainer>
        {companyRoles && (
          <InputContainer>
            <Dropdown
              id="dropdown"
              value={role}
              htmlLabel={"Setor"}
              onChange={setRole}
              content={companyRoles}
            />
          </InputContainer>
        )}

        <StyledButton text="Salvar alteração" type="submit" loading={loading} />
      </>
    ),
    credential: (
      <>
        <InputContainer>
          <StyledInput
            disabled={true}
            value={credentialName}
            htmlLabel={"Credencial"}
            placeHolder="Digite a credencial..."
            setValue={setCredentialName}
            fullWidth
          />
          <StyledToogle
            fullWidth
            htmlLabel={"Status"}
            active={credentialStatus}
            onClick={handleStatus}
            disabled={loading}
            colorScheme={user.colorScheme}
          />
        </InputContainer>
        <StyledButton text="Salvar alteração" type="submit" loading={loading} />
      </>
    ),
  };

  return (
    <>
      {isOpen && canEdit && (
        <Modal
          title={modal.title}
          handleCloseIconClick={handleCloseModal}
          handleSubmit={handleSubmitByType[modal.type]}
        >
          {modalByType[modal.type]}
        </Modal>
      )}

      <TableContainer>
        <TableHead colorScheme={user.colorScheme}>
          {headers?.map((header) => (
            <TableData key={header.name} width={header.width}>
              {header.name}
            </TableData>
          ))}
        </TableHead>
        <LoaderContainer>
          <TableBody>
            {filteredContentPerPage?.map((line, i) => (
              <TableRow
                colorScheme={user.colorScheme}
                key={uuidv4()}
                onClick={() => canEdit && handleEditByType[modal.type](line)}
              >
                {Object.values(line).map((value, index) => (
                  <TableData key={uuidv4()} width={headers[index]?.width}>
                    <h4>{headers[index]?.name}:&nbsp;</h4>
                    {limitQuantityOfCharacters(checkValueType(value), 50)}
                  </TableData>
                ))}
              </TableRow>
            ))}
          </TableBody>
          {content.length == 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <p>Não há dados para exibir.</p>
            </div>
          )}
        </LoaderContainer>
      </TableContainer>
      {content.length > ITEMS_PER_PAGE && (
        <PaginationContainer>
          <button
            style={{
              border: "none",
              cursor: `${actualPage !== 1 ? "pointer" : "not-allowed"}`,
            }}
            disabled={actualPage == 1}
            onClick={() => handlePage(actualPage - 1)}
          >
            &larr;
          </button>
          <ButtonsContainer>
            {pagesQuantity &&
              Array(pagesQuantity)
                .fill()
                .map(
                  (page, index) =>
                    index <= actualPage + 8 &&
                    index >= actualPage - 8 && (
                      <NumberedButton
                        key={uuidv4()}
                        colorScheme={user.colorScheme}
                        selected={index + 1 == actualPage}
                        onClick={() => handlePage(index + 1)}
                      >
                        {index + 1}
                      </NumberedButton>
                    )
                )}
          </ButtonsContainer>
          <button
            style={{
              border: "none",
              cursor: `${
                actualPage !== pagesQuantity ? "pointer" : "not-allowed"
              }`,
            }}
            disabled={actualPage == pagesQuantity}
            onClick={() => handlePage(actualPage + 1)}
          >
            &rarr;
          </button>
        </PaginationContainer>
      )}
    </>
  );
}
