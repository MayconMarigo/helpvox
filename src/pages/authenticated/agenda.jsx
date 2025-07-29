import AuthenticatedLayout from "components/AuthenticatedLayout";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import { LayoutWithLoading } from "shared/LayoutWithLoading/LayoutWithLoading";
import AgentAgendaManagementView from "views/AgentAgendaManagementView/AgentAgendaManagementView";

export default function Calls() {
  const { user } = useUser();

  useEffect(() => {
    if (user == null) return;
    if (user.type !== "agent") {
      return (window.location.href = "/login");
    }
  }, [user]);

  return user.type == "agent" && <AgentAgendaManagementView />;
}

Calls.getLayout = function getLayout(page) {
  return (
    <LayoutWithLoading>
      <AuthenticatedLayout>{page}</AuthenticatedLayout>
    </LayoutWithLoading>
  );
};
