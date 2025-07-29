import { styled } from "styled-components";

export const Container = styled.div`
  padding: 2rem;

  h2 {
    margin-bottom: 2rem;
  }
`;

export const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 1rem;

  button {
    max-width: 200px;
  }

  select {
    min-width: 350px;
  }

  div {
    max-width: 600px;
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
`;
