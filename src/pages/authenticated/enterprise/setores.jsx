import AuthenticatedLayout from "components/AuthenticatedLayout";
import DepartmentManagement from "components/DepartmentManagement/DepartmentsManagement";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import { LayoutWithLoading } from "shared/LayoutWithLoading/LayoutWithLoading";
import UsersManagementView from "views/UsersManagement/UsersManagement";

export default function Calls() {
  const { user } = useUser();

  useEffect(() => {
    if (user == null) return;
    if (user.type !== "company") {
      return (window.location.href = "/login");
    }
  }, [user]);

  return user.type == "company" && <DepartmentManagement userListType={4} />;
}

Calls.getLayout = function getLayout(page) {
  return (
    <LayoutWithLoading>
      <AuthenticatedLayout>{page}</AuthenticatedLayout>
    </LayoutWithLoading>
  );
};
