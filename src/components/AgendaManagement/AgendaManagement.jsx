import React, { useEffect, useState } from "react";
import { Container, FilterContainer } from "./AgendaManagement.styles";
import StyledInput from "shared/Input";
import Dropdown from "shared/Dropdown";
import { DateShowContainer } from "components/AdminCallsManagement/AdminCallsManagement.styles";
import StyledButton from "shared/Button";
import {
  formatDateToDayMonthAndYear,
  substractDaysFromNewDate,
} from "utils/date/date";
import { useUser } from "contexts/User/User";
import Modal from "shared/Modal";
import { DateRange } from "react-date-range";
import Table from "shared/Table";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { ptBR } from "date-fns/locale";

export default function AgendaManagement() {
  const { user } = useUser();
  const [filterType, setFilterType] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { setPageLoading } = usePageLoader();

  useEffect(() => {
    const fetchUsers = async () => {
      setPageLoading(true);
      try {
        const users = await AuthenticationService.getAllUsers();
        setUsersList(users);
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterCallsByDateRange = (date) => {
    const { startDate, endDate } = date[0];
  };

  const cleanFilters = () => {
    handleFilterCallsByDateRange([
      {
        startDate: substractDaysFromNewDate(30),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    setDate([
      {
        startDate: substractDaysFromNewDate(30),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    document.getElementsByTagName("input")[0].value = "";
  };

  const [date, setDate] = useState([
    {
      startDate: substractDaysFromNewDate(30),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const dropDownContent = [
    {
      value: "callerName",
      text: "Usuário",
    },
    {
      value: "receiverName",
      text: "Médico",
    },
    {
      value: "videoUrl",
      text: "Gravação",
    },
    {
      value: "callDuration",
      text: "Duração",
    },
  ];

  useEffect(() => {
    handleFilterCallsByDateRange(date);
  }, [usersList]);

  const handleToogleDatePicker = () => setShowDatePicker(true);

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
            <StyledButton text="Aplicar filtro" type="button" />
          </div>
        </Modal>
      )}

      <FilterContainer>
        <Dropdown
          value={filterType}
          onChange={setFilterType}
          htmlLabel="Usuários"
          content={dropDownContent}
        />
        <DateShowContainer>
          <h5>
            {`${formatDateToDayMonthAndYear(
              date[0]?.startDate
            )} a ${formatDateToDayMonthAndYear(date[0]?.endDate)}`}
          </h5>
          <StyledButton
            text={"Selecionar período"}
            onClick={handleToogleDatePicker}
            fullWidth
          />
        </DateShowContainer>
        <StyledButton
          text={"Limpar filtros"}
          // onClick={cleanFilters}
        />
      </FilterContainer>

      <Table
        canEdit={false}
        headers={[
          { name: "Usuário" },
          { name: "Data", width: 250 },
          { name: "Gravação" },
        ]}
        content={usersList}
      />
    </Container>
  );
}
