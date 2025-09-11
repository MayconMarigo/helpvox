import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  CardsContainer,
  ChartContainer,
  Container,
  FilterContainer,
} from "./DashboardsComponent.styles";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import BasicLineChart from "shared/LineChart/LineChart";
import LoaderContainer from "shared/LoaderContainer";
import CSVDownloadButton from "shared/CSVDownloadButton/CSVDownloadButton";
import { months } from "utils/constants";
import { useUser } from "contexts/User/User";
import { AdminService } from "services/admin";
import StyledButton from "shared/Button";
import { AuthenticationService } from "services/authentication";
import Dropdown from "shared/Dropdown";

export default function DashboardsComponent({
  list = [],
  dataToShow,
  dropdownContent = null,
  setRefetch,
  company,
  setCompany,
}) {
  const { user } = useUser();
  const [csvDataToUse, setCsvDataToUse] = useState(null);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        let data;
        if (user.type == "admin") {
          data = await AdminService.getDashboardCSVInfo();
        }
        if (user.type == "company" && user.hasSpeciality) {
          data = await AuthenticationService.getDashboardCSVInfo(user.id);
        }

        setCsvDataToUse(data);
      } catch (error) {}
    };

    fetchCSVData();
  }, []);

  const formatDataToShow = (data) => {
    if (!data) return [];
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

    if (user.type == "company" && !data?.hasSpeciality) {
      months.forEach((constantMonth, index) => {
        const finder = data.find((date) => constantMonth.value == date.month);
        mapper.push(finder?.calls_quantity?.toString() || "0");
      });
      list.map((object) => {
        mapper.push(object.value?.toString());
      });
    }

    if (user.type == "admin") {
      const temp = [];
      months.forEach((constantMonth, index) => {
        const finder = data.find((date) => constantMonth.value == date.month);
        temp.push(finder?.calls_quantity?.toString() || "0");
      });

      data.forEach((register) => {
        const monthObject = months.find(
          (month) => month.value == register.month
        );
        const values = [
          register.company_name,
          register.calls_quantity,
          register.minutes_count,
          monthObject.month,
        ];

        mapper.push(values);
      });
    }

    if (user.type == "company" && data?.hasSpeciality) {
      const temp = [];
      months.forEach((constantMonth, index) => {
        const finder = data.find((date) => constantMonth.value == date.month);
        temp.push(finder?.calls_quantity?.toString() || "0");
      });

      data.forEach((register) => {
        const monthObject = months.find(
          (month) => month.value == register.month
        );
        const values = [
          register.department,
          register.calls_quantity,
          register.minutes_count,
          monthObject.month,
        ];

        mapper.push(values);
      });
    }

    if (user.type == "admin") {
      headers.push("Usuário");
      headers.push("Total de Chamadas");
      headers.push("Total de Minutos");
      headers.push("Mês");
    }

    if (user.type == "company" && !data?.hasSpeciality) {
      months.forEach((month) => {
        headers.push(month.month);
      });
      headers.push("Atendimentos");
      headers.push("Total de Minutos");
    }

    if (user.type == "company" && data?.hasSpeciality) {
      headers.push("Departamento/Setor");
      headers.push("Total de Chamadas");
      headers.push("Total de Minutos");
      headers.push("Mês");
    }

    const finalMapper = [];

    if (user.type == "admin" || data?.hasSpeciality) {
      finalMapper.push(...mapper);
    } else {
      finalMapper.push(mapper);
    }

    return { finalMapper, headers };
  };

  const { finalMapper, headers } = formatDataToCSV(csvDataToUse || dataToShow);

  const getFileName = (userType) =>
    userType == "admin" ? "Relatorio_Geral" : "Relatorio_de_Ligacoes";

  const fileName = getFileName(user.type);

  const handleRefetch = () => setRefetch((prev) => !prev);

  return (
    <LoaderContainer>
      {finalMapper && (
        <Container>
          <h2>Dashboards</h2>

          {user.type == "admin" && (
            <FilterContainer>
              <Dropdown
                fullWidth
                content={dropdownContent}
                htmlLabel="Buscar por empresa"
                onChange={setCompany}
                value={company}
              />
              <StyledButton text="Buscar" onClick={handleRefetch} />
            </FilterContainer>
          )}

          <CardsContainer>
            {list?.map((item) => (
              <DashboardCard
                key={item?.title}
                title={item?.title}
                value={item?.value}
              />
            ))}
          </CardsContainer>
          <ChartContainer>
            <h3>Ligações por período</h3>
            <BasicLineChart
              firstLabel={formatDataToShow(dataToShow)}
              secondLabel={dataToShow}
            />
          </ChartContainer>
          <ButtonContainer>
            <CSVDownloadButton
              data={[headers, ...finalMapper]}
              name={fileName}
              userType={user.type}
            />
          </ButtonContainer>
        </Container>
      )}
    </LoaderContainer>
  );
}
