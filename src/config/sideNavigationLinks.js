import DataDisplay from "assets/svgs/DataDisplay";
import MultiplePeopleCrm from "assets/svgs/MultiplePeopleCrm";
import Profile from "assets/svgs/Profile";
import { TbReport } from "react-icons/tb";
import { PiVideoConference } from "react-icons/pi";

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
          title: "Intérpretes",
          url: "admin/interpretes",
        },
      ],
    },
    {
      id: 1,
      title: "Relatórios",
      icon: <TbReport />,
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
          title: "Unidades",
          url: "enterprise/setores",
        },
      ],
    },
    {
      id: 1,
      title: "Relatórios",
      icon: <TbReport />,
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
          title: "Credenciais API",
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
      ],
    },
    {
      id: 0,
      title: "Área de atendimento",
      icon: <PiVideoConference  />,
      subMenus: [
        {
          title: "Sala de Atendimento",
          url: "/attendance",
        },
      ],
    },
    {
      id: 1,
      title: "Relatórios",
      icon: <TbReport />,
      subMenus: [
        {
          title: "Atendimentos",
          url: "chamadas",
        },
      ],
    },
  ],
};
