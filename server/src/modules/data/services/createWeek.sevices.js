import Week from "../models/week.models.js";
import Habit from "../models/habit.models.js";
import CheckIn from "../models/checkIn.models.js";
import { parseDate } from "../utils/parseDateString.utils.js";
import { parseHabits } from "../utils/parseHabits.utils.js";
import { validateNewData } from "../validators/validateNewData.validators.js";
import { parseCheckIns } from "../utils/parseCheckIns.utils.js";
import { createArrayOfDates } from "../utils/datesArray.utils.js";

export const createWeek = async (userId, habits, userDateString) => {
  try {
    const { startDate, endDate, todayRef } = parseDate(userDateString);
    const activeWeek = await Week.findActiveWeek(userId);
    validateNewData(activeWeek, startDate, todayRef, habits);
    const newWeek = await Week.createNewWeek(userId, startDate, endDate);
    const habitsForInsert = parseHabits(userId, newWeek._id, habits);
    const newHabits = await Habit.createNewHabits(habitsForInsert);
    const dueDates = createArrayOfDates(startDate);
    const checkInsForInsert = parseCheckIns(userId, newWeek, newHabits, habits, dueDates);
    const newCheckIns = await CheckIn.createNewCheckIns(checkInsForInsert);
    return { newWeek, newHabits, newCheckIns };
  } catch (error) {
    throw error;
  }
};
