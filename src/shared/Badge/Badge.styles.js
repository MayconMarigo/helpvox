import { styled } from "styled-components";

export const Container = styled.div`
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: ${({theme, userColor}) => userColor ? userColor : theme.colors.primary};
  /* border: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`}; */
`;
