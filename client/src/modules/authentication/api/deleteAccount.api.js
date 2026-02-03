import { authFetch } from "../../../api/authFetch.api.jsx";

export const deleteAccount = async () => {
  const deleteConfirmation = await authFetch("/user/delete-account", "DELETE");
  return deleteConfirmation;
};
