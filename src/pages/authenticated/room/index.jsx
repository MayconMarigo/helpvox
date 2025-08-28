import AuthenticatedLayout from "components/AuthenticatedLayout";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import { LayoutWithLoading } from "shared/LayoutWithLoading/LayoutWithLoading";
import PublicRoomCallsView from "views/PublicRoomCallsView/PublicRoomCallsView";

export default function Calls() {
  const { user } = useUser();
  const checkAllowedTypes = (type) => type == "agent" || type == "worker";

  useEffect(() => {
    if (user == null) return;
    if (!checkAllowedTypes(user?.type)) {
      return (window.location.href = "/login");
    }
  }, [user]);

  return user && checkAllowedTypes(user?.type) && <PublicRoomCallsView />;
}