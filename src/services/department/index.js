import customFetch from "interceptor";
import { BASE_API_URL, ERROR_MESSAGES } from "utils/constants";
import { decryptWithCypher } from "utils/encryption";
import { getValueFromCookies } from "utils/storage";

const commonHeaders = {
  "Content-Type": "Application/json",
};

const createDepartment = async (payload, companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/${companyId}/department/create`,
    {
      method: "POST",
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const bulkAddDepartments = async (payload, companyId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/${companyId}/departments/create/bulk`,
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

export const DepartmentService = {
  createDepartment,
  bulkAddDepartments,
};
