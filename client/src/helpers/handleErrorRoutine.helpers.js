import { setAccessToken } from "../utils/tokenStore.utils.js";
import { extendSession } from "./extendSession.helpers.js";
import { repeatRequest } from "./repeatRequest.helpers.js";

export const handleErrorRoutine = async (error, URL_BASE, url, options) => {
  if (error.code === "TOKEN_MALFORMED") {
    window.dispatchEvent(new Event("user:sign-out"));
    window.dispatchEvent(new Event("user:clear-data"));
    return {
      success: false,
      message: error.message,
    };
  } else if (error.code === "TOKEN_EXPIRED") {
    const extendResult = await extendSession(URL_BASE);

    console.log("EXTEND RESULT: ", extendResult);

    if (!extendResult.success) {
      window.dispatchEvent(new Event("user:sign-out"));
      window.dispatchEvent(new Event("user:clear-data"));
      return extendResult;
    }

    setAccessToken(extendResult.accessToken);

    const repeatResult = await repeatRequest(
      url,
      options,
      extendResult.accessToken,
    );

    if (!repeatResult.success) {
      return {
        success: false,
        message: repeatResult.message,
      };
    }

    return repeatResult;
  } else {
    return {
      success: false,
      message: error.message,
    };
  }
};
