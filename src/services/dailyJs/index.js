import customFetch from "interceptor";
import { BASE_API_URL, ERROR_MESSAGES } from "utils/constants";
import { decryptWithCypher } from "utils/encryption";
import { getValueFromCookies } from "utils/storage";

const commonHeaders = {
  "Content-Type": "Application/json",
};

const getRecordFromRoomId = async (roomId) => {
  const encryptedToken = await getValueFromCookies("t");
  const token = decryptWithCypher(encryptedToken);

  if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

  const record = await customFetch(
    `${BASE_API_URL}/worker/recordings/${roomId}`,
    {
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataJson = await record.json();

  if (dataJson.message) throw new Error(dataJson.message);

  return dataJson.downloadURL;
};

export const dailyJsService = { getRecordFromRoomId };
