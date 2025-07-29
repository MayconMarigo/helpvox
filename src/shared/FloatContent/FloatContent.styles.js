import { styled } from "styled-components";

export const Container = styled.div`
  position: absolute;
  background-color: #fff;
  margin-top: 0.5rem;
  padding: 1rem;
  border: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`};
  border-radius: ${({ theme }) => theme.borders.radius};
`;
