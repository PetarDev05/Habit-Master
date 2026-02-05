import { authFetch } from "../../../api/authFetch.api.jsx";

export const checkIn = async (checkInId) => {
  const updatedData = await authFetch(
    `/data/${checkInId}/check-in`,
    "PATCH",
    null,
  );
  return updatedData;
};
