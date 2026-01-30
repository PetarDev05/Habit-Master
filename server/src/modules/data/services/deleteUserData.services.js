import Week from "../models/week.models.js";
import Habit from "../models/habit.models.js";
import CheckIn from "../models/checkIn.models.js";

export const deleteUserData = async (userId) => {
  await Week.deleteAllUserWeeks(userId);
  await Habit.deleteAllUserHabits(userId);
  await CheckIn.deleteAllUserCheckIns(userId);
};
