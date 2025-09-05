import { styled } from "styled-components";

export const Container = styled.div`
  padding: 2rem;

  h2 {
    margin-bottom: 2rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 1rem;

  button {
    max-width: 200px;
  }

  div {
    max-width: 600px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;

    div {
      max-width: none;
      width: 100%;
    }

    button {
      max-width: none;
    }
  }
`;

export const DateShowContainer = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;

  h5 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.listItems.text.default};
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    button {
      max-width: none;
    }
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    text-align: center;
  }
`;
