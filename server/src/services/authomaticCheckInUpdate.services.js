import CheckIn from "../models/checkin.models.js";

export const authomaticCorrection = async (userId) => {
  const today = new Date();
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
