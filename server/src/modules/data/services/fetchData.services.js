import Week from "../models/week.models.js";
import Habit from "../models/habit.models.js";
import CheckIn from "../models/checkIn.models.js";

export const getTheData = async (userId) => {
  const weeks = await Week.fetchWeeks(userId);
  const habits = await Habit.fetchHabits(userId);
  const checkIns = await CheckIn.fetchCheckIns(userId);
  return { weeks, habits, checkIns };
};
