import { styled } from "styled-components";
import { getContrastFontColorFromRGB } from "utils/formatter";

export const TableContainer = styled.table`
  width: 100%;
`;

export const TableHead = styled.th`
  background-color: ${({ colorScheme, theme }) =>
    colorScheme ? `rgb(${colorScheme})` : theme.colors.navigator.bg};
  border-bottom: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`};
  padding: 0.7rem 1rem;
  display: flex;
  flex: 1;
  color: ${({ colorScheme }) =>
    colorScheme ? getContrastFontColorFromRGB(colorScheme) : "#fff"};

  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    display: none;
  }
`;

export const TableBody = styled.div`
  border: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`};

  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

export const TableRow = styled.tr`
  display: flex;
  flex: 1;
  padding: 1.2rem 1rem;
  border-bottom: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`};
  border-radius: ${({ theme }) => `${theme.borders.radius}`};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, colorScheme }) =>
      colorScheme
        ? `rgba(${colorScheme}, 0.6)`
        : theme.colors.listItems.background.hover};
    /* color: ${({ theme }) => theme.colors.listItems.text.hover}; */
    color: #fff;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    padding: 1.2rem 0.25rem;
  }
`;
export const TableData = styled.td`
  display: flex;
  max-width: ${({ width }) => width};
  flex: ${({ width }) => (!width ? 1 : null)};
  align-items: center;

  h4 {
    display: none;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    width: 100%;
    h4 {
      display: block;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.25rem;

  button {
    padding: 0.5rem;
    width: 40px;
    cursor: pointer;
    border-radius: ${({ theme }) => `${theme.borders.radius}`};
    opacity: ${({ disabled }) => disabled && 0.6};
  }
`;

export const NumberedButton = styled.button`
  border: ${({ theme, selected, colorScheme }) =>
    `2px solid ${
      colorScheme && selected
        ? `rgb(${colorScheme})`
        : selected
        ? theme.colors.primary
        : "transparent"
    }`};
`;

export const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.form`
  position: relative;
  height: auto;
  padding: 2rem;
  background-color: #fff;
  width: 95%;
  max-width: 1000px;
  border-radius: ${({ theme }) => theme.borders.radius};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5);
  z-index: 2;

  button {
    max-width: 300px;
  }

  h3 {
    margin-bottom: 1rem;
  }
`;

export const CloseIconContainer = styled.strong`
  position: absolute;
  cursor: pointer;
  padding: 0.75rem;
  right: 0;
  top: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;

  div div img {
    max-height: 200px;
    max-width: 200px;
  }

  #dropdown {
    width: 100%;
    max-width: 300px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    align-items: center;

    #dropdown {
      max-width: none;
    }
  }
`;
