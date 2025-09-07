import { styled } from "styled-components";

export const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.form`
  position: relative;
  height: auto;
  padding: 2rem;
  background-color: #fff;
  width: ${({ fullWidth }) => fullWidth && "95%"};
  max-width: ${({ fullWidth }) => fullWidth && "1000px"};
  border-radius: ${({ theme }) => theme.borders.radius};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5);
  z-index: 2;

  button {
    max-width: 300px;
  }

  h3 {
    margin-bottom: 1rem;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    button {
      max-width: none;
    }
  }
`;

export const CloseIconContainer = styled.strong`
  position: absolute;
  cursor: pointer;
  padding: 0.75rem;
  right: 0;
  top: 0;
`;
