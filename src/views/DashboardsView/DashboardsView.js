import DashboardsComponent from "components/DashboardsComponent/DashboardsComponent";

export default function DashboardsView({
  list,
  dataToShow,
  dropdownContent,
  setRefetch,
  company,
  setCompany,
}) {
  return (
    <DashboardsComponent
      list={list}
      dataToShow={dataToShow}
      dropdownContent={dropdownContent}
      setRefetch={setRefetch}
      company={company}
      setCompany={setCompany}
    />
  );
}
