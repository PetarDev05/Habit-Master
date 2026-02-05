import { authFetch } from "../../../api/authFetch.api.jsx";

export const createWeek = async (newWeekData) => {
  const newWeek = await authFetch("/data/", "POST", newWeekData);
  return newWeek;
};
