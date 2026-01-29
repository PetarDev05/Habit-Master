import APIError from "../../../utils/APIError.utils.js";

export const compareDates = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (today.getFullYear() !== dueDate.getFullYear()) {
    throw new APIError(409, "CONFLICT", "Invalid time interval");
  }

  if (today.getMonth() !== dueDate.getMonth()) {
    throw new APIError(409, "CONFLICT", "Invalid time interval");
  }

  if (today.getDate() !== dueDate.getDate()) {
    throw new APIError(409, "CONFLICT", "Invalid time interval");
  }
};
