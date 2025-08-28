import styled from "styled-components";

export const Header = styled.div`
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.devices.tabletOrMobile} {
    height: 4rem;

    img {
      width: 130px;
      height: 60px;
    }
  }
`;
