import APIError from "../utils/APIError.utils.js";

export const compareDates = (date, today) => {
  if (today.getFullYear() !== date.getFullYear()) {
    throw new APIError("Invalid time interval", 409, "CONFLICT");
  }

  if (today.getMonth() !== date.getMonth()) {
    throw new APIError("Invalid time interval", 409, "CONFLICT");
  }

  if (today.getDate() !== date.getDate()) {
    throw new APIError("Invalid time interval", 409, "CONFLICT");
  }
};
