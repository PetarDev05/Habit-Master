import CheckIn from "../models/checkIn.models.js";

export const authomaticCorrection = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  await CheckIn.updateMany(
    {
      userId,
      status: "pending",
      dueDate: { $lt: today },
    },
    {
      status: "missed",
    }
  );
};
