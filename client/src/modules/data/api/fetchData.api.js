import { authFetch } from "../../../api/authFetch.api.jsx";

export const fetchAllData = async () => {
  const data = await authFetch("/data/", "GET", null);
  return data;
};
