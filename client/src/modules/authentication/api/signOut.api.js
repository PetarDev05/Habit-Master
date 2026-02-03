import { authFetch } from "../../../api/authFetch.api.jsx";

export const signOut = async (userId) => {
  const signOutConfirmation = await authFetch(
    `/user/${userId}/sign-out`,
    "PATCH",
  );

  return signOutConfirmation;
};
