import React, { useState } from "react";
import {
  Container,
  ContentContainer,
  Tabs,
  TabsContainer,
} from "./UsersManagement.styles";
import Cadastro from "./components/Cadastro";
import { useUser } from "contexts/User/User";
import ListUsers from "./components/ListUsers";
import BatchRegister from "./components/BatchRegister";

export default function UsersManagement({ title, userListType }) {
  const settings = [
    { value: "Visualização", component: "visualizacao" },
    { value: "Cadastro", component: "cadastro" },
  ];
  const [selected, setSelected] = useState("Visualização");
  const [step, setStep] = useState("visualizacao");

  const { user } = useUser();

  const handleSelected = (e, component) => {
    setSelected(e.target.innerHTML);
    setStep(component);
  };

  const bodySettings = {
    visualizacao: <ListUsers type={userListType} canEdit={true}/>,
    cadastro: <Cadastro type={userListType} />,
  };

  if (user.type == "company") {
    settings.push({ value: "Planilha de Cadastro", component: "planilha" });
    bodySettings["planilha"] = <BatchRegister type={userListType} />;
  }

  return (
    <Container>
      <h2>
        {title
          ? title
          : user.type == "admin"
          ? "Cadastrar Empresa ou Intérprete"
          : "Funcionários"}
      </h2>

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
