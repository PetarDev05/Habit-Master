import APIResponse from "../../../utils/APIResponse.utils.js";
import { createWeek } from "../services/createWeek.sevices.js";

export const createNewWeek = async (req, res, next) => {
  try {
    const user = req.user;
    const { userDateString, habits } = req.body;
    const { newWeek, newHabits, newCheckIns } = await createWeek(user._id, habits, userDateString);
    const response = new APIResponse(
      200,
      { newWeek, newHabits, newCheckIns },
      "New week created successfully"
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
