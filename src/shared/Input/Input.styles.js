import { styled } from "styled-components";

export const InputContainer = styled.div`
  justify-content: center;
  width: ${({ fullWidth }) => fullWidth && "100%"};

  span {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  input {
    width: 100%;
    margin-top: 0.5rem;
    height: 2.75rem;
    border-radius: ${({ theme }) => theme.borders.radius};
    border: ${({ theme }) => `${theme.borders.width} solid #d1d5db`};
    outline-color: ${({ theme, colorScheme }) =>
      colorScheme ? `rgb(${colorScheme})` : theme.colors.primary};
    padding: 0.5rem 0.75rem;
    cursor: ${({ disabled }) => disabled && "not-allowed"};
    border: ${({ error, required }) => required && error && "2px solid red"};
  }

  label {
    /* color: ${({ theme }) => theme.colors.listItems.text.default}; */
    color: #000;
  }
`;

export const IconContainer = styled.div`
  position: relative;

  svg {
    cursor: pointer;
    position: absolute;
    top: 1.15rem;
    right: 0.8rem;
    opacity: 0.5;
  }
`;
