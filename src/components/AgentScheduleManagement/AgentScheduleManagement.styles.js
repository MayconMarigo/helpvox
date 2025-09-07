import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  height: calc(100vh - 4rem);

  h2 {
    margin-bottom: 2rem;
  }

  > div {
    max-height: calc(100vh - 11rem);
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: 1rem;

    > div {
      max-height: none;
    }
  }
`;

export const DateDisplay = styled.div`
  padding: 0.25rem;
`;

export const InfoDisplay = styled.div`
  position: absolute;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  top: -55px;
  color: #000;
  background-color: #fffde3;
  display: flex;
  flex-direction: column;
`;
