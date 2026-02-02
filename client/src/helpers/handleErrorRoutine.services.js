import { extendSession } from "./extendSession.helpers.js";
import { repeatRequest } from "./repeatRequest.helpers.js";

export const handleErrorRoutine = async (error, URL_BASE, url, options) => {
  if (error.code === "TOKEN_MALFORMED") {
    throw new Error(error.message);
  } else if (error.code === "TOKEN_EXPIRED") {
    const newAccessToken = await extendSession(URL_BASE);
    const repeatData = await repeatRequest(url, options, newAccessToken);
    return repeatData;
  } else {
    throw new Error(error.message);
  }
};
