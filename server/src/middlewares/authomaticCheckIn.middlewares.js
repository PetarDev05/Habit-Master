import { authomaticCorrection } from "../modules/data/services/authomaticCheckInCorrection.services.js";
import { updateWeekStatus } from "../modules/data/services/updateWeekStatus.services.js";

export const authomaticCheckIn = async (req, res, next) => {
  try {
    const user = req.user;
    await authomaticCorrection(user._id);
    await updateWeekStatus(user._id);
    next();
  } catch (error) {
    next(error);
  }
};
