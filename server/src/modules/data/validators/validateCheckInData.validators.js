import APIError from "../../../utils/APIError.utils.js";

export const validateCheckInData = (checkIn) => {
  if (!checkIn) {
    throw new APIError(404, "CHECKIN_NOT_FOUND", "Check-in not found");
  }

  if (checkIn.status === "skipped") {
    throw new APIError(409, "CONFLICT", "This day is skipped");
  }

  if (checkIn.status === "missed" || checkIn.status === "done") {
    throw new APIError(409, "CONFLICT", "You already checked-in for today");
  }
};
