import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useUser } from "contexts/User/User";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { AuthenticationService } from "services/authentication";
import StyledButton from "shared/Button";
import Dropdown from "shared/Dropdown";
import LoaderContainer from "shared/LoaderContainer";
import Modal from "shared/Modal";
import {
  addDaysFromNewDate,
  formatDateToDayMonthAndYear,
  formatDateToYearMonthDate,
  substractDaysFromNewDate,
} from "utils/date/date";
import {
  AgendaHistoryCardContainer,
  AgendaPerPeriodContainer,
  Container,
  DateShowContainer,
  InputContainer,
} from "./AgendasPerUserComponent.styles";
import AgendaHistoryCard from "./components/AgendaHistoryCard";
import { ptBR } from "date-fns/locale";

export default function AgendasPerUserComponent() {
  const { user } = useUser();
  const [usersList, setUsersList] = useState([]);
  const [agendasList, setAgendasList] = useState([]);
  const [filteredUser, setFilteredUser] = useState(null);
  const { setPageLoading } = usePageLoader();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: substractDaysFromNewDate(-30),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setPageLoading(true);
        const userResponse = await AuthenticationService.getAllCompanyUsers(
          user.id
        );
        setUsersList(userResponse);
        setFilteredUser(userResponse[0].value);
      } catch (error) {
        setPageLoading(false);
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (usersList.length == 0) return;

    const fetchAgendas = async () => {
      try {
        const agendas = await AuthenticationService.getUserAgendaByUserId(
          filteredUser,
          formatDateToYearMonthDate(date[0].startDate),
          formatDateToYearMonthDate(date[0].endDate)
        );
        setAgendasList(agendas);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchAgendas();
  }, []);

  const handleChange = (e) => setFilteredUser(e);

  useEffect(() => {
    if (!filteredUser) return;
    handleSubmitFilter();
  }, [filteredUser]);

  const handleToogleDatePicker = () => {
    setShowDatePicker((prev) => !prev);

    if (showDatePicker) handleSubmitFilter();
  };

  const handleSubmitFilter = async () => {
    try {
      setPageLoading(true);
      const agendas = await AuthenticationService.getUserAgendaByUserId(
        filteredUser,
        formatDateToYearMonthDate(date[0].startDate),
        formatDateToYearMonthDate(date[0].endDate)
      );
      setAgendasList(agendas);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  const color = user.colorScheme ? `rgb(${user.colorScheme})` : "#5120bd";

  useEffect(() => {
    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const spans = document.querySelectorAll(".rdrWeekDays span");

    spans.forEach((span, index) => {
      span.textContent = dias[index] || "";
    });
  }, [showDatePicker]);

  return (
    <Container>
      <LoaderContainer />
      <h2>Agendamentos</h2>
      {showDatePicker && (
        <Modal
          handleCloseIconClick={() => setShowDatePicker(false)}
          fullWidth={false}
          title="Selecionar Período"
        >
          <DateRange
            locale={ptBR}
            weekStartsOn={1}
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            rangeColors={[color]}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StyledButton
              text="Aplicar filtro"
              type="button"
              onClick={handleToogleDatePicker}
            />
          </div>
        </Modal>
      )}
      <InputContainer>
        <Dropdown
          htmlLabel="Filtrar Médicos"
          onChange={handleChange}
          content={
            (usersList.length > 0 && usersList) || [{ text: "Carregando..." }]
          }
          value={filteredUser}
        />
        <DateShowContainer>
          <label>Selecionar período</label>
          <StyledButton
            text={"Selecionar período"}
            onClick={handleToogleDatePicker}
            fullWidth
          />
        </DateShowContainer>
        {/* <StyledButton text="Filtrar" onClick={handleSubmitFilter} /> */}
      </InputContainer>

      <h3 style={{ margin: "2rem 0 1rem 0" }}>
        Agendas do período selecionado:{" "}
        {`${formatDateToDayMonthAndYear(
          date[0]?.startDate
        )} até ${formatDateToDayMonthAndYear(date[0]?.endDate)}`}
      </h3>
      <AgendaPerPeriodContainer>
        <AgendaHistoryCardContainer>
          {agendasList.length > 0
            ? agendasList.map((register) => (
                <AgendaHistoryCard
                  key={register.date}
                  {...register}
                  emptyMessage="Não há agendas para esse dia."
                />
              ))
            : "Não há registros nesse período para o usuário selecionado."}
        </AgendaHistoryCardContainer>
      </AgendaPerPeriodContainer>
    </Container>
  );
}
