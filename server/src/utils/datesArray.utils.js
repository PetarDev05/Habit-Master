export const createArrayOfDates = (startDate) => {
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  let datesArray = [];

  for (let i = 0; i < 7; i++) {
    const dueDate = new Date(startDate);
    dueDate.setDate(startDate.getDate() + i);
    dueDate.setHours(23, 59, 59, 999);
    datesArray.push(dueDate);
  }

  return { endDate, datesArray };
};
