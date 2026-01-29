export const parseHabits = (userId, weekId, habits) => {
  const habitsForInsert = habits.map((habit) => ({ userId, weekId, title: habit.title }));
  return habitsForInsert;
};
