import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    height: 100vh;
  }
`;

export const NavigatorContainer = styled.nav`
  width: 290px;
  min-width: 290px;
  height: 100vh;
  border-right: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    width: 100%;
    height: 4rem;
  }
`;

export const NavigatorHeader = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacing.padding.navigator.desktop}`};
  background-color: ${({ theme }) => theme.colors.navigator.bg};
  height: 4rem;
  transition: height 0.2s;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    height: ${({ isNavigatorOpen }) => (isNavigatorOpen ? "100vh" : "4rem")};
    position: absolute;
    padding: 0;
    z-index: 888;
    width: 100%;
  }
`;

export const NavigatorBody = styled.div`
  padding: ${({ theme }) => theme.spacing.padding.navigator.desktop};
  background-color: ${({ theme }) => theme.colors.navigator.bg};
  height: calc(100vh - 4rem);

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: ${({ theme }) => theme.spacing.padding.navigator.tabletOrMobile};
    display: none;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;

  ${({ theme }) => theme.devices.tabletOrMobile} {
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  height: 4rem;
  border-bottom: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`};
  justify-content: ${({ spacing }) => (spacing ? "space-between" : "flex-end")};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.padding.container.desktop};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: ${({ theme }) => theme.spacing.padding.navigator.tabletOrMobile};
  }
`;

export const ContentBody = styled.main`
  height: calc(100% - 4rem - 1px);
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.padding.container.desktop};
  gap: 2rem;

  img {
    max-width: 500px;
    width: 100%;
    height: auto;
  }

  button {
    max-width: 300px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    min-height: calc(100vh - 8rem);
    padding: ${({ theme }) => theme.spacing.padding.container.tabletOrMobile};

    button {
      max-width: 500px;
    }
  }
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-self: flex-end;
`;

export const CredentialsContainer = styled.div`
  ${({ theme }) => theme.devices.tabletOrMobile} {
    display: none;
  }
`;

export const IframeContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  height: 100%;
  iframe {
    margin-top: 1rem;
    height: 100%;
    border: 0;
  }
`;
