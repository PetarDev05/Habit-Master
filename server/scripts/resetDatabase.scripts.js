import { connectDatabase, disconnectDatabase } from "./utils/db.utils.js";
import User from "../src/models/user.models.js";
import Week from "../src/models/week.models.js";
import Habit from "../src/models/habit.models.js";
import Checkin from "../src/models/checkin.models.js";

const resetDB = async () => {
  await connectDatabase();
  await User.deleteMany({});
  await Week.deleteMany({});
  await Habit.deleteMany({});
  await Checkin.deleteMany({});
  await disconnectDatabase();
};

resetDB();
