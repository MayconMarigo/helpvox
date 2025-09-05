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

export const DatePickerContainer = styled.div``;

export const RegisterContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  .rdrCalendarWrapper {
    max-width: 350px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    align-items: center;
  }
`;

export const AlreadyRegisteredDateContainer = styled.div``;

export const RegisterNewAgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const InputsContainer = styled.div`
  display: flex;
  gap: 1rem;

  div {
    width: 100%;
  }
`;

export const NextDaysAgendaContainer = styled.div`
  margin-top: 2rem;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    justify-content: center;
  }
`;

export const SubmitContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  div {
    width: 100%;
  }

  button {
    max-width: 310px;
  }
`;
