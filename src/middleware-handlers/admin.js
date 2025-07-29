import { NextResponse } from "next/server";
import { AuthenticationService } from "services/authentication";
import { ERROR_MESSAGES } from "utils/constants";
import { decryptWithCypher, encryptWithCypher } from "utils/encryption";

export const adminMiddleware = async (nextRequest) => {
  try {
    const token = nextRequest.cookies.get("t")?.value;

    if (!token) throw new Error(ERROR_MESSAGES.INVALID_COOKIE);

    const decryptedToken = decryptWithCypher(token);

    const verified = await AuthenticationService.validateToken(decryptedToken);

    const isAdmin = (type) => type === "admin";

    if (!verified.id || !isAdmin(verified?.type))
      throw new Error(ERROR_MESSAGES.IS_NOT_ADMIN);
  } catch (error) {
    return NextResponse.redirect(new URL("/authenticated", nextRequest.url));
  }
};
