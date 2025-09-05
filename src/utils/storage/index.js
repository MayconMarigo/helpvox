import { decryptWithCypher, encryptWithCypher } from "@utils/encryption";
import Cookies from "universal-cookie";

export const setValueInStorage = (key, value) => {
  const stringifyiedValue = JSON.stringify(value);
  const encryptedValue = encryptWithCypher(stringifyiedValue);
  return localStorage.setItem(key, encryptedValue);
};

export const getValueFromStorage = (key) => {
  const value = localStorage.getItem(key);
  if (!value) return null;
  const decryptedValue = decryptWithCypher(value);
  const parsedValue = JSON.parse(decryptedValue);

  return parsedValue;
};

export const deleteValueInStorage = (key) => localStorage.removeItem(key);

export const setValueInCookies = async (key, value, httpOnly = false) => {
  const cookieStore = new Cookies();
  const encryptedValue = encryptWithCypher(value);
  return cookieStore.set(key, encryptedValue, { httpOnly, path: "/" });
};

export const getValueFromCookies = async (key) => {
  const cookieStore = new Cookies();
  return cookieStore.get(key, { path: "/" });
};

export const deleteValueInCookies = async (key) => {
  const cookieStore = new Cookies();
  cookieStore.remove(key, { path: "/" });
};
