import { NextResponse } from "next/server";
import { AuthenticationService } from "services/authentication";
import { ERROR_MESSAGES } from "utils/constants";
import { decryptWithCypher } from "utils/encryption";
import { deleteValueInCookies } from "utils/storage";

export const userMiddleware = async (nextRequest) => {
  try {
    const encryptedToken = nextRequest.cookies.get("t")?.value;

    const token = decryptWithCypher(encryptedToken);

    if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

    const verified = await AuthenticationService.validateToken(token);

    if (!verified.id) throw new Error(verified.message);
  } catch (error) {
    await deleteValueInCookies("t");
    return NextResponse.redirect(new URL("/login", nextRequest.url));
  }
};
