export const originalRequest = async (url, options) => {
  const response = await fetch(url, options);
  const parsedResponse = await response.json();

  if (!parsedResponse.success) {
    const error = new Error(parsedResponse.message);
    error.code = parsedResponse.code;
    throw error;
  }

  return parsedResponse;
};
