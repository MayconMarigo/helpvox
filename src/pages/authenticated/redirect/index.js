import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useUser } from "contexts/User/User";
import { useEffect } from "react";
import LoaderContainer from "shared/LoaderContainer";

export default function Redirect() {
  const { setPageLoading } = usePageLoader();
  const { user } = useUser();

  const redirectUrls = {
    agent: "/authenticated/agenda",
    company: "/authenticated/enterprise/dashboards",
    admin: "/authenticated/admin/dashboards",
    worker: "/authenticated/calls",
  };
  useEffect(() => {
    if (user == null || user == undefined) return;
    if (user == false) return window.location.replace("/login");
    setPageLoading(true);
    return window.location.replace(redirectUrls[user.type]);
  }, [user]);

  return <LoaderContainer />;
}
