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

checkInSchema.statics.createNewCheckIns = async function (checkInsForInsert) {
  const newCheckIns = await this.insertMany(checkInsForInsert);
  return newCheckIns;
};

checkInSchema.statics.deleteCheckIns = async function (userId, weekId) {
  await this.deleteMany({ userId, weekId });
};

export default model("CheckIn", checkInSchema);
