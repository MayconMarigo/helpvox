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
  const { setPageLoading } = usePageLoader();

  useEffect(() => {
    if (user == null) return;
    if (user.type !== "company") {
      return (window.location.href = "/login");
    }
  }, [user]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setPageLoading(true);
        const info = await AuthenticationService.getUserDashboardInfo(user.id);
        setData(info);
      } catch (error) {
        setData({
          calls_quantity: "Erro ao calcular",
          minutes_count: "Erro ao calcular",
        });
      } finally {
        setPageLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    user.type == "company" && (
      <DashboardsView
        list={[
          { title: "Atendimentos", value: data?.calls_quantity },
          { title: "Total de Minutos", value: data?.minutes_count },
        ]}
        dataToShow={data?.calls}
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
