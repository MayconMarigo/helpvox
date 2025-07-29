import styled from "styled-components";

export const Header = styled.div`
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    height: 4rem;
    svg {
        width: 120px;
    }
  }
`;
