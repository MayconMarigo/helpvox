import { useAlert } from "contexts/Alert/Alert";
import { useState } from "react";
import { RgbColorPicker } from "react-colorful";
import ImageUploading from "react-images-uploading";
import { AuthenticationService } from "services/authentication";
import StyledButton from "shared/Button";
import Dropdown from "shared/Dropdown";
import StyledInput from "shared/Input";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "utils/constants";
import { encryptWithCypher } from "utils/encryption";
import {
  formatImageName,
  formatRGBColorObjectToString,
  formatRGBForBackend,
} from "utils/formatter";
import { phoneMask } from "utils/mask/mask";
import {
  ButtonContainer,
  ColorPickerContainer,
  Container,
  ImageUploadContainer,
  InputContainer,
} from "./Cadastro.styles";
import { useUser } from "contexts/User/User";

export default function Cadastro() {
  const { user } = useUser();
  const userTypeValue = user.type == "company" ? "4" : "2";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState(userTypeValue);
  const [loading, setLoading] = useState(false);
  const { setContent } = useAlert();
  const [imageSizeError, setImageSizeError] = useState(false);
  const [color, setColor] = useState({
    r: 138,
    g: 72,
    b: 72,
  });
  const [logo, setLogo] = useState("");
  const [base64String, setBase64String] = useState("");

  const isDisabled = !fullName || !email || !password || !userType || loading;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const payload = {
        nm: encryptWithCypher(fullName),
        em: encryptWithCypher(email),
        pw: encryptWithCypher(password),
        uti: encryptWithCypher(userType),
        cl: null,
        fl: null,
      };

      if (userType == "2") {
        payload.cl = formatRGBForBackend(color);
        payload.fl = base64String;
      }

      const { created } = await AuthenticationService.register(
        payload,
        user.type,
        user.id
      );

      if (!created) throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);

      setContent({
        message: SUCCESS_MESSAGES.USER_SUCCESSFULL_CREATED,
        type: "sucesso",
        isOpen: true,
      });
    } catch (error) {
      setContent({
        message: error.message,
        type: "erro",
        isOpen: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (image) => {
    let file = image[0].file;
    if (file.size > 1034631) {
      setImageSizeError(true);
      return;
    }
    setImageSizeError(false);
    const formattedFileName = formatImageName(file.name);
    const reader = new FileReader();
    let base64 = null;

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      base64 = reader.result;
      setBase64String(base64);
    };

    setLogo({ data_url: image[0].data_url, file: { name: formattedFileName } });
  };

  const removeImage = () => setLogo("");

  return (
    <Container onSubmit={handleSubmit}>
      <InputContainer>
        <StyledInput
          disabled={loading}
          value={fullName}
          htmlLabel={"Nome Completo"}
          placeHolder="Digite o nome completo..."
          setValue={setFullName}
          fullWidth
        />
        <StyledInput
          disabled={loading}
          value={email}
          htmlLabel={"Email"}
          placeHolder="Digite o email..."
          setValue={setEmail}
          type="email"
          fullWidth
        />
      </InputContainer>
      <InputContainer>
        <StyledInput
          disabled={loading}
          value={password}
          htmlLabel={"Senha"}
          placeHolder="Digite a senha..."
          setValue={setPassword}
          type="password"
          fullWidth
        />
        <StyledInput
          disabled={loading}
          value={phoneMask(phone)}
          htmlLabel={"Telefone"}
          placeHolder="Digite o telefone..."
          setValue={setPhone}
          fullWidth
          required={false}
          maxLength={15}
        />
        <Dropdown
          value={userType}
          htmlLabel={"Tipo de usuário"}
          onChange={setUserType}
          fullWidth
        />
      </InputContainer>
      {user.type == "admin" && userType == "2" && (
        <InputContainer>
          <ImageUploadContainer>
            <ImageUploading
              value={logo}
              onChange={onChange}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({ onImageUpload, dragProps }) => (
                <StyledInput
                  disabled={loading}
                  required={true}
                  value={logo?.file?.name || ""}
                  htmlLabel={"Logotipo"}
                  placeHolder="Clique ou arraste a imagem aqui..."
                  setValue={setLogo}
                  fullWidth
                  onClick={onImageUpload}
                  {...dragProps}
                />
              )}
            </ImageUploading>
            {imageSizeError && (
              <p style={{ color: "red" }}>Imagem precisa ser menor que 1mb.</p>
            )}
            {logo && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img src={logo["data_url"]} alt="" width="100" height="auto" />
                <StyledButton
                  text="Remover imagem"
                  type="button"
                  loading={loading}
                  onClick={removeImage}
                  style={{ maxWidth: 300 }}
                />
              </div>
            )}
          </ImageUploadContainer>
          <ColorPickerContainer isClicked={false}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <StyledInput
                disabled={loading}
                value={formatRGBColorObjectToString(color)}
                htmlLabel={"Cor primária"}
                placeHolder="Selecione a cor..."
                setValue={setPhone}
                fullWidth
              />
              <span style={{ marginTop: "2rem", color: "#4b5563" }}>
                Selecione a cor na palela de cores ao lado.
              </span>
            </div>
            {true && <RgbColorPicker color={color} onChange={setColor} />}
          </ColorPickerContainer>
        </InputContainer>
      )}

      <ButtonContainer>
        <StyledButton
          text="Cadastrar"
          type="submit"
          disabled={isDisabled}
          loading={loading}
        />
      </ButtonContainer>
    </Container>
  );
}
