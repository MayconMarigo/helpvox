import { useAlert } from "contexts/Alert/Alert";
import { useUser } from "contexts/User/User";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SyncLoader } from "react-spinners";
import { AuthenticationService } from "services/authentication";
import StyledButton from "shared/Button";
import StyledInput from "shared/Input";
import { checkErrorType } from "utils/error";
import { setValueInCookies } from "utils/storage";
import {
  Container,
  FormBody,
  FormHeader,
  LoaderContainer,
  LoginForm,
  QrCodeContainer,
  StyledHeader,
  TotpInput,
  TotpInputContainer,
} from "./Login.styles";
import * as logo from "../../assets/imgs/logo-kof.png";

export default function Login() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const LoginLogo = logo.default;

  useEffect(() => {
    if (user === null) return;

    if (user) {
      return (window.location.href = "/authenticated/redirect");
    }
    setLoading(false);
  }, [user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("loginForm");
  const [totpInput, setTotpInput] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const [totp, setTotp] = useState({ qrCode: "", secret: "", code: "" });
  const [token, setToken] = useState("");

  const { setContent } = useAlert();

  useEffect(() => {
    if (step !== "qrCodeForm") return;

    const firstInput = document.getElementById(1);
    firstInput.focus();

    return;
  }, [step]);

  useEffect(() => {
    if (step !== "loginForm" || email.length > 0) return;

    const firstInput = document.getElementById("Email");
    firstInput?.focus();
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const TOTP = await AuthenticationService.authenticate({
        email,
        password,
      });

      const { token } = TOTP;

      setToken(token);

      handleSuccessfullLogin(token);
      // setStep("qrCodeForm");
    } catch (error) {
      const message = checkErrorType(error.message);
      setContent({ message: message, type: "erro", isOpen: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfullLogin = async (tokenValue) => {
    setContent({
      message: "Autenticado com sucesso, estamos redirecionando você.",
      type: "sucesso",
      isOpen: true,
    });

    await setValueInCookies("t", tokenValue);

    window.location.href = "/authenticated/redirect";
  };

  const handleSubmitTotp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const code = Object.values(totpInput).join("");
      const response = await AuthenticationService.verify2faToken(
        totp.secret,
        code,
        token
      );

      if (response.success) {
        handleSuccessfullLogin();
        return;
      }
    } catch (error) {
      const message = checkErrorType(error.message);
      setContent({ message: message, type: "erro", isOpen: true });
      setLoading(false);
    }
  };

  const focusNextInput = (id) => {
    if (id == 6) return;
    const input = document.getElementById(id + 1);

    return input.focus();
  };

  const handleTotpChange = (event, id) => {
    const value = event.target.value;
    if (!Number(value) && value !== "" && value !== "0") return;
    if (value.length > 1) return;

    const obj = { ...totpInput };
    obj[id] = event.target.value;

    setTotpInput(obj);

    if (value) {
      focusNextInput(id);
    }
  };

  const steps = {
    loginForm: (
      <LoginForm onSubmit={handleSubmitForm}>
        <FormHeader>
          <Image src={LoginLogo} width={250} alt="login" />
          <h3>Entrar</h3>
          <p>Insira suas credenciais para acessar o sistema</p>
        </FormHeader>
        <FormBody>
          <StyledInput
            htmlLabel="Email"
            placeHolder="Digite seu email"
            required={true}
            type="email"
            value={email}
            setValue={setEmail}
            disabled={loading}
          />
          <StyledInput
            htmlLabel="Senha"
            placeHolder="Digite sua senha"
            required={true}
            type="password"
            value={password}
            setValue={setPassword}
            disabled={loading}
          />
        </FormBody>
        <StyledButton text="Entrar" type="submit" loading={loading} />
      </LoginForm>
    ),
    qrCodeForm: (
      <LoginForm onSubmit={handleSubmitTotp}>
        <QrCodeContainer>
          <Image src={LoginLogo} width={250} alt="login" />
          <Image src={totp.qrCode} alt="Qr Code" width={240} height={240} />
          <h3>Digite os números de segurança do autenticador </h3>
          <TotpInputContainer>
            {[1, 2, 3, 4, 5, 6].map((inpt) => (
              <TotpInput
                key={inpt}
                onChange={(event) => handleTotpChange(event, inpt)}
                id={inpt}
                value={totpInput[inpt]}
                type="number"
                dis
              />
            ))}
          </TotpInputContainer>
          <StyledButton
            text="Verificar"
            type="submit"
            loading={loading}
            disabled={Object.values(totpInput).includes("")}
          />
        </QrCodeContainer>
      </LoginForm>
    ),
    sms2faForm: <>2fa sms</>,
  };

  const RenderSteps = useMemo(() => {
    return steps[step];
  }, [step, email, password, totpInput, loading]);

  return loading ? (
    <LoaderContainer>
      <StyledHeader>Carregando.</StyledHeader>
      <SyncLoader size={12} />
    </LoaderContainer>
  ) : (
    <Container>{RenderSteps}</Container>
  );
}
