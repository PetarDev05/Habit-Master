export const extendSession = async (URL_BASE) => {
  const url = `${URL_BASE}/user/extend-session`;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  };

  const response = await fetch(url, options);
  const parsedResponse = await response.json();

  const extendResult = {
    success: parsedResponse.success,
    message: parsedResponse.message,
  };

  if (!parsedResponse.success) {
    return extendResult;
  }

  extendResult.accessToken = parsedResponse.data.accessToken;
  extendResult.existingUser = parsedResponse.data.user;
  return extendResult;
};
