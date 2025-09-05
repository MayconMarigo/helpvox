import { styled } from "styled-components";

export const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;

  div div img {
    max-height: 200px;
    max-width: 200px;
  }

  ${({ theme }) => theme.devices.tabletOrMobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ColorPickerContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  > div {
    width: 100%;
  }

  .react-colorful {
    max-width: 200px;
  }
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  max-width: 300px;
  margin-top: 1rem;

  ${({ theme }) => theme.devices.tabletOrMobile} {
    max-width: none;
  }
`;
