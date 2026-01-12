import APIError from "../utils/APIError.utils.js";

export const compareDates = (checkIn, today) => {
  if (today.getFullYear() !== checkIn.dueDate.getFullYear()) {
    throw new APIError("Invalid time interval", 409, "CONFLICT");
  }

  if (today.getMonth() !== checkIn.dueDate.getMonth()) {
    throw new APIError("Invalid time interval", 409, "CONFLICT");
  }

  if (today.getDate() !== checkIn.dueDate.getDate()) {
    throw new APIError("Invalid time interval", 409, "CONFLICT");
  }
};
