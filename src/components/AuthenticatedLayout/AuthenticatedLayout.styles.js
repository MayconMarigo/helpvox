import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    height: 100vh;
  }
`;

export const NavigatorContainer = styled.nav`
  width: 290px;
  min-width: 290px;
  height: 100vh;
  /* border-right: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`}; */

  ${({ theme }) => theme.devices.tabletOrMobile} {
    width: 100%;
    height: 4rem;
  }
`;

export const MobileContainer = styled.div`
  display: none;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    display: ${({ isNavigatorOpen }) => (isNavigatorOpen ? "block" : "none")};
    text-align: center;
  }

  button {
    max-width: 95%;
  }
`;

export const MobileHeaderContainer = styled.div`
  ${({ theme }) => theme.devices.tabletOrMobile} {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-right: 1rem;
    height: 4rem;
  }
`;

export const HamburguerContainer = styled.div`
  svg {
    cursor: pointer;
    display: none;

    ${({ theme }) => theme.devices.tabletOrMobile} {
      display: block;
      &:hover {
        background-color: #fff;
        border-radius: 100%;
      }
    }
  }
`;

export const CloseIconContainer = styled.strong`
  padding: 0.5rem;
  display: none;
  ${({ theme }) => theme.devices.tabletOrMobile} {
    cursor: pointer;
    display: block;
    &:hover {
      background-color: #fff;
      border-radius: 100%;
    }
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

export const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 200px;
  margin-top: 0.5rem;
  padding: 0.5rem;
  display: ${({ notShow }) => (notShow ? "none" : "")};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    height: auto;
    width: auto;
    max-height: 70px;
    margin-top: 0;
    padding: 0.5rem 1rem;
  }
`;

export const NavigatorBody = styled.div`
  padding: ${({ theme }) => theme.spacing.padding.navigator.desktop};
  padding-top: 9rem;
  background-color: ${({ theme }) => theme.colors.navigator.bg};
  height: calc(100vh - 4rem);

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: ${({ theme }) => theme.spacing.padding.navigator.tabletOrMobile};
    display: none;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  width: 100%;

  ${({ theme }) => theme.devices.tabletOrMobile} {
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  height: 4rem;
  /* background-color: #ffc726; */
  background-color: #000;
  /* border-bottom: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`}; */
  justify-content: ${({ spacing }) => (spacing ? "space-between" : "flex-end")};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.padding.container.desktop};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    display: none;
  }
`;

export const ContentBody = styled.main`
  min-height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    min-height: calc(100vh - 8rem);
  }
`;

export const LeftContent = styled.div`
  cursor: pointer;
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
