import { styled } from "styled-components";
import { getContrastFontColorFromRGB } from "utils/formatter";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  border: ${({ theme }) => `${theme.borders.width} solid #d1d5db`};
  border-radius: ${({ theme }) => `${theme.borders.radius}`};
  background-color: ${({ theme, colorScheme }) =>
    colorScheme ? `rgb(${colorScheme})` : theme.colors.primary};
  color: ${({ colorScheme }) =>
    colorScheme ? getContrastFontColorFromRGB(colorScheme) : "#fff"};
  min-height: 100px;

  span {
    font-weight: 500;
  }
`;
