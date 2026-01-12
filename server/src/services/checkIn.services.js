import CheckIn from "../models/checkin.models.js";
import { compareDates } from "../utils/compareDates.utils.js";

export const changeCheckIn = async (checkInId, userId) => {
  const today = new Date();
  const checkIn = await CheckIn.findOne({ _id: checkInId });
  validateCheckInData(checkIn, userId);
  compareDates(checkIn, today);
  const updatedCheckIn = await CheckIn.findByIdAndUpdate(
    checkIn._id,
    { status: "done" },
    { new: true }
  );
  return updatedCheckIn;
};
