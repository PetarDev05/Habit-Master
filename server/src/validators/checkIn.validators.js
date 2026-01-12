import APIError from "../utils/APIError.utils";

export const validateCheckInData = (checkIn, userId) => {
  if (!checkIn) {
    throw new APIError("Check-in not found", 404, "CHECKIN_NOT_FOUND");
  }    

  if (String(checkIn.userId) !== userId) {
    throw new APIError("Invalid user credentials", 409, "CONFLICT");
  }

  if (checkIn.status === "skipped") {
    throw new APIError("This day is skipped", 409, "CONFLICT");
  }

  if (checkIn.status === "missed" || checkIn.status === "done") {
    throw new APIError("You already checked-in for today", 409, "CONFLICT");
  }
};
