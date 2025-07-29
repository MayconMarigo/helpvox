import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;

  h2 {
    margin-bottom: 2rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;

  button {
    max-width: 300px;
  }

  div:nth-child(1) {
    min-width: 600px;
  }

  div:nth-child(2) {
    min-width: 100px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;

    div:nth-child(1) {
      min-width: auto;
      width: 100%;
    }

    div:nth-child(2) {
      min-width: auto;
      width: 100%;
    }

    button {
      max-width: 600px;
      width: 100%;
    }
  }
`;

export const TableContainer = styled.div`
  margin-top: 1rem;
`;
