import APIResponse from "../../../utils/APIResponse.utils.js";
import { deleteWeekData } from "../services/deleteWeekData.services.js";

export const deleteWeek = async (req, res, next) => {
  try {
    const user = req.user;
    const { weekId } = req.params;
    await deleteWeekData(user._id, weekId);
    const response = new APIResponse(200, null, "Week data deleted successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
