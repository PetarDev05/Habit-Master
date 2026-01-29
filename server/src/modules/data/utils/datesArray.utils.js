export const createArrayOfDates = (startDate) => {
  const endDayRef = new Date(startDate);
  endDayRef.setHours(23, 59, 59, 999);
  let dueDates = [];
  Array.from({ length: 7 }).map((_, i) => {
    const dueDate = new Date(startDate);
    dueDate.setDate(startDate.getDate() + i);
    dueDate.setHours(23, 59, 59, 999);
    dueDates.push(dueDate);
  });
  return dueDates;
};
