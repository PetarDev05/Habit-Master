import { setAccessToken } from "../utils/tokenStore.utils.js";
import { extendSession } from "./extendSession.helpers.js";
import { repeatRequest } from "./repeatRequest.helpers.js";

export const handleErrorRoutine = async (error, URL_BASE, url, options) => {
  if (error.code === "TOKEN_MALFORMED") {
    return {
      success: false,
      message: error.message,
      actionType: "SIGN_OUT",
    };
  } else if (error.code === "TOKEN_EXPIRED") {
    const extendResult = await extendSession(URL_BASE);

    if (!extendResult.success) {
      extendResult.actionType = "SIGN_OUT";
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
