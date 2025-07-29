import { styled } from "styled-components";

export const Container = styled.div`
  justify-content: center;
  width: 200px;

  label {
    color: ${({ theme }) => theme.colors.listItems.text.default};
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ToogleContainer = styled.div`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 68px;
  margin-top: 0.5rem;
  height: 2.75rem;
  border-radius: 42%;
  border: ${({ theme }) => `${theme.borders.width} solid #d1d5db`};
  background-color: ${({ theme, colorScheme }) =>
    !colorScheme ? "" : theme.colors.navigator.bg};
  display: flex;
  justify-content: ${({ active }) => (active ? "flex-start" : "flex-end")};

  padding: 3px;
`;

export const ToogleSwitch = styled.div`
  background-color: ${({ theme, colorScheme, active, disabled }) =>
    disabled
      ? theme.colors.primaryHover
      : !active
      ? "gray"
      : colorScheme
      ? `rgb(${colorScheme})`
      : "#5120bd"};
  width: 42px;
  height: 100%;
  border-radius: 100%;
  transition: 0.2s;
`;
