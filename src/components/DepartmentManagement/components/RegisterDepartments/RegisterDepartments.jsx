import { useAlert } from "contexts/Alert/Alert";
import { useUser } from "contexts/User/User";
import { useState } from "react";
import StyledButton from "shared/Button";
import StyledInput from "shared/Input";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "utils/constants";
import { encryptWithCypher } from "utils/encryption";
import {
  ButtonContainer,
  Container,
  InputContainer,
} from "./RegisterDepartments.styles";
import { DepartmentService } from "services/department";

export default function RegisterDepartments({ type }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { setContent } = useAlert();

  const [departmentName, setDepartmentName] = useState(null);
  const [departmentCode, setDepartmentCode] = useState(null);

  const isDisabled = !departmentName || !departmentCode;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const payload = {
        dptnm: encryptWithCypher(departmentName),
        dptcd: encryptWithCypher(departmentCode),
      };

      await DepartmentService.createDepartment(payload, user.id);

      setContent({
        message: SUCCESS_MESSAGES.DEPARTMENT_SUCCESSFULL_CREATED,
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
    setDepartmentCode("");
    setDepartmentName("");
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputContainer>
        <StyledInput
          disabled={loading}
          value={departmentName}
          htmlLabel={"Nome do Setor"}
          placeHolder="Digite o nome completo do setor..."
          setValue={setDepartmentName}
          fullWidth
        />
        <StyledInput
          disabled={loading}
          value={departmentCode}
          htmlLabel={"Código do setor"}
          placeHolder="Digite o Código do setor..."
          setValue={setDepartmentCode}
          fullWidth
        />
      </InputContainer>

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
