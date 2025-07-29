import AgendaHistoryCard from "components/AgendasPerUserComponent/components/AgendaHistoryCard";
import {
  CardsContainer,
  NextDaysAgendaContainer,
  RegisterContainer,
} from "components/AgentAgendaManagement/AgentAgendaManagement.styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useUser } from "contexts/User/User";
import { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import { AuthenticationService } from "services/authentication";
import LoaderContainer from "shared/LoaderContainer";
import { formatDateToYearMonthDate } from "utils/date/date";
import {
  Container,
  DateDisplay,
  InfoDisplay,
} from "./AgentScheduleManagement.styles";
import { BASE_DAILY_JS_URL } from "utils/constants";

export default function AgentScheduleManagement() {
  const [agendaList, setAgendaList] = useState([]);
  const { setPageLoading } = usePageLoader();
  const [date, setDate] = useState(new Date());

  const { user } = useUser();

  const handleChangeDate = (e) => setDate(e);

  const handleLoadAgenda = async () => {
    try {
      const { id } = user;
      setPageLoading(true);
      const agendaResponse =
        await AuthenticationService.getUserScheduledyUserId(
          id,
          formatDateToYearMonthDate(date)
        );

      const mapper = agendaResponse.map((external) => {
        return external.history.map((internal, index) => {
          return {
            title: `${internal.startTime} - ${internal.applicant}`,
            date: external.date,
            url: `${BASE_DAILY_JS_URL}/${internal.callUrl}`,
            id: internal.agendaId,
          };
        });
      });

      const flattenedArray = mapper.flatMap((value) => value);

      setAgendaList(flattenedArray);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    handleLoadAgenda();
  }, [date]);

  const handleMouseEnter = (e) => {
    setTargetId(e.target.id);
    setShowHint(true);
  };
  const handleMouseLeave = () => setShowHint(false);

  const [showHint, setShowHint] = useState(false);
  const [targetId, setTargetId] = useState(null);

  const renderEventContent = (eventInfo) => {
    const name = eventInfo.event.title.split(" - ")[0];
    const scheduledTime = eventInfo.event.title.split(" - ")[1];
    return (
      <div
        style={{ display: "flex", justifyContent: "center" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={eventInfo.event.id}
      >
        {showHint && eventInfo.event.id == targetId && (
          <InfoDisplay>
            <span>Agendamento: {name}</span>
            <span>Horário: {scheduledTime}</span>
          </InfoDisplay>
        )}
        <DateDisplay id={eventInfo.event.id}>
          {eventInfo.event.title}
        </DateDisplay>
      </div>
    );
  };

  const handleClick = (info) => {
    info.jsEvent.preventDefault();

    if (info.event.url) {
      window.open(info.event.url);
    }
  };

  return (
    <>
      <LoaderContainer />
      <Container>
        <h2>Agendamentos</h2>

        <FullCalendar
          locale="pt"
          weekends={false}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={agendaList}
          eventContent={renderEventContent}
          eventClick={handleClick}
          eventBackgroundColor={
            user.colorScheme ? `rgb(${user.colorScheme})` : "#5120bd"
          }
          eventBorderColor={
            user.colorScheme ? `rgb(${user.colorScheme})` : "#5120bd"
          }
          buttonText={{ today: "Hoje" }}
        />
      </Container>
    </>
  );
}
