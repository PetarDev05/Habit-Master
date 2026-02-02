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

  if (!parsedResponse.success) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse.accessToken;
};
