import mongoose from "mongoose";
import Week from "../models/week.models.js";
import Habit from "../models/habit.models.js";
import CheckIn from "../models/checkin.models.js";
import { createHabitsForInserting } from "../utils/habitsForInserting.utils.js";

export const createWeek = async (userId, startDate, endDate, datesArray, habits) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newWeek = await Week.create({ userId, startDate, endDate }, { session });
    const habitsForInserting = createHabitsForInserting(userId, habits, newWeek);
    const newHabits = await Habit.insertMany(habitsForInserting, { session });

    let checkinsForInserting = [];
    habits.forEach((habit, i) => {
      const checkins = datesArray.map((date, index) => ({
        userId,
        weekId: newWeek._id,
        habitId: newHabits[i]._id,
        dueDate: date,
        status: habit.skippedDays.includes(index) ? "skipped" : "pending",
      }));
      checkinsForInserting = [...checkinsForInserting, ...checkins];
    });

    const newCheckins = await CheckIn.insertMany(checkinsForInserting, { session });

    await session.commitTransaction();
    return { newWeek, newHabits, newCheckins };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
