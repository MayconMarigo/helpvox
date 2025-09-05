import React, { useEffect, useState } from "react";
import * as locales from "react-date-range/dist/locale";
import {
  AlreadyRegisteredDateContainer,
  CardsContainer,
  CheckboxContainer,
  Container,
  DatePickerContainer,
  InputsContainer,
  NextDaysAgendaContainer,
  RegisterContainer,
  RegisterNewAgendaContainer,
  SubmitContainer,
} from "./AgentAgendaManagement.styles";
import { Calendar } from "react-date-range";
import { useUser } from "contexts/User/User";
import AgendaHistoryCard from "components/AgendasPerUserComponent/components/AgendaHistoryCard";
import Dropdown from "shared/Dropdown";
import StyledInput from "shared/Input";
import StyledButton from "shared/Button";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { AuthenticationService } from "services/authentication";
import { formatDateToYearMonthDate } from "utils/date/date";
import LoaderContainer from "shared/LoaderContainer";
import { availableTimeToSchedule } from "utils/constants";
import Checkbox from "shared/Checkbox/Checkbox";
import { useAlert } from "contexts/Alert/Alert";
import { ptBR } from "date-fns/locale";

export default function AgentAgendaManagement() {
  const { user } = useUser();
  const [date, setDate] = useState(new Date());
  const { setPageLoading } = usePageLoader();
  const [agendaList, setAgendaList] = useState([]);
  const [firstAgenda, setFirstAgenda] = useState([]);
  const [availableTimeToScheduleArray, setAvailableTimeToScheduleArray] =
    useState([]);
  const [dropdownDate, setDropdownDate] = useState(null);
  const [startPeriodTime, setStartPeriodTime] = useState("");
  const [endPeriodTime, setEndPeriodTime] = useState("");
  const { setContent } = useAlert();

  const formatAvailabilityArray = (
    availabilityArray,
    comparissonArray = []
  ) => {
    if (comparissonArray.length == 0) {
      const arr = availableTimeToSchedule.map((v) => {
        return { text: v, value: v };
      });

      setAvailableTimeToScheduleArray(arr);
    }

    const filtered = availabilityArray
      .filter((time) => !comparissonArray.includes(time))
      .map((value) => {
        return { value: value, text: value };
      });
    setAvailableTimeToScheduleArray(filtered);
  };

  useEffect(() => {
    setDropdownDate(availableTimeToScheduleArray[0]?.value);
  }, [availableTimeToScheduleArray]);

  const handleLoadAgenda = async () => {
    try {
      const { id } = user;
      setPageLoading(true);
      const agendaResponse = await AuthenticationService.getUserAgendaByUserId(
        id,
        formatDateToYearMonthDate(date)
      );

      const compare = formatDateToYearMonthDate(date)
        .split("-")
        .reverse()
        .join("-");
      let firstAgendaShift = [];
      if (agendaResponse.find((value) => value.date == compare)) {
        setFirstAgenda(firstAgendaShift);
      } else {
        setFirstAgenda([]);
      }
      const timeArray =
        firstAgendaShift?.history?.map((res) => res.startTime) || [];

      formatAvailabilityArray(availableTimeToSchedule, timeArray);

      setAgendaList(agendaResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    handleLoadAgenda();
  }, [date]);

  const validTimes = (() => {
    const times = [];
    for (let h = 8; h <= 17; h++) {
      ["00", "30"].forEach((m) => {
        if (h === 17 && m === "30") return;
        const hour = h.toString().padStart(2, "0");
        times.push(`${hour}:${m}`);
      });
    }
    return new Set(times);
  })();

  const formatTime = (input) => {
    let raw = input.replace(/\D/g, "");

    if (raw.length > 4) raw = raw.slice(0, 4);
    if (raw.length >= 3) {
      return raw.slice(0, 2) + ":" + raw.slice(2);
    }
    return raw;
  };

  const handleChange = (e, setState) => {
    const raw = e.target.value;
    const formatted = formatTime(raw);

    if (formatted.length === 5 && !validTimes.has(formatted)) {
      return;
    }

    setState(formatted);
  };

  const handleChangeDate = (e) => setDate(e);

  const handleChangeDropdownDate = (e) => setDropdownDate(e);

  const [checked, setChecked] = useState("period");

  const handleRegisterAgenda = async (type) => {
    const payload = {};
    const query = {};
    payload.date = formatDateToYearMonthDate(date);
    if (type == "unique") {
      payload.timeRange = [dropdownDate];
      query.multiple = false;
    } else {
      const periodArray = availableTimeToScheduleArray
        .filter((timeObj) => {
          if (
            timeObj.value >= startPeriodTime &&
            timeObj.value < endPeriodTime
          ) {
            return timeObj.value;
          }
        })
        .map((timeObj) => timeObj.value);

      payload.timeRange = periodArray;
      query.multiple = true;
    }

    try {
      await AuthenticationService.createUserAvailability(
        payload,
        query.multiple,
        user.id
      );

      setContent({
        message: "Horário cadastrado com sucesso.",
        type: "sucesso",
        isOpen: true,
      });
    } catch (error) {
      setContent({
        message:
          "Erro ao cadastrar disponibilidade, tente novamente em alguns instantes.",
        type: "erro",
        isOpen: true,
      });
    } finally {
      handleLoadAgenda();
    }
  };

  useEffect(() => {
    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const spans = document.querySelectorAll(".rdrWeekDays span");

    spans.forEach((span, index) => {
      span.textContent = dias[index] || "";
    });
  }, []);

  return (
    <>
      <LoaderContainer />
      <Container>
        <h2 style={{ color: "#5120bd" }}>Cadastro de disponibilidade</h2>

        <h4>Selecione uma data abaixo</h4>
        <RegisterContainer>
          <Calendar
            locale={ptBR}
            weekStartsOn={1}
            date={date}
            onChange={handleChangeDate}
            color={user?.colorScheme ? `rgb(${user?.colorScheme})` : "#5120bd"}
          />

          <RegisterNewAgendaContainer>
            <CheckboxContainer>
              <Checkbox
                checked={checked == "period"}
                setChecked={() => setChecked("period")}
              />
              <h4 style={{ marginBottom: "1rem" }}>Cadastrar por período</h4>
            </CheckboxContainer>
            <InputsContainer>
              <StyledInput
                htmlLabel="Horário Inicial"
                placeHolder="HH:MM"
                required={checked !== "unique"}
                disabled={checked == "unique"}
                value={startPeriodTime}
                onChange={(e) => handleChange(e, setStartPeriodTime)}
              />
              <StyledInput
                htmlLabel="Horário Final"
                placeHolder="HH:MM"
                required={checked !== "unique"}
                disabled={checked == "unique"}
                value={endPeriodTime}
                onChange={(e) => handleChange(e, setEndPeriodTime)}
              />
            </InputsContainer>

            <p style={{ marginTop: "1rem" }}>
              * Período cadastrado será dividido em intervalos de 30 minutos.
              exemplo: <br />
              Período das <strong>09:00 até 10:30: </strong>
              Uma consulta das <strong>09:00 às 09:30</strong>, uma das{" "}
              <strong>09:30 às 10:00</strong> e uma das{" "}
              <strong>10:00 às 10:30.</strong>
            </p>
            <CheckboxContainer style={{ margin: "1.25rem 0" }}>
              <Checkbox
                checked={checked == "unique"}
                setChecked={() => setChecked("unique")}
              />
              <h4>Cadastrar apenas um horário</h4>
            </CheckboxContainer>
            <SubmitContainer>
              <Dropdown
                value={dropdownDate}
                onChange={handleChangeDropdownDate}
                htmlLabel="Lista de horários disponíveis"
                content={availableTimeToScheduleArray}
                disabled={checked == "period"}
              />
              <StyledButton
                disabled={
                  checked == "period"
                    ? !startPeriodTime || !endPeriodTime
                    : false
                }
                text="Cadastrar"
                type="text"
                onClick={() => handleRegisterAgenda(checked)}
              />
            </SubmitContainer>
          </RegisterNewAgendaContainer>
        </RegisterContainer>
        <NextDaysAgendaContainer>
          <h2>Disponibilidade dos próximos 5 dias</h2>
          <CardsContainer>
            {agendaList.length > 0
              ? agendaList.map((register) => (
                  <AgendaHistoryCard
                    {...register}
                    emptyMessage="Não há agendas para esse dia."
                    dontFetchUsers
                  />
                ))
              : "Não há horários agendados para os próximos 5 dias."}
          </CardsContainer>
        </NextDaysAgendaContainer>
      </Container>
    </>
  );
}
