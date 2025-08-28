import AuthenticatedLayout from "components/AuthenticatedLayout";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import { LayoutWithLoading } from "shared/LayoutWithLoading/LayoutWithLoading";
import AttendanceView from "views/AttendanceView/AttendanceView";

export default function Schedule() {
  const { user } = useUser();

  useEffect(() => {
    if (user == null) return;
    if (user.type !== "agent") {
      return (window.location.href = "/login");
    }
  }, [user]);

  return user.type == "agent" && <AttendanceView />;
}

Schedule.getLayout = function getLayout(page) {
  return (
    <LayoutWithLoading>
      <AuthenticatedLayout>{page}</AuthenticatedLayout>
    </LayoutWithLoading>
  );
};
