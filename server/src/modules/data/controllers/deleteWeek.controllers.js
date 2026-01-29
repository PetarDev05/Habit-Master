import APIResponse from "../../../utils/APIResponse.utils.js";
import { validateMongooseId } from "../../../validators/mongooseId.validators.js";
import { deleteWeekData } from "../services/deleteWeekData.services.js";

export const deleteWeek = async (req, res, next) => {
  try {
    const user = req.user;
    const { weekId } = req.params;
    validateMongooseId(weekId);
    await deleteWeekData(user._id, weekId);
    const response = new APIResponse(200, null, "Week data deleted successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
