import Week from "../models/week.models.js";
import Habit from "../models/habit.models.js";
import CheckIn from "../models/checkin.models.js";

export const deleteWeekDocuments = async (weekId) => {
  await Week.deleteMany({ weekId });
  await Habit.deleteMany({ weekId });
  await CheckIn.deleteMany({ weekId });
};
