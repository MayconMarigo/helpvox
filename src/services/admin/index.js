import customFetch from "interceptor";
import { BASE_API_URL, ERROR_MESSAGES } from "utils/constants";
import { decryptWithCypher } from "utils/encryption";
import { getValueFromCookies } from "utils/storage";

const commonHeaders = {
  "Content-Type": "Application/json",
};

const getDashboardInfo = async () => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(`${BASE_API_URL}/admin/dashboards`, {
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

const getUsersListWithId = async () => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(`${BASE_API_URL}/admin/users/list`, {
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${token}`,
    },
  });

  const dataJson = await data.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson;
};

export const AdminService = { getDashboardInfo, getUsersListWithId };
