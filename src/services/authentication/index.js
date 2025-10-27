import customFetch from "interceptor";
import {
  BASE_API_URL,
  BASE_SMS_2FA_URL,
  ERROR_MESSAGES,
} from "utils/constants";
import { decryptWithCypher, encryptWithCypher } from "utils/encryption";
import { deleteValueInCookies, getValueFromCookies } from "utils/storage";

const commonHeaders = {
  "Content-Type": "Application/json",
};

const authenticate = async (payload) => {
  const { email, password } = payload;

  const auth = await customFetch(`${BASE_API_URL}/auth`, {
    method: "POST",
    body: JSON.stringify({
      em: encryptWithCypher(email),
      pw: encryptWithCypher(password),
    }),
    headers: {
      ...commonHeaders,
    },
  });

  const authJson = await auth.json();

  if (authJson.message) throw new Error(authJson.message);

  const { token } = await authJson;

  const qrCodeData = await customFetch(`${BASE_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      t: token,
    }),
    headers: {
      ...commonHeaders,
    },
  });

  const qrCodeDataJson = await qrCodeData.json();

  if (qrCodeDataJson.message) throw new Error(qrCodeDataJson.message);

  return { qrCodeDataJson, token };
};

const authenticateWithCredentials = async (payload) => {
  const { email, credentials } = payload;

  const auth = await customFetch(`${BASE_API_URL}/credentials/auth`, {
    method: "POST",
    body: JSON.stringify({
      em: encryptWithCypher(email),
      pn: encryptWithCypher(credentials),
    }),
    headers: {
      ...commonHeaders,
    },
  });

  const authJson = await auth.json();

  if (authJson.message) throw new Error(authJson.message);

  const authToken = authJson.token;
  const phone = authJson.phone;

  return { authToken, phone };
};

const generateSMSCredentials = async (phone) => {
  const authSMS = btoa(
    `${process.env.NEXT_PUBLIC_SMS_USER}:${process.env.NEXT_PUBLIC_SMS_API_KEY}`
  );

  const generateRandomNumber = () => {
    let rand = Math.floor(Math.random() * 1000000);
    if (rand.toString().length < 6) {
      return generateRandomNumber();
    }

    return rand;
  };

  const random = generateRandomNumber();

  const resp = await fetch(BASE_SMS_2FA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + authSMS,
    },
    body: JSON.stringify({
      messages: [
        {
          source: "php",
          from: "Helpvox",
          body: `Helpvox Security - O seu código de acesso é ${random}`,
          to: `+55${phone}`,
        },
      ],
    }),
  });

  const data = await resp.json();

  if (data?.http_code !== 200) throw new Error(ERROR_MESSAGES.SEND_SMS);

  return { random };
};

const logout = async (userType) => {
  await deleteValueInCookies("t");

  if (userType == "4") {
    return window.location.replace("/credentials/login");
  }

  return (window.location.href = "/login");
};

const register = async (payload, userType, userId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const url =
    userType == "admin" ? "admin/user/create" : `${userId}/user/create`;

  const register = await customFetch(`${BASE_API_URL}/${url}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const registerJson = await register.json();

  if (registerJson.message) throw new Error(registerJson.message);

  return registerJson;
};

const updateUser = async (payload, userType, type) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const url =
    userType == "admin"
      ? `admin/user/update/${type}`
      : `enterprise/user/update`;

  const updated = await customFetch(`${BASE_API_URL}/${url}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  if (updated.ok) return;

  const updatedJson = await updated.json();

  if (updatedJson.message) throw new Error(updatedJson.message);

  return updatedJson;
};

const updateCompanyRecordCall = async (isActive, userId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const url = "enterprise/user/self/update";

  const updated = await customFetch(`${BASE_API_URL}/${url}`, {
    method: "PUT",
    body: JSON.stringify({ rc: isActive, uid: encryptWithCypher(userId) }),
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  if (updated.ok) return;

  const updatedJson = await updated.json();

  if (updatedJson.message) throw new Error(updatedJson.message);

  return updatedJson;
};

const relogin = async () => {};

const validateToken = async (token) => {
  const verifyToken = await customFetch(`${BASE_API_URL}/verify-token`, {
    method: "POST",
    body: JSON.stringify({
      t: token,
    }),
    headers: {
      ...commonHeaders,
    },
  });

  const response = await verifyToken.json();

  return response;
};

const verify2faToken = async (secret, code, token) => {
  const verify = await customFetch(`${BASE_API_URL}/verify-2fa`, {
    method: "POST",
    body: JSON.stringify({
      stfa: encryptWithCypher(secret),
      c: encryptWithCypher(code),
    }),
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const verifyJson = await verify.json();

  if (verifyJson.message) throw new Error(verifyJson.message);

  return verifyJson;
};

const getuserData = async (token) => {
  const data = await customFetch(`${BASE_API_URL}/user-data`, {
    method: "POST",
    body: JSON.stringify({
      t: token,
    }),
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getAllUsers = async (userType, userId, searchType) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const url =
    userType == "admin"
      ? `admin/users/get-all/${searchType}`
      : `${userId}/users/get-all`;

  const data = await customFetch(`${BASE_API_URL}/${url}`, {
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getUserDashBoardInfo = async (userId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(`${BASE_API_URL}/dashboards/${userId}`, {
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getAdminAgendaByUserId = async (userId, startDate, endDate) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/admin/schedule/${userId}/get-all?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getUserAgendaByUserId = async (userId, startDate, endDate) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const hasFinalDate = endDate ? `&endDate=${endDate}` : "";
  const data = await customFetch(
    `${BASE_API_URL}/schedule/${userId}/get-all?startDate=${startDate}${hasFinalDate}`,
    {
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getUserScheduledyUserId = async (userId, startDate, endDate) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const hasFinalDate = endDate ? `&endDate=${endDate}` : "";
  const data = await customFetch(
    `${BASE_API_URL}/scheduled/${userId}/get-all?startDate=${startDate}${hasFinalDate}`,
    {
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const createUserAvailability = async (payload, multiple, userId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/schedule/${userId}/create?multiple=${multiple}`,
    {
      method: "POST",
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (data.ok) return;

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getUserDashboardInfo = async (userId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(`${BASE_API_URL}/dashboards/${userId}`, {
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getAllCompanyUsers = async (companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(`${BASE_API_URL}/users/${companyId}/list`, {
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getAllCredentialsByUserId = async (companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/credentials/${companyId}/list`,
    {
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const generateCredentialsByUserId = async (companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/credentials/${companyId}/create`,
    {
      method: "POST",
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (data.ok) return;

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const associateUserToCompanyAgenda = async (
  companyId,
  associateId,
  agendaId,
  finalDateTime
) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/agenda/${companyId}/associate/${associateId}`,
    {
      method: "POST",
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ agendaId, finalDateTime }),
    }
  );

  if (data.ok) return;

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const updateCredential = async (credential, status) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/enterprise/credential/update`,
    {
      method: "PUT",
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ credential, status }),
    }
  );

  if (data.ok) return;

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const deleteAvailability = async (agendaId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(`${BASE_API_URL}/agenda/${agendaId}/delete`, {
    method: "PUT",
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  if (data.ok) return;

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const bulkAddUsers = async (payload, companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/${companyId}/users/create/bulk`,
    {
      method: "POST",
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (data.ok) return;

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const bulkDeleteUsers = async (companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/${companyId}/users/delete/bulk`,
    {
      method: "DELETE",
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (data.ok) return;

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getAllDepartmentsByCompanyId = async (companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/departments/${companyId}/get-all`,
    {
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getDashboardCSVInfo = async (companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/${companyId}/dashboards/csv`,
    {
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const createManualCall = async (company, quantity) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(`${BASE_API_URL}/calls/${company}/create`, {
    method: "POST",
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity: Number(quantity) }),
  });

  if (data.ok) return;

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

// const adminGetAllCompanyUsers = async (companyId) => {
//   const encryptedToken = await getValueFromCookies("t");
//   const token = decryptWithCypher(encryptedToken);

//   if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

//   const data = await customFetch(`${BASE_API_URL}/admin/company/get-all`, {
//     headers: {
//       ...commonHeaders,
//       authorization: `Bearer ${token}`,
//     },
//   });

//   const dataJson = await data.json();

//   if (dataJson.message) throw new Error(dataJson.message);

//   return dataJson;
// };

export const AuthenticationService = {
  authenticate,
  logout,
  register,
  updateUser,
  relogin,
  validateToken,
  verify2faToken,
  getuserData,
  getAllUsers,
  getUserDashBoardInfo,
  getAdminAgendaByUserId,
  getUserAgendaByUserId,
  createUserAvailability,
  getUserDashboardInfo,
  getAllCompanyUsers,
  getAllCredentialsByUserId,
  generateCredentialsByUserId,
  associateUserToCompanyAgenda,
  updateCredential,
  getUserScheduledyUserId,
  deleteAvailability,
  bulkAddUsers,
  bulkDeleteUsers,
  authenticateWithCredentials,
  generateSMSCredentials,
  getAllDepartmentsByCompanyId,
  getDashboardCSVInfo,
  updateCompanyRecordCall,
  createManualCall,
};
