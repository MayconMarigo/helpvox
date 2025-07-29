import { styled } from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.padding.container.desktop};
  display: inherit;
  flex-direction: inherit;
  flex: 1;

  
  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: ${({ theme }) => theme.spacing.padding.container.tabletOrMobile};
  }
`;

export const IframeContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  flex: inherit;
  iframe {
    margin-top: 1rem;
    display: inherit;
    flex-direction: inherit;
    flex: inherit;
    border: 0;
  }
`;
