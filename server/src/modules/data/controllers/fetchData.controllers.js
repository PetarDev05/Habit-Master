import APIResponse from "../../../utils/APIResponse.utils.js";
import { getTheData } from "../services/fetchData.services.js";

export const fetchData = async (req, res, next) => {
  try {
    const user = req.user;
    const { weeks, habits, checkIns } = await getTheData(user._id);
    const response = new APIResponse(200, { weeks, habits, checkIns }, "Data fetched successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
