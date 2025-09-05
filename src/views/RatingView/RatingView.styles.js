import styled from "styled-components";

export const Container = styled.div`
  background-color: #d1d0d0ff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RatingContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  height: 350px;
  width: 95%;
  max-width: 700px;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const StarContainer = styled.div`
  display: flex;
  p {
    font-size: 3rem;
  }
`;

export const Star = styled.p`
  filter: contrast(
    ${({ hovered, selected }) => (hovered ? 0.45 : selected ? 1 : 0)}
  );

  cursor: pointer;
`;
