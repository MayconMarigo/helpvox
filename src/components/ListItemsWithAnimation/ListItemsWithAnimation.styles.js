import { styled } from "styled-components";
import { getContrastFontColorFromRGB } from "utils/formatter";

export const ListItemContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${({ selected, theme, colorScheme }) =>
    selected && colorScheme
      ? `rgb(${colorScheme})`
      : selected
      ? theme.colors.primaryHover
      : null};
  padding: ${({ theme }) => `0 ${theme.spacing.padding.listItems.desktop}`};
  border-radius: ${({ theme }) => `${theme.borders.radius}`};
  color: ${({ theme, selected }) =>
    theme.colors.listItems.text[selected ? "selected" : "default"]};

  color: ${({ colorScheme, selected }) =>
    colorScheme && selected && getContrastFontColorFromRGB(colorScheme)};

  font-weight: 600;
  font-size: ${({ theme }) => theme.font.listItems.size};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    width: 100%;
  }

  &:hover {
    /* background-color: ${({ theme, colorScheme }) =>
      colorScheme ? `rgba(${colorScheme}, 0.6)` : theme.colors.primaryHover};
    color: ${({ theme, colorScheme }) =>
      colorScheme
        ? getContrastFontColorFromRGB(colorScheme)
        : theme.colors.listItems.text.hover}; */
    background-color: ${({ theme, colorScheme }) =>
      colorScheme ? `rgba(${colorScheme}, 0.6)` : theme.colors.primaryHover};
    color: ${({ theme, colorScheme }) =>
      colorScheme
        ? getContrastFontColorFromRGB(colorScheme)
        : theme.colors.listItems.text.hover};
  }
`;

export const ListItemAnchor = styled.a`
  border-radius: inherit;
  padding: ${({ theme }) => `0 ${theme.spacing.padding.listItems.desktop}`};
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
