import { styled } from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  padding: 1rem;
`;

export const LoginForm = styled.form`
  background-color: #fff;
  max-width: 500px;
  width: 100%;
  min-height: 450px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: ${({ theme }) => theme.borders.radius};
  border: ${({ theme }) =>
    `${theme.borders.width} solid ${theme.borders.color}`};

  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);

  ${({ theme }) => theme.devices.tabletOrMobile} {
    padding: 1.25rem;
    max-width: none;
    max-height: none;
    align-self: flex-start;
  }

  #modal {
    max-width: 625px;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin-bottom: 0.25rem;
  }

  p {
    /* color: ${({ theme }) => theme.colors.listItems.text.default}; */
    color: #000;
  }

  img {
    margin-bottom: 0.5rem;
  }
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 1.5rem;
`;

export const QrCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;

  h3 {
    text-align: center;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    h3 {
      font-size: 16px;
    }
  }
`;
export const TotpInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
  margin: 1.5rem 0;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const TotpInput = styled.input`
  height: 58px;
  width: 100%;
  max-width: 58px;
  padding-left: 24px;
  border-radius: ${({ theme }) => theme.borders.radius};
  border: ${({ theme }) => `${theme.borders.width} solid #d1d5db`};
  outline-color: ${({ theme }) => theme.colors.primary};
  border: ${({ error }) => error && "2px solid red"};
  font-size: 26px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledHeader = styled.h4``;

export const IframeContainer = styled.div`
  ${({ theme }) => theme.devices.tabletOrMobile} {
    iframe {
      position: absolute;
      left: 0.5rem;
      width: 97%;
    }
  }
`;

export const HowToUseButton = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`;
