import { usePageLoader } from "contexts/Page Loader/PageLoader";
import { useState } from "react";
import { encryptWithCypher } from "utils/encryption";
import * as XLSX from "xlsx";
import {
  BulkRegisterButtonsContainer,
  BulkRegisterContainer,
} from "./BatchRegister.styles";
import StyledButton from "shared/Button";
import { useAlert } from "contexts/Alert/Alert";
import { AuthenticationService } from "services/authentication";
import { useUser } from "contexts/User/User";
import LoaderContainer from "shared/LoaderContainer";
import { SUCCESS_MESSAGES } from "utils/constants";

export default function BatchRegister() {
  const [fileName, setFileName] = useState("");
  const [bulkUsers, setBulkUsers] = useState(null);
  const { setPageLoading } = usePageLoader();
  const { setContent } = useAlert();
  const { user } = useUser();

  const handleClickOnHiddenInput = () =>
    window.document.getElementById("file").click();

  const handleUploadCSV = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFileName(null);
      setBulkUsers(null);
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      const CSVRows = ["Id", "Nome", "Telefone", "Setor"];

      let error = false;

      const mapped = json.map((value) => {
        delete value["Área RH"];
        delete value["Área RH"];
        return value;
      });

      // mapped.forEach((jsonObject, index) => {
      //   let csvRowValue = 0;
      //   for (const [key, value] of Object.entries(jsonObject)) {
      //     if (CSVRows[csvRowValue] !== key) {
      //       error = true;
      //       return alert(
      //         `Erro: Valor inválido ${CSVRows[csvRowValue]} na linha ${
      //           index + 2
      //         }`
      //       );
      //     }

      //     csvRowValue++;
      //   }
      //   csvRowValue = 0;
      // });

      // if (error) {
      //   window.document.getElementById("file").value = "";
      //   return;
      // }

      setBulkUsers(mapped);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleAddBulkUsersFromCSV = async () => {
    try {
      setPageLoading(true);

      const payload = [];
      const c = ["id", "name", "phone", "speciality"];

      bulkUsers.forEach((user, outerIndex) => {
        const obj = {};
        let counter = 0;
        for (const [key, value] of Object.entries(user)) {
          const payloadKey = c[counter];
          if (key?.toLowerCase()?.trim().includes("tel")) {
            const temp =
              value == 0 ? null : value.toString()?.trim().replaceAll("-", "");
            obj[payloadKey] = temp;
          } else {
            obj[payloadKey] = value;
          }
          // if (key == "Setor" || key == "Área RH" || key == "Área RH") {
          //   obj[payloadKey] = value;
          // } else if (key.toLowerCase() == "re") {
          //   obj["em"] = encryptWithCypher(value.toString());
          //   obj["uid"] = encryptWithCypher(value.toString());
          // } else if (key == "Telefone") {
          //   obj["pw"] = encryptWithCypher(value.toString());
          //   obj["pn"] = encryptWithCypher(value.toString());
          // } else {
          //   obj[payloadKey] = encryptWithCypher(value.toString());
          // }

          counter++;
        }
        payload.push(obj);
        counter = 0;
      });

      // const phoneCorrector = payload.map((value) => {
      //   if (value.phone) {
      //     let temp = String(value.phone);
      //     temp = temp.trim();
      //     temp = temp.replaceAll("-", "");

      //     return temp;
      //   }

      //   return value;
      // });

      await AuthenticationService.bulkAddUsers(payload, user.id);

      setContent({
        message: SUCCESS_MESSAGES.USERS_SUCCESSFULL_CREATED,
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
      setPageLoading(false);
    }
  };

  const handleDownloadCSVExample = (e) => {
    e.preventDefault();
    const downloadAnchor = window.document.getElementById("download-csv");
    downloadAnchor.click();
  };
  return (
    <BulkRegisterContainer>
      <LoaderContainer />
      <h3>Cadastrar usuários pela planilha</h3>

      <BulkRegisterButtonsContainer>
        <p>
          <strong>passo 1</strong>: <strong>Baixe a planilha</strong> de exemplo
          para preenchimento caso ainda não tenha.
        </p>
        <p>
          <strong>passo 2</strong>: <strong>Preencha a planilha</strong> com os
          usuários a serem cadastrados
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

        <div style={{ marginTop: "0.5rem" }}>
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
              />
            </>
          )}
        </div>
        <StyledButton
          text="Baixar planilha de exemplo"
          type="submit"
          inverse
          onClick={handleDownloadCSVExample}
        />
        <a href="/planilha_exemplo_usuarios.xlsx" download id="download-csv" />
      </BulkRegisterButtonsContainer>
    </BulkRegisterContainer>
  );
}
