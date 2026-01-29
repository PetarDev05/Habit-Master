export const parseDate = (dateString) => {
  const [y, m, d] = dateString.split("-").map(Number);
  const startDate = new Date(y, m - 1, d, 0, 0, 0, 0);
  const todayRef = new Date();
  todayRef.setHours(0, 0, 0, 0);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);
  return { startDate, endDate, todayRef };
};
