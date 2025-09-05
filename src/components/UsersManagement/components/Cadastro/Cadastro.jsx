import { useAlert } from "contexts/Alert/Alert";
import { useEffect, useState } from "react";
import { RgbColorPicker } from "react-colorful";
import ImageUploading from "react-images-uploading";
import { AuthenticationService } from "services/authentication";
import StyledButton from "shared/Button";
import Dropdown from "shared/Dropdown";
import StyledInput from "shared/Input";
import {
  ERROR_MESSAGES,
  PHYSICIANS_SPECILITIES,
  SUCCESS_MESSAGES,
} from "utils/constants";
import { encryptWithCypher } from "utils/encryption";
import {
  formatImageName,
  formatRGBColorObjectToString,
  formatRGBForBackend,
} from "utils/formatter";
import { cpfMask, phoneMask } from "utils/mask/mask";
import {
  BulkRegisterButtonsContainer,
  BulkRegisterContainer,
  ButtonContainer,
  ColorPickerContainer,
  Container,
  Divider,
  ImageUploadContainer,
  InputContainer,
} from "./Cadastro.styles";
import { useUser } from "contexts/User/User";
import { DepartmentService } from "services/department";

export default function Cadastro({ type }) {
  const { user } = useUser();
  // const userTypeValue = user.type == "company" ? "4" : "2";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState(type);
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
  const [document, setDocument] = useState("");
  const [bulkUsers, setBulkUsers] = useState(null);

  const specialityDropDownContent = PHYSICIANS_SPECILITIES;

  const [speciality, setSpeciality] = useState(
    specialityDropDownContent[0].value
  );

  const [role, setRole] = useState();
  const [companyRoles, setCompanyRoles] = useState(null);

  const isDisabled =
    userType == "4"
      ? !fullName || !email || !phone || !document || !password || loading
      : !fullName || !email || !password || !userType || loading;

  useEffect(() => {
    if (user.type !== "company") return;

    const fetchDepartments = async () => {
      try {
        const departments =
          await AuthenticationService.getAllDepartmentsByCompanyId(user.id);

        const clone = departments.map((department) => {
          return {
            value: department.name,
            text: department.name,
          };
        });
        setCompanyRoles(clone);
        setRole(clone[0].value);
      } catch (error) {}
    };
    fetchDepartments();
  }, [userType]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const payload = {
        nm: encryptWithCypher(fullName),
        em: encryptWithCypher(email),
        pw: encryptWithCypher(password),
        uti: encryptWithCypher(userType.toString()),
        pn: encryptWithCypher(phone),
      };

      if (userType == "2") {
        payload.cl = formatRGBForBackend(color);
        payload.fl = base64String;
      }

      if (userType == "3") {
        payload.esp = speciality;
      }

      if (userType == "4") {
        payload.doc = encryptWithCypher(document);
        payload.rl = encryptWithCypher(role);
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

      resetForm();
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

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setLogo("");
    setDocument("");
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

  // const handleClickOnHiddenInput = () =>
  //   window.document.getElementById("file").click();

  // const [fileName, setFileName] = useState("");

  // const handleUploadCSV = async (e) => {
  //   const file = e.target.files[0];

  //   if (!file) {
  //     setFileName(null);
  //     setBulkUsers(null);
  //     return;
  //   }

  //   setFileName(file.name);
  //   const reader = new FileReader();

  //   reader.onload = (evt) => {
  //     const data = new Uint8Array(evt.target.result);
  //     const workbook = XLSX.read(data, { type: "array" });

  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const json = XLSX.utils.sheet_to_json(sheet);

  //     const CSVRows = ["Nome", "Telefone", "Email", "CPF"];

  //     let error = false;

  //     json.forEach((jsonObject, index) => {
  //       let csvRowValue = 0;
  //       for (const [key, value] of Object.entries(jsonObject)) {
  //         if (CSVRows[csvRowValue] !== key) {
  //           error = true;
  //           return alert(
  //             `Erro: Valor inválido ${CSVRows[csvRowValue]} na linha ${
  //               index + 2
  //             }`
  //           );
  //         }

  //         csvRowValue++;
  //       }
  //       csvRowValue = 0;
  //     });

  //     if (error) {
  //       window.document.getElementById("file").value = "";
  //       return;
  //     }

  //     setBulkUsers(json);
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  // const handleAddBulkUsersFromCSV = async () => {
  //   try {
  //     setLoading(true);

  //     const payload = [];
  //     const c = ["nm", "pn", "em", "doc"];

  //     bulkUsers.forEach((user, outerIndex) => {
  //       const obj = {};
  //       let counter = 0;
  //       for (const [key, value] of Object.entries(user)) {
  //         const payloadKey = c[counter];
  //         obj[payloadKey] = encryptWithCypher(value.toString());
  //         counter++;
  //       }
  //       payload.push(obj);
  //       counter = 0;
  //     });
  //     await AuthenticationService.bulkAddUsers(payload, user.id);

  //     setContent({
  //       message: SUCCESS_MESSAGES.USERS_SUCCESSFULL_CREATED,
  //       type: "sucesso",
  //       isOpen: true,
  //     });
  //   } catch (error) {
  //     setContent({
  //       message: error.message,
  //       type: "erro",
  //       isOpen: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDownloadCSVExample = (e) => {
  //   e.preventDefault();
  //   const downloadAnchor = window.document.getElementById("download-csv");
  //   downloadAnchor.click();
  // };

  const htmlLabelByUserType = {
    2: "Empresa",
    3: "Médico",
    4: "Nome Completo",
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputContainer>
        <StyledInput
          disabled={loading}
          value={fullName}
          htmlLabel={htmlLabelByUserType[type]}
          // htmlLabel={
          //   user.type == "admin" ? "Empresa ou Médico" : "Nome Completo"
          // }
          placeHolder="Digite o nome completo..."
          setValue={setFullName}
          fullWidth
        />
        {user.type == "company" && (
          <StyledInput
            disabled={loading}
            value={email}
            htmlLabel={"Login (email ou nome de usuário)"}
            placeHolder="Digite o login..."
            setValue={setEmail}
            fullWidth
          />
        )}

        {user.type !== "company" && (
          <StyledInput
            disabled={loading}
            value={email}
            htmlLabel={"Email"}
            placeHolder="Digite o email..."
            setValue={setEmail}
            type="email"
            fullWidth
          />
        )}
      </InputContainer>
      <InputContainer>
        {user.type != "company" && (
          <StyledInput
            disabled={loading}
            value={password}
            htmlLabel={"Senha"}
            placeHolder="Digite a senha..."
            setValue={setPassword}
            type="password"
            fullWidth
          />
        )}
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
        {userType == "4" && (
          <StyledInput
            disabled={loading}
            value={cpfMask(document)}
            htmlLabel={"CPF"}
            placeHolder="Digite o CPF..."
            setValue={setDocument}
            fullWidth
            maxLength={14}
          />
        )}

        {user.type != "company" && (
          <Dropdown
            disabled
            value={userType}
            htmlLabel={"Tipo de usuário"}
            onChange={setUserType}
            fullWidth
          />
        )}
      </InputContainer>
      {userType == "4" && (
        <InputContainer>
          <Dropdown
            style={{ maxWidth: "300px", width: "100%" }}
            value={role}
            htmlLabel={"Setor"}
            onChange={setRole}
            content={
              companyRoles || [{ value: null, text: "Selecionar cargo..." }]
            }
          />
          <StyledInput
            disabled={loading}
            value={password}
            htmlLabel={"Senha"}
            placeHolder="Digite a senha..."
            setValue={setPassword}
            type="password"
            fullWidth
          />
        </InputContainer>
      )}
      {user.type != "company" && userType == "3" && (
        <InputContainer>
          <Dropdown
            style={{ minWidth: "300px" }}
            value={speciality}
            htmlLabel={"Especialidade"}
            onChange={setSpeciality}
            content={specialityDropDownContent}
          />
        </InputContainer>
      )}
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

      {/* <Divider /> */}

      {/* <BulkRegisterContainer>
        <h3>Cadastrar usuários pela planilha</h3>

        <BulkRegisterButtonsContainer>
          <p>
            <strong>passo 1</strong>: <strong>Baixe a planilha</strong> de
            exemplo para preenchimento caso ainda não tenha.
          </p>
          <p>
            <strong>passo 2</strong>: <strong>Preencha a planilha</strong> com
            os usuários a serem cadastrados
          </p>
          <p>
            <strong>passo 3</strong>:<strong> Carregue a planilha</strong>{" "}
            preenchida.
          </p>
          <p>
            <strong>passo 4</strong>: Clique em{" "}
            <strong>"Cadastrar Usuários"</strong> para finalizar o cadastro.
          </p>
          <input type="file" name="file" id="file" onChange={handleUploadCSV} />
          <StyledButton
            text="Baixar planilha de exemplo"
            type="submit"
            style={{ marginTop: "1rem" }}
            onClick={handleDownloadCSVExample}
          />
          <a
            href="/planilha_exemplo_usuarios.xlsx"
            download
            id="download-csv"
          />
          <div>
            <StyledButton
              text="Carregar Planilha"
              type="button"
              onClick={handleClickOnHiddenInput}
            />
            {bulkUsers && (
              <>
                <p>Arquivo carregado: {fileName}</p>
                <StyledButton
                  text="Cadastrar Usuários"
                  type="button"
                  onClick={handleAddBulkUsersFromCSV}
                  style={{ marginTop: "1rem" }}
                />
              </>
            )}
          </div>
        </BulkRegisterButtonsContainer>
      </BulkRegisterContainer> */}
    </Container>
  );
}
