import { INTERNAL_SERVER_ERROR_MESSAGE } from "utils/constants";

export const checkErrorType = (message) => {
  if (message == INTERNAL_SERVER_ERROR_MESSAGE) {
    return "Erro interno do servidor, contate o administrador do sistema.";
  }

  return message;
};
