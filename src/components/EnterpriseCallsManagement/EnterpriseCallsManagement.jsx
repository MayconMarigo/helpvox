import React, { useEffect, useState } from "react";
import {
  Container,
  DateShowContainer,
  FilterContainer,
} from "./EnterpriseCallsManagement.styles";
import Table from "shared/Table";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { CallsService } from "services/call";
import StyledInput from "shared/Input";
import Dropdown from "shared/Dropdown";
import { DateRange } from "react-date-range";
import {
  formatDateToDayMonthAndYear,
  substractDaysFromNewDate,
  toISOStringWithTimezone,
} from "utils/date/date";
import StyledButton from "shared/Button";
import { useUser } from "contexts/User/User";
import Modal from "shared/Modal";

export default function EnterpriseCallsManagement() {
  const [callsList, setCallsList] = useState([]);
  const [filter, setFilter] = useState("");
  const { user } = useUser();

  const [date, setDate] = useState([
    {
      startDate: substractDaysFromNewDate(30),
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

      const calls = await CallsService.getAllCallsByCompanyId(
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

  // const formatEndDate = (date) =>
  //   `${toISOStringWithTimezone(date).split("T")[0]}T23:59:00.000Z`;

  // const formatStartDate = (date) =>
  //   `${toISOStringWithTimezone(date).split("T")[0]}T00:00:00.000Z`;

  const handleFilterCallsByDateRange = (date) => {
    // const { startDate, endDate } = date[0];

    // const filter = callsList.filter(
    //   (call) =>
    //     formatStartDate(startDate) < call.formattedStartTime &&
    //     formatEndDate(endDate) > call.formattedEndTime
    // );

    // setFilteredCalls(filter);
    setDate(date);
    fetchCalls();
    setShowDatePicker(false);

    // setPageLoading(false);
  };

  const dropDownContent = [
    {
      value: "callerName",
      text: "Usuário",
    },
    {
      value: "receiverName",
      text: "Médico",
    },
    // {
    //   value: "videoUrl",
    //   text: "Gravação",
    // },
    // {
    //   value: "callDuration",
    //   text: "Duração",
    // },
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

  const color = user.colorScheme ? `rgb(${user.colorScheme})` : "#5120bd";

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
          { name: "Médico" },
          { name: "Início", width: 180 },
          // { name: "Término", width: 180 },
          // { name: "Gravação", width: 100 },
          // { name: "Duração", width: 60 },
        ]}
        content={filteredCalls || callsList}
      />
    </Container>
  );
}
