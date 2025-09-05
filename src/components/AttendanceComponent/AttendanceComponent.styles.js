import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  height: calc(100vh - 9.85rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 2rem;

  h2 {
    margin-bottom: 2rem;
    position: absolute;
    left: 0;
    top: 0;
  }

  button {
    min-width: 300px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: 1rem;
  }
`;
