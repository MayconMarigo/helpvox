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

export const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
  
  div,
  button {
    width: 100%;
    /* max-width: 300px; */
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    gap: 1rem;

    div,
    button {
      width: 100%;
      max-width: none;
    }
  }
`;
