import customFetch from "interceptor";
import { BASE_API_URL } from "utils/constants";
import { decryptWithCypher } from "utils/encryption";
import { getValueFromCookies } from "utils/storage";

const commonHeaders = {
  "Content-Type": "Application/json",
};

const getAllCalls = async (startDate, endDate) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/admin/calls/get-all?startDate=${startDate}&endDate=${endDate}`,
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

const userGetAllCalls = async (startDate, endDate, userId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/calls/${userId}/get-all?startDate=${startDate}&endDate=${endDate}`,
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

const getAllCallsByCompanyId = async (startDate, endDate, userId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const data = await customFetch(
    `${BASE_API_URL}/calls/${userId}/get-all?startDate=${startDate}&endDate=${endDate}`,
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

export const CallsService = {
  getAllCalls,
  userGetAllCalls,
  getAllCallsByCompanyId,
};
