import AuthenticatedLayout from "components/AuthenticatedLayout";
import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useUser } from "contexts/User/User";
import { useState } from "react";
import { useEffect } from "react";
import { AdminService } from "services/admin";
import { AuthenticationService } from "services/authentication";
import { LayoutWithLoading } from "shared/LayoutWithLoading/LayoutWithLoading";
import DashboardsView from "views/DashboardsView/DashboardsView";

export default function Dashboards() {
  const { user } = useUser();
  const [data, setData] = useState();
  const [companyUsers, setCompanyUsers] = useState([]);
  const { setPageLoading } = usePageLoader();
  const [refetch, setRefetch] = useState(false);
  const [company, setCompany] = useState(false);

  useEffect(() => {
    if (user == null) return;
    if (user.type !== "admin") {
      return (window.location.href = "/login");
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setPageLoading(true);
      const info = await AdminService.getDashboardInfo(company);
      setData(info);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
      setRefetch(null);
    }
  };

  useEffect(() => {
    const fetchAllCompanyData = async () => {
      try {
        setPageLoading(true);
        const users = await AuthenticationService.getAllUsers("admin", 0, 2);

        const dropdownContent = users?.map((user) => {
          return {
            text: user?.name,
            value: user?.id,
          };
        });

        setCompanyUsers(dropdownContent);
        setCompany(dropdownContent[0]?.value);

        fetchDashboardData();
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    fetchAllCompanyData();
  }, []);

  useEffect(() => {
    if (refetch == false) return;

    fetchDashboardData();
  }, [refetch, company]);

  return (
    user.type == "admin" &&
    data &&
    companyUsers && (
      <DashboardsView
        list={[
          { title: "Total de Clientes", value: data?.users_quantity },
          { title: "Atendimentos", value: data?.calls_quantity },
          { title: "Total de Minutos", value: data?.minutes_count },
        ]}
        dataToShow={data?.calls}
        dropdownContent={companyUsers}
        setRefetch={setRefetch}
        company={company}
        setCompany={setCompany}
      />
    )
  );
}

Dashboards.getLayout = function getLayout(page) {
  return (
    <LayoutWithLoading>
      <AuthenticatedLayout>{page}</AuthenticatedLayout>
    </LayoutWithLoading>
  );
};
