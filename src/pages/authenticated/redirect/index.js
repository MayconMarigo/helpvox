import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useUser } from "contexts/User/User";
import React, { useEffect } from "react";
import LoaderContainer from "shared/LoaderContainer";

export default function Redirect() {
  const { setPageLoading } = usePageLoader();
  const { user } = useUser();

  const redirectUrls = {
    agent: "/authenticated/agenda",
    company: "/authenticated/enterprise/dashboards",
    admin: "/authenticated/admin/dashboards",
  };
  useEffect(() => {
    if (user == false) return window.location.replace("/login");
    if (!user) return;
    setPageLoading(true);
    return window.location.replace(redirectUrls[user.type]);
  }, [user]);

  return <LoaderContainer />;
}
