import APIError from "../utils/APIError.utils.js";

export const validateWeekData = (startDate, today, habits, activeWeek) => {
  if (activeWeek) {
    throw new APIError("There is currently active week", 409, "ACTIVE_WEEK_EXISTS");
  }

  if (!habits) {
    throw new APIError("No habits provided", 400, "INVALID_WEEK_STATE");
  }

  if (habits.length > 5 || habits.length < 1) {
    throw new APIError("You can create up to 5 habits per week", 400, "INVALID_WEEK_STATE");
  }

  if (startDate < today) {
    throw new APIError("You provided invalid date", 400, "INVALID_WEEK_STATE");
  }
};
