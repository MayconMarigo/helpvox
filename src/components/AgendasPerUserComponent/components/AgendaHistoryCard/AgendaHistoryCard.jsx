import React, { useEffect, useState } from "react";
import {
  ButtonsContainer,
  Container,
  InputContainer,
  TimeContainer,
  TimeHistoryContainer,
} from "./AgendaHistoryCard.styles";
import Modal from "shared/Modal";
import StyledInput from "shared/Input";
import StyledButton from "shared/Button";
import { useUser } from "contexts/User/User";
import { AuthenticationService } from "services/authentication";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useAlert } from "contexts/Alert/Alert";
import { checkErrorType } from "utils/error";
import { formatDateToYearMonthDate } from "utils/date/date";
import { BASE_DAILY_JS_URL } from "utils/constants";
import Dropdown from "shared/Dropdown";
import { detectKeyPress } from "utils/keyEvents";

export default function AgendaHistoryCard({
  date,
  history = [],
  emptyMessage = "",
  dontFetchUsers = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [textCopied, setTextCopied] = useState(false);
  const { user } = useUser();
  const { setPageLoading } = usePageLoader();
  const [associateId, setAssociateId] = useState(null);
  const [agendaId, setAgendaId] = useState(null);
  const [finalDateTime, setFinalDateTime] = useState(null);
  const { setContent } = useAlert();
  const [usersList, setUsersList] = useState(null);
  const [worker, setWorker] = useState(null);

  const handleModal = (info) => {
    setModalInfo(info);
    setIsOpen((prev) => !prev);
    setAssociateId(info.associateId);
    setAgendaId(info.agendaId);
    let formatDate = date.split("-").reverse().join("-");
    const finalDate = `${formatDate} ${info.startTime}:00`;
    setFinalDateTime(finalDate);
  };

  const handleCopyToClipboard = async (value) => {
    await navigator.clipboard.writeText(value);
    setTextCopied(true);
  };

  useEffect(() => {
    if (!textCopied) return;

    const timer = setTimeout(() => {
      setTextCopied(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [textCopied]);

  const handleDeleteCredential = async () => {
    try {
      setPageLoading(true);
      await AuthenticationService.deleteAvailability(agendaId);
      setContent({
        message: "Agendamento deletado com sucesso.",
        type: "sucesso",
        isOpen: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
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

  const handleAssociateAgenda = async () => {
    try {
      setPageLoading(true);
      await AuthenticationService.associateUserToCompanyAgenda(
        associateId,
        worker,
        agendaId,
        finalDateTime
      );
      setContent({
        message: "Agendamento realizado com sucesso.",
        type: "sucesso",
        isOpen: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
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

  useEffect(() => {
    const fetchUsers = async () => {
      if (dontFetchUsers) return;
      setPageLoading(true);
      try {
        const users = await AuthenticationService.getAllUsers(
          user.type,
          user.id
        );
        const mapper = users.map((user) => {
          return { value: user.id, text: user.name };
        });

        setWorker(mapper[0].value);
        setUsersList(mapper);
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => setWorker(e);

  useEffect(() => {
    document.addEventListener("keydown", (e) =>
      detectKeyPress(e, "Escape", setIsOpen(false))
    );

    return () =>
      document.removeEventListener("keydown", (e) =>
        detectKeyPress(e, "Escape", setIsOpen(false))
      );
  }, []);

  const formatDate = (dateValue) => {
    const day = dateValue.split("-")[0];
    const month = dateValue.split("-")[1];
    const year = dateValue.split("-")[2];

    const returnedDay = day.length == 1 ? `0${day}` : day;
    const returnedMonth = month.length == 1 ? `0${month}` : month;

    const returnedDate = `${returnedDay}/${returnedMonth}/${year}`;

    return returnedDate;
  };

  console.log(history);
  return (
    <Container>
      {isOpen && (
        <Modal
          title={`Agendamento do dia ${date} das ${modalInfo.startTime} às ${modalInfo.endTime}`}
          handleCloseIconClick={handleModal}
        >
          <InputContainer>
            <StyledInput
              disabled
              htmlLabel="Solicitante"
              value={modalInfo.applicant || "Disponível para agendamento"}
              required={false}
            />
            <StyledInput
              disabled
              htmlLabel="Solicitado"
              required={false}
              value={modalInfo.requested}
            />
          </InputContainer>
          {modalInfo.callUrl ? (
            <>
              <InputContainer style={{ margin: "1rem 0" }}>
                <StyledInput
                  disabled
                  htmlLabel="Link da sala de reunião"
                  required={false}
                  value={`${BASE_DAILY_JS_URL}/${modalInfo.callUrl}`}
                />
              </InputContainer>
              <ButtonsContainer>
                <StyledButton
                  text="Copiar Link da Sala de reunião"
                  type="button"
                  onClick={() =>
                    handleCopyToClipboard(
                      `${BASE_DAILY_JS_URL}/${modalInfo.callUrl}`
                    )
                  }
                />
              </ButtonsContainer>
            </>
          ) : (
            <ButtonsContainer>
              {user.type == "company" && (
                <>
                  <Dropdown
                    htmlLabel="Funcionário para agendamento"
                    content={usersList}
                    value={worker}
                    onChange={handleChange}
                  />
                  <StyledButton
                    text="Realizar agendamento"
                    type="button"
                    onClick={() => handleAssociateAgenda()}
                  />
                </>
              )}
              {user.type == "agent" && (
                <StyledButton
                  text="Cancelar disponibilidade"
                  type="button"
                  onClick={() => handleDeleteCredential()}
                />
              )}
            </ButtonsContainer>
          )}

          {textCopied && (
            <p style={{ marginTop: "0.5rem", color: "green" }}>
              Link copiado com sucesso!
            </p>
          )}
        </Modal>
      )}

      <h4>{formatDate(date)}</h4>
      <TimeHistoryContainer>
        {history?.length > 0 ? (
          history.map((registry) => (
            <TimeContainer
              isUnavailable={registry.applicant}
              key={registry.startTime}
              onClick={() => handleModal(registry)}
            >
              <span>{registry.startTime}h</span>
              <span>às</span>
              <span> {registry.endTime}h</span>
            </TimeContainer>
          ))
        ) : (
          <span>{emptyMessage}</span>
        )}
      </TimeHistoryContainer>
    </Container>
  );
}
