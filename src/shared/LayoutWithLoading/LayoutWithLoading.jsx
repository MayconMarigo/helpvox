import { useUser } from "contexts/User/User";
import { SyncLoader } from "react-spinners";
import { LoaderContainer, StyledHeader } from "./LayoutWIthLoading.styles";
import { useEffect, useState } from "react";

export const LayoutWithLoading = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user == null) return;

    setLoading(false);
  }, [user]);

  return loading ? (
    <LoaderContainer>
      <StyledHeader>Carregando.</StyledHeader>
      <SyncLoader size={12} />
    </LoaderContainer>
  ) : (
    children
  );
};
