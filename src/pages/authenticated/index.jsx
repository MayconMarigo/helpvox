import AuthenticatedLayout from "components/AuthenticatedLayout";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import { LayoutWithLoading } from "shared/LayoutWithLoading/LayoutWithLoading";
import AgentAuthenticatedView from "views/AgentAuthenticatedView/AgentAuthenticatedView";

const Authenticated = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user == null) return;
    if (user.type !== "agent") {
      return (window.location.href = "/login");
    }
  }, [user]);

  return user.type == "agent" && <AgentAuthenticatedView />;
};

Authenticated.getLayout = function getLayout(page) {
  return (
    <LayoutWithLoading>
      <AuthenticatedLayout>{page}</AuthenticatedLayout>
    </LayoutWithLoading>
  );
};

export default Authenticated;
