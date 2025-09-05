import DataDisplay from "assets/svgs/DataDisplay";
import MultiplePeopleCrm from "assets/svgs/MultiplePeopleCrm";
import Profile from "assets/svgs/Profile";

export const navItems = {
  admin: [
    {
      id: 0,
      title: "Painel Administrativo",
      icon: <DataDisplay />,
      subMenus: [
        {
          title: "Dashboards",
          url: "admin/dashboards",
        },
        {
          title: "Empresas",
          url: "admin/empresas",
        },
        {
          title: "Médicos",
          url: "admin/medicos",
        },
      ],
    },
    {
      id: 1,
      title: "Histórico",
      icon: <MultiplePeopleCrm />,
      subMenus: [
        {
          title: "Atendimentos",
          url: "admin/chamadas",
        },
        {
          title: "Agendamentos",
          url: "admin/agendamentos",
        },
      ],
    },
  ],
  company: [
    {
      id: 0,
      title: "Painel Administrativo",
      icon: <Profile />,
      subMenus: [
        {
          title: "Dashboards",
          url: "enterprise/dashboards",
        },
        {
          title: "Usuários",
          url: "enterprise/usuarios",
        },
        {
          title: "Setores",
          url: "enterprise/setores",
        },
      ],
    },
    {
      id: 1,
      title: "Histórico",
      icon: <MultiplePeopleCrm />,
      subMenus: [
        {
          title: "Agendamentos",
          url: "enterprise/agendamentos",
        },
        {
          title: "Atendimentos",
          url: "enterprise/chamadas",
        },
        {
          title: "Credenciais",
          url: "enterprise/credentials",
        },
      ],
    },
  ],
  agent: [
    {
      id: 0,
      title: "Painel",
      icon: <Profile />,
      subMenus: [
        {
          title: "Disponibilidade",
          url: "/agenda",
        },
        {
          title: "Agendamentos",
          url: "/schedule",
        },
        {
          title: "Consultório Online",
          url: "/attendance",
        },
      ],
    },
    {
      id: 1,
      title: "Histórico",
      icon: <MultiplePeopleCrm />,
      subMenus: [
        {
          title: "Atendimentos",
          url: "chamadas",
        },
      ],
    },
  ],
};
