import React, { useState } from "react";
import {
  Container,
  ContentContainer,
  Tabs,
  TabsContainer,
} from "./DepartmentManagement.styles";
import { useUser } from "contexts/User/User";
import ListDepartments from "./components/ListDepartments";
import BatchRegisterDepartments from "./components/BatchRegisterDepartments";
import RegisterDepartments from "./components/RegisterDepartments";

export default function DepartmentManagement({ title, userListType }) {
  const settings = [
    { value: "Visualização", component: "visualizacao" },
    { value: "Cadastro", component: "cadastro" },
    { value: "Planilha de Cadastro", component: "planilha" },
  ];
  const [selected, setSelected] = useState("Visualização");
  const [step, setStep] = useState("visualizacao");

  const { user } = useUser();

  const handleSelected = (e, component) => {
    setSelected(e.target.innerHTML);
    setStep(component);
  };

  const bodySettings = {
    visualizacao: <ListDepartments type={userListType} />,
    cadastro: <RegisterDepartments type={userListType} />,
    planilha: <BatchRegisterDepartments type={userListType} />,
  };

  return (
    <Container>
      <h2>Departamentos</h2>

      <TabsContainer colorScheme={user.colorScheme || "#ff1922"}>
        {settings?.map((setting) => (
          <Tabs
            selected={selected == setting.value}
            onClick={(e) => handleSelected(e, setting.component)}
            colorScheme={user.colorScheme}
          >
            {setting.value}
          </Tabs>
        ))}
      </TabsContainer>

      <ContentContainer>{bodySettings[step]}</ContentContainer>
    </Container>
  );
}
