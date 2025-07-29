import AuthenticatedLayout from "components/AuthenticatedLayout";
import EnterpriseCallsManagement from "components/EnterpriseCallsManagement";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import { LayoutWithLoading } from "shared/LayoutWithLoading/LayoutWithLoading";

export default function Calls() {
  const { user } = useUser();

  useEffect(() => {
    if (user == null) return;
    if (user.type !== "company") {
      return (window.location.href = "/login");
    }
  }, [user]);

  return user.type == "company" && <EnterpriseCallsManagement />;
}

Calls.getLayout = function getLayout(page) {
  return (
    <LayoutWithLoading>
      <AuthenticatedLayout>{page}</AuthenticatedLayout>
    </LayoutWithLoading>
  );
};
