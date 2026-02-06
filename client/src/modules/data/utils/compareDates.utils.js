export const comapreDates = (today, dueDate) => {
  const todayRef = new Date(today);
  const dueDateRef = new Date(dueDate);
  if (todayRef.getFullYear() !== dueDateRef.getFullYear()) {
    return false;
  } else if (todayRef.getMonth() !== dueDateRef.getMonth()) {
    return false;
  } else if (todayRef.getDate() !== dueDateRef.getDate()) {
    return false;
  } else {
    return true;
  }
};
