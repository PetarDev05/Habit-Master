import CheckIn from "../models/checkIn.models.js";
import Week from "../models/week.models.js";

export const updateWeekStatus = async (userId) => {
  const activeWeek = await Week.findActiveWeek(userId);
  if (!activeWeek) {
    return;
  }
  const pendingCheckins = await CheckIn.findPendingCheckIns(userId, activeWeek._id);
  if (!pendingCheckins || !pendingCheckins.length) {
    const updatedWeek = await Week.updateStatus(userId, activeWeek._id);
    return updatedWeek._id;
  }

  return null;
};
