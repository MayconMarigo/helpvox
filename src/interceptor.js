import { ERROR_MESSAGES } from "utils/constants";
import { deleteValueInCookies } from "utils/storage";

const customFetch = async (...args) => {
  const response = await fetch(...args);

  response
    .clone()
    .json()
    .then((data) => {
      if (
        data.message == ERROR_MESSAGES.JWT_EXPIRED &&
        window.location.pathname !== "/login"
      ) {
        deleteValueInCookies("t");
        window.location.href = "/login";
      }
    })
    .catch((error) => {
      if (
        error.message == ERROR_MESSAGES.JWT_EXPIRED &&
        window.location.pathname !== "/login"
      ) {
        deleteValueInCookies("t");
        window.location.href = "/login";
      }
    });

  return response;
};

export default customFetch;
