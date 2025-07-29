import { styled } from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.padding.container.desktop};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: ${({ theme }) => theme.spacing.padding.container.tabletOrMobile};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  border-bottom: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`};
`;

export const Tabs = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: ${({ theme, selected, colorScheme }) =>
    `2px solid ${
      colorScheme && selected
        ? `rgb(${colorScheme})`
        : selected
        ? theme.colors.primary
        : "transparent"
    }`};
  cursor: pointer;
  color: ${({ theme, selected, colorScheme }) =>
    colorScheme && selected
      ? `rgb(${colorScheme})`
      : selected
      ? theme.colors.primary
      : theme.colors.primaryHover};
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.listItems.size};

  &:hover {
    color: ${({ theme, colorScheme }) =>
      colorScheme ? `rgb(${colorScheme})` : theme.colors.primary};
    transition: border-bottom 0.3s;
  }
`;

export const ContentContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.padding.container.desktop};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: ${({ theme }) => theme.spacing.padding.container.tabletOrMobile};
  }
`;
