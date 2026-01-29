import APIError from "../../../utils/APIError.utils.js";

export const validateNewData = (activeWeek, startDate, todayRef, habits) => {
  if (activeWeek) {
    throw new APIError(409, "ACTIVE_WEEK_EXISTS", "There is currently active week");
  }

  if (!habits || !habits.length) {
    throw new APIError(400, "INVALID_WEEK_STATE", "No habits provided");
  }

  if (habits.length > 5) {
    throw new APIError(400, "INVALID_WEEK_STATE", "You can create up to 5 habits per week");
  }

  if (startDate < todayRef) {
    throw new APIError(400, "INVALID_WEEK_STATE", "You provided invalid starting date");
  }
};
