import { originalRequest } from "../helpers/originalRequest.helpers.js";
import { handleErrorRoutine } from "../helpers/handleErrorRoutine.helpers.js";
import { getAccessToken } from "../utils/tokenStore.utils.js";

export const authFetch = async (urlPath, method, body = null) => {
  const URL_BASE = import.meta.env.VITE_API_URL_BASE;
  const accessToken = getAccessToken();
  const url = `${URL_BASE}${urlPath}`;
  const options = {
    method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const data = await originalRequest(url, options);
    return data;
  } catch (error) {
    const routineResult = await handleErrorRoutine(error, URL_BASE, url, options);
    return routineResult;
  }
};
