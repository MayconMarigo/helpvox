import React, { useEffect, useState } from "react";
import {
  CardsContainer,
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
import { ptBR } from "date-fns/locale";
import DashboardCard from "components/DashboardsComponent/components/DashboardCard/DashboardCard";

export default function EnterpriseCallsManagement() {
  const [callsList, setCallsList] = useState([]);
  const [dashboardItemsList, setDashboardItemsList] = useState([
    { title: "Atendimentos", value: "Calculando" },
    { title: "Total de Minutos", value: "Calculando" },
  ]);
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

      const response = await CallsService.getAllCallsByCompanyId(
        startDate,
        endDate,
        user.id
      );

      setCallsList(response?.calls);
      setDashboardItemsList(response?.dashboardItems);
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
    const sumCallDurations = (calls) => {
      return calls.reduce((total, call) => {
        const [hours, minutes] = call.callDuration.split(":").map(Number);
        const durationInMinutes = hours * 60 + minutes;
        return total + durationInMinutes;
      }, 0);
    };

    setFilter(e.target.value);
    if (!e?.target?.value) {
      setFilteredCalls(callsList);
      const durationInMinutes = sumCallDurations(callsList);
      const totalCalls = callsList.length;

      const filteredDashboardItemsList = [
        { title: "Atendimentos", value: totalCalls },
        { title: "Total de Minutos", value: durationInMinutes },
      ];

      setDashboardItemsList(filteredDashboardItemsList);

      return;
    }

    const filter = callsList.filter((calls) =>
      calls[filterType].toLowerCase().includes(e.target.value.toLowerCase())
    );

    const durationInMinutes = sumCallDurations(filter || callsList);
    const totalCalls = filter.length;

    const filteredDashboardItemsList = [
      { title: "Atendimentos", value: totalCalls },
      { title: "Total de Minutos", value: durationInMinutes },
    ];
    setFilteredCalls(filter);
    setDashboardItemsList(filteredDashboardItemsList);
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
      text: "Médico",
    },
    {
      value: "department",
      text: "Setor",
    },
  ];

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

      <CardsContainer>
        {dashboardItemsList.map((card) => (
          <DashboardCard title={card?.title} value={card?.value} />
        ))}
      </CardsContainer>

      <Table
        canEdit={false}
        headers={[
          { name: "Usuário" },
          { name: "Médico" },
          { name: "Setor", width: 180 },
          { name: "Especialidade", width: 180 },
          { name: "Início", width: 180 },
          { name: "Duração", width: 60 },
        ]}
        content={filteredCalls || callsList}
      />
    </Container>
  );
}
