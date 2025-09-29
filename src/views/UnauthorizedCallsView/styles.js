import { styled } from "styled-components";
import { getContrastFontColorFromRGB } from "utils/formatter";

export const SuperTabContainer = styled.div`
  padding: 2rem;
  width: 100%;
  background-color: #183088;
  position: relative;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;

    img {
      margin-bottom: 2rem !important;
      margin-top: 1rem;
    }
  }
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* height: calc(100vh - 8rem); */
  background-color: ${({ colorScheme }) =>
    colorScheme ? `rgb(${colorScheme})` : "red"};
  border-radius: 2rem;
  align-items: center;
  /* justify-content: center; */
  padding-bottom: 4rem;
  min-height: ${({ expand }) => expand && "100vh"};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    /* height: 100%; */
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
  height: 90vh;
  margin-top: 2rem;
  display: flex;
  width: 100%;
  max-width: 800px;
  border-radius: 2rem;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.padding.container.desktop};
  gap: 1rem;
  /* background-color: #fff; */
  color: ${({ colorScheme }) =>
    colorScheme && getContrastFontColorFromRGB(colorScheme)};

  img {
    max-width: 500px;
    width: 100%;
    height: auto;
  }

  button {
    max-width: 450px;
    height: 80px;
  }

  iframe {
    width: 100%;
    max-width: 556px;
    /* max-width: 560px; */
    /* height: 37.8%; */
    /* height: auto; */
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    min-height: 100%;
    padding: ${({ theme }) => theme.spacing.padding.container.tabletOrMobile};

    margin-top: 1rem;
    justify-content: flex-start;

    iframe {
      max-width: 350px;
      height: auto;
      min-height: 200px;
    }
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

export const TabsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #fff;
  /* background-color: red; */
  min-height: 6rem;
  /* position: absolute; */
  border-radius: 2rem 2rem 0 0;
  top: 0;
  width: 100%;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    min-height: auto;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  border: ${({ colorScheme }) =>
    colorScheme ? `1px solid rgb${colorScheme}` : "1px solid red"};
  border-radius: 1.5rem 1.5rem 0 0;
  overflow: hidden;

  justify-content: center;
  text-align: center;
`;

export const Tab = styled.div`
  padding: 1.5rem;
  font-size: 1.5rem;
  background-color: #fff;
  cursor: pointer;
  ${({ selected, colorScheme }) => {
    if (selected) {
      return `
        border-radius: 1.5rem 1.5rem 0 0;
        background-color: ${colorScheme ? `rgb(${colorScheme})` : "red"};
        color: #fff;
      `;
    }
  }}

  ${({ theme }) => theme.devices.tabletOrMobile} {
    font-size: 1rem;
    padding: 0.75rem;
  }
`;

export const CallsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 4rem 0 0rem 0;
  min-height: calc(100vh - 17.5rem);

  ${({ theme }) => theme.devices.tabletOrMobile} {
    height: calc(100vh - 15rem);
    padding: 1rem 0;
  }
`;

export const CallCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  text-align: center;
  border-radius: 1.5rem;
  width: 80%;
  background-color: #fff;

  p {
    font-size: 1.5rem;
    font-weight: 600;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    width: 90%;
    padding: 1.5rem;

    p {
      font-size: 1rem;
    }

    button {
      margin-top: 1rem !important;
    }
  }
`;

export const DeafCenterCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 80%;
  justify-content: center;
  padding-top: 4rem;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    max-width: 100%;
    padding: 1rem 2rem 2rem 2rem;
  }
`;

export const DFCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 30%;
  min-width: 300px;
  border-radius: 1rem;
  padding: 1rem;
  gap: 1rem;
  align-items: center;

  img {
    border-radius: 1rem;
    max-width: 250px;
    width: 100%;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    width: 100%;
  }
`;

export const DFCardTitle = styled.p`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
`;
