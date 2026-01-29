import APIResponse from "../../../utils/APIResponse.utils.js";
import { validateMongooseId } from "../../../validators/mongooseId.validators.js";
import { changeCheckIn } from "../services/checkIn.services.js";
import { updateWeekStatus } from "../services/updateWeekStatus.services.js";

export const changeCheckInStatus = async (req, res, next) => {
  try {
    const user = req.user;
    const { checkInId } = req.params;
    validateMongooseId(checkInId);
    await changeCheckIn(user._id, checkInId);
    await updateWeekStatus(user._id);
    const response = new APIResponse(200, null, "Checked-in successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
