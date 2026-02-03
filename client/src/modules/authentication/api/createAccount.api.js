import { authFetch } from "../../../api/authFetch.api.jsx";

export const createAccount = async (registrationData) => {
  const newUserData = await authFetch(
    "/user/create-account",
    "POST",
    registrationData,
  );
  
  return newUserData;
};
