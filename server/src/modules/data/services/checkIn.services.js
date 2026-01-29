import CheckIn from "../models/checkIn.models.js";
import { compareDates } from "../utils/compareDates.utils.js";
import { validateCheckInData } from "../validators/validateCheckInData.validators.js";

export const changeCheckIn = async (userId, checkInId) => {
  const checkIn = await CheckIn.findCheckIn(userId, checkInId);
  validateCheckInData(checkIn);
  compareDates(checkIn.dueDate);
  await CheckIn.updateCheckIn(checkIn._id);
};
