export const createHabitsForInserting = (userId, habits, newWeek) => {
  const habitsForInserting = habits.map((habit) => ({
    userId,
    weekId: newWeek._id,
    title: habit.title,
  }));

  return habitsForInserting;
};
