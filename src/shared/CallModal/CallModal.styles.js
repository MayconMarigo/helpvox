import { styled } from "styled-components";

export const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  height: auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  width: 95%;
  max-width: 500px;
  border-radius: ${({ theme }) => theme.borders.radius};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5);
  z-index: 2;

  img {
    mix-blend-mode: multiply;
    max-width: 220px;
    height: auto;
  };
`;
