import React, { useEffect, useState } from "react";
import {
  Container,
  DateShowContainer,
  FilterContainer,
} from "./UserCallsManagement.styles";
import Table from "shared/Table";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { CallsService } from "services/call";
import StyledInput from "shared/Input";
import Dropdown from "shared/Dropdown";
import { DateRange } from "react-date-range";
import {
  formatDateToDayMonthAndYear,
  formatDateToFirstDayOfMonth,
  substractDaysFromNewDate,
  toISOStringWithTimezone,
} from "utils/date/date";
import StyledButton from "shared/Button";
import { useUser } from "contexts/User/User";
import Modal from "shared/Modal";
import { ptBR } from "date-fns/locale";

export default function AdminCallsManagement() {
  const [callsList, setCallsList] = useState([]);
  const [filter, setFilter] = useState("");
  const { user } = useUser();

  const [date, setDate] = useState([
    {
      startDate: substractDaysFromNewDate(
        formatDateToFirstDayOfMonth(new Date())
      ),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { setPageLoading } = usePageLoader();

  const fetchCalls = async () => {
    setPageLoading(true);
    try {
      const startDate = formatDateToDayMonthAndYear(date[0]?.startDate);
      const endDate = formatDateToDayMonthAndYear(date[0]?.endDate);

      const calls = await CallsService.userGetAllCalls(
        startDate,
        endDate,
        user.id
      );

      setCallsList(calls);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };
  useEffect(() => {
    fetchCalls();
  }, []);

  const [filterType, setFilterType] = useState("callerName");

  const [filteredCalls, setFilteredCalls] = useState(null);

  const handleFilterCalls = (e) => {
    setFilter(e.target.value);
    if (!e?.target?.value) return setFilteredCalls(callsList);

    const filter = callsList.filter((calls) =>
      calls[filterType].toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredCalls(filter);
  };

  useEffect(() => {}, [filterType]);

  const handleFilterCallsByDateRange = (date) => {
    setDate(date);
    fetchCalls();
    setShowDatePicker(false);
  };

  const dropDownContent = [
    {
      value: "callerName",
      text: "Usuário",
    },
    {
      value: "receiverName",
      text: "Intérprete",
    },
  ];

  // useEffect(() => {
  //   handleFilterCallsByDateRange(date);
  // }, [callsList]);

  const handleToogleDatePicker = () => setShowDatePicker(true);

  const cleanFilters = () => {
    handleFilterCallsByDateRange([
      {
        startDate: substractDaysFromNewDate(30),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    setFilter("");
    setFilteredCalls(callsList);
    setDate([
      {
        startDate: substractDaysFromNewDate(30),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    document.getElementsByTagName("input")[0].value = "";
  };

  const color = user.colorScheme ? `rgb(${user.colorScheme})` : "#ff1922";

  useEffect(() => {
    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const spans = document.querySelectorAll(".rdrWeekDays span");

    spans.forEach((span, index) => {
      span.textContent = dias[index] || "";
    });
  }, [showDatePicker]);

  return (
    <Container>
      <h2>Atendimentos</h2>

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
              onClick={() => handleFilterCallsByDateRange(date)}
            />
          </div>
        </Modal>
      )}

      <FilterContainer>
        <StyledInput
          id="type"
          value={filter}
          fullWidth
          htmlLabel={"Filtrar por tipo"}
          required={false}
          onChange={handleFilterCalls}
        />
        <Dropdown
          value={filterType}
          onChange={setFilterType}
          htmlLabel="Tipo"
          content={dropDownContent}
        />
        <DateShowContainer>
          <h5>{`${formatDateToDayMonthAndYear(
            date[0]?.startDate
          )} a ${formatDateToDayMonthAndYear(date[0]?.endDate)}`}</h5>
          <StyledButton
            text={"Selecionar período"}
            onClick={handleToogleDatePicker}
            fullWidth
          />
        </DateShowContainer>
        <StyledButton text={"Limpar filtros"} onClick={cleanFilters} />
      </FilterContainer>
      <Table
        canEdit={false}
        headers={[
          { name: "Usuário" },
          { name: "Início", width: 180 },
          { name: "Duração", width: 180 },
          // { name: "Intérprete" },
          // { name: "Término", width: 180 },
          // { name: "Gravação", width: 100 },
        ]}
        content={filteredCalls || callsList}
      />
    </Container>
  );
}
