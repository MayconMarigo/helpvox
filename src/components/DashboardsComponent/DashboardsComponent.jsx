import React from "react";
import {
  ButtonContainer,
  CardsContainer,
  ChartContainer,
  Container,
} from "./DashboardsComponent.styles";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import BasicLineChart from "shared/LineChart/LineChart";
import LoaderContainer from "shared/LoaderContainer";
import CSVDownloadButton from "shared/CSVDownloadButton/CSVDownloadButton";
import { months } from "utils/constants";
import { useUser } from "contexts/User/User";

export default function DashboardsComponent({ list = [], dataToShow }) {
  const { user } = useUser();
  const formatDataToShow = (data) => {
    const arr = new Array(12).fill(0);
    data?.forEach((el) => {
      arr[Number(el.month)] = el.calls_quantity;
    });

    return arr;
  };

  const formatDataToCSV = (data) => {
    const mapper = [];
    const headers = [];
    if (!data) return { mapper, headers };
    months.forEach((constantMonth, index) => {
      const finder = data.find((date) => constantMonth.value == date.month);
      mapper.push(finder?.calls_quantity.toString() || "0");
    });

    list.map((object) => {
      mapper.push(object.value.toString());
    });

    months.forEach((month) => {
      headers.push(month.month);
    });
    if (user.type == "admin") {
      headers.push("Total de Clientes");
    }
    headers.push("Atendimentos");
    headers.push("Total de Minutos");

    return { mapper, headers };
  };

  const { mapper, headers } = formatDataToCSV(dataToShow);

  const getFileName = (userType) =>
    userType == "admin" ? "Relatorio_Geral" : "Relatorio_de_Ligacoes";

  const fileName = getFileName(user.type);

  return (
    <LoaderContainer>
      <Container>
        <h2>Dashboards</h2>

        <CardsContainer>
          {list.map((item) => (
            <DashboardCard
              key={item.title}
              title={item?.title}
              value={item?.value}
            />
          ))}
        </CardsContainer>
        <ChartContainer>
          <h3>Ligações por período</h3>
          <BasicLineChart dataToShow={formatDataToShow(dataToShow)} />
        </ChartContainer>
        <ButtonContainer>
          <CSVDownloadButton data={[headers, mapper]} name={fileName} />
        </ButtonContainer>
      </Container>
    </LoaderContainer>
  );
}
