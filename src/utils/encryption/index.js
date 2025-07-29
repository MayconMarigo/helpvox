import Crypto from "crypto-js";

export const encryptWithCypher = (value) =>
  Crypto.AES.encrypt(value, process.env.NEXT_PUBLIC_CRYPTO_KEY).toString();

export const decryptWithCypher = (value) => {
  if(!value) return;
  const bytes = Crypto.AES.decrypt(value, process.env.NEXT_PUBLIC_CRYPTO_KEY);
  const decrypted = bytes.toString(Crypto.enc.Utf8);

  return decrypted;
};
