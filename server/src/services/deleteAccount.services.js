import CheckIn from "../models/checkin.models.js";
import Habit from "../models/habit.models.js";
import User from "../models/user.models.js";
import Week from "../models/week.models.js";

export const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
  await Week.deleteMany({ userId });
  await Habit.deleteMany({ userId });
  await CheckIn.deleteMany({ userId });
};
