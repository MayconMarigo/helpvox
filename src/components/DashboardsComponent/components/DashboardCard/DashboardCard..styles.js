import { styled } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  border: ${({ theme }) => `${theme.borders.width} solid #d1d5db`};
  border-radius: ${({ theme }) => `${theme.borders.radius}`};

  span {
    font-weight: 500;
  }
`;
