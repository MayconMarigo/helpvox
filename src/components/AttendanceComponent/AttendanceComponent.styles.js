import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  height: calc(100vh - 4rem);

  h2 {
    margin-bottom: 2rem;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: 1rem;
  }
`;
