import { styled } from "styled-components";

export const Container = styled.div`
  width: ${({ fullWidth }) => fullWidth && "100%"};
  display: flex;
  flex-direction: column;

  /* color: ${({ theme }) => theme.colors.listItems.text.default}; */
  color: #000;
`;

export const SelectContainer = styled.select`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 0.5rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.borders.radius};
  outline-color: ${({ theme, colorScheme }) =>
    colorScheme ? `rgb(${colorScheme})` : theme.colors.primary};
  padding: 0.5rem 0.75rem;
  border: ${({ theme }) => `${theme.borders.width} solid #d1d5db`};
  color: #000;

  &:focus {
    border: ${({ theme, colorScheme }) =>
      `2px solid ${
        colorScheme ? `rgb(${colorScheme})` : theme.colors.primary
      }`};
  }
`;
