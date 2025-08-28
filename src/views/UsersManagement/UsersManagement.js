import UsersManagementComponent from "components/UsersManagement";

export default function UsersManagement({ title, userListType }) {
  return <UsersManagementComponent title={title} userListType={userListType} />;
}
