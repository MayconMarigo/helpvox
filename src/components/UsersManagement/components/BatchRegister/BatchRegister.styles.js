import styled from "styled-components";

export const BulkRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  margin: 1rem 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    margin: 1rem 0;
  }
`;

export const BulkRegisterButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;

  input {
    display: none;
  }

  button {
    max-width: 300px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    margin-top: 1rem;

    button {
      max-width: none;
    }
  }
`;
