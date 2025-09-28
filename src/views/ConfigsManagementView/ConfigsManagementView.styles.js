import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  height: calc(100vh - 9.85rem);

  button {
    max-width: 300px;
  }

  > div {
    width: 100%;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: 1rem;

    button {
      max-width: none;
    }
  }
`;
