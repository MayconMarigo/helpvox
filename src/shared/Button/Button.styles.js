import { styled } from "styled-components";
import { getContrastFontColorFromRGB } from "utils/formatter";

export const CustomButton = styled.button`
  border-radius: ${({ theme }) => theme.borders.radius};
  width: 100%;
  height: 2.75rem;
  padding: 0.5rem 2rem;
  font-weight: 600;
  border: 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ colorScheme }) =>
    colorScheme ? getContrastFontColorFromRGB(colorScheme) : "#fff"};
  border: ${({ colorScheme, theme }) =>
    `1px solid ${colorScheme ? colorScheme : theme.colors.primaryHover}`};

  background-color: ${({ disabled, theme, colorScheme }) =>
    colorScheme
      ? `rgb(${colorScheme})`
      : colorScheme && disabled
      ? `rgba(${colorScheme}, 0.6)`
      : disabled
      ? theme.colors.primaryHover
      : theme.colors.primary};

  &:hover {
    background-color: ${({ theme, colorScheme }) =>
      colorScheme ? `rgba(${colorScheme}, 0.6)` : theme.colors.primaryHover};
  }

  ${({ inverse, theme }) =>
    inverse &&
    `
      background-color: #fff;
      color: ${theme.colors.primary};

      &:hover {
        color: #fff;
      }
    `}
`;
