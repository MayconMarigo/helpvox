import { useAlert } from "contexts/Alert/Alert";
import { useUser } from "contexts/User/User";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SyncLoader } from "react-spinners";
import { AuthenticationService } from "services/authentication";
import StyledButton from "shared/Button";
import StyledInput from "shared/Input";
import { checkErrorType } from "utils/error";
import {
  getValueFromStorage,
  setValueInCookies,
  setValueInStorage,
} from "utils/storage";
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
import * as logo from "../../assets/imgs/logo-login.png";
import { ERROR_MESSAGES } from "utils/constants";
import { decryptWithCypher } from "utils/encryption";

export default function Login() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const LoginLogo = logo.default;
  const [alreadyPreviouslyLoggedUsers, setAlreadyPreviouslyLoggedUsers] =
    useState([]);

  useEffect(() => {
    const APLU = getValueFromStorage("plu");
    if (!APLU) return;
    const parsed = JSON.parse(APLU);
    setAlreadyPreviouslyLoggedUsers(parsed);
  }, []);

  useEffect(() => {
    if (user === null || !user || user === undefined) return setLoading(false);

    if (user) {
      return (window.location.href = "/authenticated/redirect");
    }
  }, [user]);
  const [randomSMSValue, setRandomSMSValue] = useState(null);
  const [email, setEmail] = useState("");
  const [credentials, setCredentials] = useState("");
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
      const data = await AuthenticationService.authenticateWithCredentials({
        email,
        credentials,
      });

      const findEmailInLoggedHistory = !!alreadyPreviouslyLoggedUsers.find(
        (user) => user == email
      );

      if (findEmailInLoggedHistory) {
        handleSuccessfullLogin();
        return;
      }

      const temp = [...alreadyPreviouslyLoggedUsers];
      temp.push(email);
      const crypt = JSON.stringify(temp);

      setValueInStorage("plu", crypt);

      const { random, authToken } = data;

      setToken(authToken);
      setRandomSMSValue(random);

      setStep("smsValidationForm");
    } catch (error) {
      const message = checkErrorType(error.message);
      setContent({ message: message, type: "erro", isOpen: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfullLogin = async () => {
    setContent({
      message: "Autenticado com sucesso, estamos redirecionando você.",
      type: "sucesso",
      isOpen: true,
    });

    await setValueInCookies("t", token);

    window.location.replace = "/authenticated/redirect";
  };

  const handleSubmit2faSMS = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const code = Object.values(totpInput).join("");

      if (code.toString() !== randomSMSValue.toString())
        throw new Error(ERROR_MESSAGES.INVALID_SMS_CODE);

      handleSuccessfullLogin();
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
            htmlLabel="Credencial"
            placeHolder="Digite sua credencial"
            required={true}
            type="text"
            value={credentials}
            setValue={setCredentials}
            disabled={loading}
          />
        </FormBody>
        <StyledButton text="Entrar" type="submit" loading={loading} />
      </LoginForm>
    ),
    smsValidationForm: (
      <LoginForm onSubmit={handleSubmit2faSMS}>
        <QrCodeContainer>
          <Image src={LoginLogo} width={250} alt="login" />
          <h3>Digite os números de segurança enviado por sms.</h3>
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
  };

  const RenderSteps = useMemo(() => {
    return steps[step];
  }, [step, email, credentials, totpInput, loading]);

  return loading ? (
    <LoaderContainer>
      <StyledHeader>Carregando.</StyledHeader>
      <SyncLoader size={12} />
    </LoaderContainer>
  ) : (
    <Container>{RenderSteps}</Container>
  );
}
