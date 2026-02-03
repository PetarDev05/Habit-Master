import { authFetch } from "../../../api/authFetch.api.jsx";

export const signIn = async (signInData) => {
  const userData = await authFetch("/user/sign-in", "PATCH", signInData);
  return userData;
};
