export const repeatRequest = async (url, options, newAccessToken) => {
  const newOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${newAccessToken}`,
    },
  };
  const repeatResponse = await fetch(url, newOptions);
  const parsedRepeatResponse = await repeatResponse.json();

  return parsedRepeatResponse;
};
