export const createArrayOfDates = (startDate) => {
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);
  endDate.setMilliseconds(999);

  let datesArray = [];

  for (let i = 0; i < 7; i++) {
    const dueDate = new Date(startDate);
    dueDate.setDate(startDate.getDate() + i);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(999);
    datesArray.push(dueDate);
  }

  return { endDate, datesArray };
};
