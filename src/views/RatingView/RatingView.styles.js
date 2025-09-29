import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const RatingContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 95%;
  max-width: 600px;
  border-radius: 1rem;
  border: 1px solid #fff;

  button {
    max-width: 300px;
  }
`;

export const StarContainer = styled.div`
  display: flex;
  p {
    font-size: 4.8rem;
  }
`;

export const Star = styled.p`
  margin-top: -1.5rem;
  color: ${({ selected }) => (selected ? "yellow" : "gray")};
  opacity: ${({ hovered, selected }) => (hovered ? 0.85 : selected ? 1 : 0.5)};
  cursor: pointer;
`;
