export const BASE_API_URL = "https://api-helpvox.helpvox.app/api";
// export const BASE_API_URL = "http://localhost:8084/api";
// export const BASE_SOCKET_API_URL = process.env.NEXT_PUBLIC_IS_LOCAL
// ? "http://localhost:8085"
// : "wss://saude.nr1pro.com.br";
export const BASE_SOCKET_API_URL = "wss://api-helpvox.helpvox.app";

export const BASE_SMS_2FA_URL = "https://rest.clicksend.com/v3/sms/send";

export const BASE_DAILY_JS_URL = "https://helpvoxapp.daily.co";

export const ALERT_DIALOG_CLEANUP_TIMER = 5000;
export const CALL_RESPONSE_TIME = 25000;

export const ERROR_MESSAGES = {
  INVALID_COOKIE: "Cookie inválido ou expirado.",
  IS_NOT_ADMIN: "Acesso não autorizado para esse perfil de usuário.",
  JWT_EXPIRED: "jwt expired",
  NO_AGENTS_AVAILABLE: "Não há agentes disponíveis.",
  USER_ALREADY_EXISTS: "Usuário já existe na base de dados.",
  SEND_SMS: "Erro ao enviar SMS, tente novamente em alguns instantes.",
  INVALID_SMS_CODE: "Código inválido, por favor tente novamente.",
  HAS_NO_PHONE:
    "Telefone não cadastrado, por favor acesse a plataforma de talentos para atualizar seus dados.",
};

export const SUCCESS_MESSAGES = {
  USER_SUCCESSFULL_CREATED: "Usuário criado com sucesso.",
  USERS_SUCCESSFULL_CREATED: "Usuários da lista adicionados com sucesso.",
  USERS_SUCCESSFULL_DELETED: "Usuários da lista deletados com sucesso.",
  USER_SUCESSFULL_UPDATED: "Usuário atualizado com sucesso.",
  CREDENTIAL_SUCESSFULL_UPDATED: "Credencial atualizada com sucesso.",
  DEPARTMENT_SUCCESSFULL_CREATED: "Departamento criado com sucesso.",
  DEPARTMENTS_SUCCESSFULL_CREATED: "Departamentos criados com sucesso.",
};

export const ADMIN_BASE_URL = "/admin";
export const AUTHENTICATED_BASE_URL = "/authenticated";

export const INTERNAL_SERVER_ERROR_MESSAGE = "Failed to fetch";

export const months = [
  { month: "Janeiro", value: "01" },
  { month: "Fevereiro", value: "02" },
  { month: "Março", value: "03" },
  { month: "Abril", value: "04" },
  { month: "Maio", value: "05" },
  { month: "Junho", value: "06" },
  { month: "Julho", value: "07" },
  { month: "Agosto", value: "08" },
  { month: "Setembro", value: "09" },
  { month: "Outubro", value: "10" },
  { month: "Novembro", value: "11" },
  { month: "Dezembro", value: "12" },
];

const monthsAbbr = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

export const MONTHS_THIS_YEAR = monthsAbbr.map(
  (month) => `${month}/${new Date().getFullYear()}`
);

export const CHART_NO_DATA_TO_SHOW = "Não há dados a exibir.";

export const availableTimeToSchedule = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export const PHYSICIANS_SPECILITIES = [
  { value: "intérprete", text: "Intérprete" },
];
