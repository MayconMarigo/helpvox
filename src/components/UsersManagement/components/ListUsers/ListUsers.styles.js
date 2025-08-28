import { styled } from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 2rem;

  button {
    max-width: 300px;
  }

  input {
    width: 300px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    margin-bottom: 0;
    flex-direction: column;

    button {
      max-width: none;
    }

    div {
      max-width: none;
      width: 100%;

      input {
        width: 100%;
      }
    }
  }
`;
