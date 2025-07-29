import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  height: calc(100vh - 4rem);

  h2 {
    margin-bottom: 2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  align-items: flex-end;

  div,
  button {
    width: 100%;
    max-width: 300px;
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

export const DateShowContainer = styled.div`
  min-width: 200px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.listItems.text.default};
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    button {
      max-width: none;
    }
  }
`;

export const AgendaPerPeriodContainer = styled.div`
  height: 85%;
  overflow-y: scroll;
`;

export const AgendaHistoryCardContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 2rem;
  flex-wrap: wrap;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    justify-content: center;
  }
`;
