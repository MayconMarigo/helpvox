import { styled } from "styled-components";
import { getContrastFontColorFromRGB } from "utils/formatter";

export const AccordionDetails = styled.div`
  border-radius: ${({ theme }) => `${theme.borders.radius}`};
  ${({ theme }) => theme.devices.tabletOrMobile} {
    width: 100%;
  }
  margin-bottom: 0.5rem;
`;
export const AccordionSummary = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.listItems.text.default};
  border-radius: ${({ theme }) => `${theme.borders.radius}`};
  padding: ${({ theme }) => `0 ${theme.spacing.padding.listItems.desktop}`};
  &:hover {
    background-color: ${({ theme, colorScheme }) =>
      colorScheme
        ? `rgba(${colorScheme}, 0.6)`
        : theme.colors.listItems.background.hover};
    color: ${({ theme, colorScheme }) =>
      colorScheme
        ? getContrastFontColorFromRGB(colorScheme)
        : theme.colors.listItems.text.hover};

    svg:last-child {
      fill: ${({ theme, colorScheme }) =>
        colorScheme
          ? getContrastFontColorFromRGB(colorScheme)
          : theme.colors.listItems.text.hover};
    }
  }
`;

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SummaryArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    transform: ${({ open }) => open && `rotate(-180deg)`};
    transition: 0.2s;
    fill: #fff;
  }
`;

export const SummaryLeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.font.listItems.size};
`;

export const AccordionContent = styled.div`
  opacity: ${({ open }) => (open ? 1 : 0)};
  overflow: hidden;
  max-height: ${({ open }) => (open ? "1000px" : "0px")};
  transition: all 0.15s ease-out;
  padding-left: ${({ theme }) => `${theme.spacing.padding.listItems.desktop}`};
`;
