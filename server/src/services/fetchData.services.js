import Week from "../models/week.models.js";
import Habit from "../models/habit.models.js";
import CheckIn from "../models/checkin.models.js";

export const fetchData = async (userId) => {
  const weeks = await Week.find({ userId });
  const habits = await Habit.find({ userId });
  const checkins = await CheckIn.find({ userId });
  return { weeks, habits, checkins };
};
