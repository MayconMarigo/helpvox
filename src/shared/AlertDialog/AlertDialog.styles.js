import { styled } from "styled-components";

export const AlertContainer = styled.div`
  position: absolute;
  right: 0;
  top: 10%;
  width: 400px;
  padding: 1.25rem;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  background-color: ${({ bg }) => bg};
  color: ${({ textColor }) => `${textColor}`};
  border-radius: ${({ theme }) => theme.borders.radius};
  transition: opacity 0.3s ease-in-out;
  z-index: 999;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    top: 0;
    width: 100%;
  }
`;
