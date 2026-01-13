import Week from "../models/week.models.js";
import CheckIn from "../models/checkin.models.js";

export const updateWeekStatus = async (userId) => {
  const activeWeek = await Week.findOne({ userId, status: "active" });
  if (!activeWeek) {
    return;
  }
  const pendingCheckins = await CheckIn.find({ userId, weekId: activeWeek._id, status: "pending" });

  if (!pendingCheckins || !pendingCheckins.length) {
    await Week.updateOne(
      { _id: activeWeek._id, status: "active", userId },
      { status: "completed" }
    );
  }
};
