import { Schema, model } from "mongoose";

const checkInSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    weekId: {
      type: Schema.Types.ObjectId,
      ref: "Week",
      required: true,
      index: true,
    },

    habitId: {
      type: Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
      index: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "done", "missed", "skipped"],
      required: true,
    },
  },
  { timestamps: true }
);

checkInSchema.statics.fetchCheckIns = async function (userId) {
  const checkIns = await this.find({ userId });
  return checkIns;
};

export default model("CheckIn", checkInSchema);
