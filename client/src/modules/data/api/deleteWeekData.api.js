import { authFetch } from "../../../api/authFetch.api.jsx";

export const deleteWeekData = async (weekId) => {
  const deleteConfirmation = await authFetch(`/data/${weekId}`, "DELETE", null);
  return deleteConfirmation;
};
