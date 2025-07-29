import { styled } from "styled-components";

export const Container = styled.div`
  padding: 2rem;

  h2 {
    margin-bottom: 2rem;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    text-align: center;
  }
`;

export const ChartContainer = styled.div`
  margin: 2rem 2rem 2rem 0;

  h3 {
    margin-bottom: 2rem;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    margin: 2rem 0;
  }
`;

export const ButtonContainer = styled.div`
  button {
    max-width: 300px;
  }
`;
