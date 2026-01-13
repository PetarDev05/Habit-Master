import CheckIn from "../models/checkin.models.js";
import { compareDates } from "../utils/compareDates.utils.js";
import { validateCheckInData } from "../validators/checkIn.validators.js";

export const changeCheckIn = async (checkInId, userId) => {
  const today = new Date();
  const checkIn = await CheckIn.findOne({ _id: checkInId });
  validateCheckInData(checkIn, userId);
  compareDates(checkIn.dueDate, today);
  const updatedCheckIn = await CheckIn.findByIdAndUpdate(
    checkInId,
    { status: "done" },
    { new: true }
  );
  return updatedCheckIn;
};
