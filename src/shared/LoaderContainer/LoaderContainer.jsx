import { SyncLoader } from "react-spinners";
import { Container, StyledHeader } from "./LoaderContainer.styles";
import { usePageLoader } from "contexts/Page Loader/PageLoader";

const LoaderContainer = ({ children }) => {
  const { pageLoading } = usePageLoader();

  return pageLoading ? (
    <Container>
      <StyledHeader>Carregando.</StyledHeader>
      <SyncLoader size={12} />
    </Container>
  ) : (
    children
  );
};

export default LoaderContainer;
