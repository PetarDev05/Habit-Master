export const parseCheckIns = (userId, newWeek, newHabits, habits, dueDates) => {

  let checkInsForInsert = [];
  habits.forEach((habit, i) => {
    const checkIns = dueDates.map((date, index) => ({
      userId,
      weekId: newWeek._id,
      habitId: newHabits[i]._id,
      dueDate: date,
      status: habit.skippedDays.includes(index) ? "skipped" : "pending",
    }));
    checkInsForInsert = [...checkInsForInsert, ...checkIns];
  });
  return checkInsForInsert;
};
