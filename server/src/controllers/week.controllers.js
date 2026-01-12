import { fetchData } from "../services/fetchData.services.js";
import { deleteWeekDocuments } from "../services/deleteWeek.services.js";
import { createWeek } from "../services/createWeek.services.js";
import { createArrayOfDates } from "../utils/datesArray.utils.js";
import APIResponse from "../utils/APIResponse.utils.js";
import { validateMongooseId } from "../validators/mongooseId.validators.js";
import APIError from "../utils/APIError.utils.js";
import { changeCheckIn } from "../services/checkIn.services.js";

export const getAllWeekData = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { weeks, habits, checkins } = await fetchData(userId);
    const response = new APIResponse(200, { weeks, habits, checkins }, "Data fetched successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const createNewWeek = async (req, res, next) => {
  try {
    const activeWeek = await Week.findOne({ status: "active" });
    if (activeWeek) {
      throw new APIError("There is currently active week", 409, "ACTIVE_WEEK_EXISTS");
    }
    const { userId } = req.params;
    validateMongooseId(userId);
    const { startingDate, habits } = req.body;
    const startDate = new Date(startingDate);
    const { endDate, datesArray } = createArrayOfDates(startDate);
    const { newWeek, newHabits, newCheckins } = await createWeek(
      userId,
      startDate,
      endDate,
      datesArray,
      habits
    );
    const response = new APIResponse(
      201,
      { newWeek, newHabits, newCheckins },
      "New week created successfully"
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const changeCheckInStatus = async (req, res, next) => {
  try {
    const { checkInId } = req.params;
    const user = req.user;
    validateMongooseId(checkInId);
    validateMongooseId(user.id);
    const updatedCheckIn = await changeCheckIn(checkInId, user.id);
    const response = new APIResponse(
      200,
      { updatedCheckIn },
      "You successfully checked-in for today"
    );
    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteWeek = async (req, res, next) => {
  try {
    const { weekId } = req.params;
    validateMongooseId(weekId);
    await deleteWeekDocuments(weekId);
    const response = new APIResponse(200, null, "Week deleted successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
