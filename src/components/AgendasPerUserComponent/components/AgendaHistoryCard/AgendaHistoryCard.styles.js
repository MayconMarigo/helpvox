import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${({ theme }) => `${theme.borders.width} solid #d1d5db`};
  border-radius: ${({ theme }) => `${theme.borders.radius}`};
  min-height: 200px;
  padding: 1rem 0.5rem;
  width: 200px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 2rem;

  div {
    flex: auto;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const TimeHistoryContainer = styled.div`
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8 !important;
  }
  &::-webkit-scrollbar {
    width: 7px;
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
  }

  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  height: 200px;
  overflow-y: scroll;
  width: 100%;

  span {
    text-align: center;
    border-radius: ${({ theme }) => `${theme.borders.radius}`};
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 1rem;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, colorScheme }) =>
      colorScheme
        ? `rgba(${colorScheme}, 0.6)`
        : theme.colors.listItems.background.hover};
    color: ${({ theme }) => theme.colors.listItems.text.hover};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
`;
