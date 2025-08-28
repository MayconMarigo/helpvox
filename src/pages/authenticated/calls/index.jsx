import AuthenticatedLayout from "components/AuthenticatedLayout";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import { LayoutWithLoading } from "shared/LayoutWithLoading/LayoutWithLoading";
import UnauthorizedCallsView from "views/UnauthorizedCallsView/UnauthorizedCallsView";

export default function Calls() {
  const { user } = useUser();
  const checkAllowedTypes = (type) => type == "agent" || type == "worker";

  useEffect(() => {
    if (user == null) return;
    if (!checkAllowedTypes(user.type)) {
      return (window.location.href = "/login");
    }
  }, [user]);

  return checkAllowedTypes(user?.type) && <UnauthorizedCallsView />;
}

Calls.getLayout = function getLayout(page) {
  return (
    <LayoutWithLoading>
      <AuthenticatedLayout>{page}</AuthenticatedLayout>
    </LayoutWithLoading>
  );
};
