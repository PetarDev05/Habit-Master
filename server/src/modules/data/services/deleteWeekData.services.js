import CheckIn from "../models/checkIn.models.js";
import Habit from "../models/habit.models.js";
import Week from "../models/week.models.js";

export const deleteWeekData = async (userId, weekId) => {
  await CheckIn.deleteCheckIns(userId, weekId);
  await Habit.deleteHabits(userId, weekId);
  await Week.deleteWeek(userId, weekId);
};
