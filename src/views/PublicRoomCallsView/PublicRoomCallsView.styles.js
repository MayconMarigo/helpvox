import styled from "styled-components";

export const Header = styled.div`
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    height: 4rem;

    img {
      width: 120px;
      height: 60px;
    }
  }
`;
