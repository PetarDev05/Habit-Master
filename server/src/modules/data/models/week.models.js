import { Schema, model } from "mongoose";

const weekSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    success: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

weekSchema.statics.fetchWeeks = async function (userId) {
  const weeks = await this.find({ userId });
  return weeks;
};

weekSchema.statics.createNewWeek = async function (userId, startDate, endDate) {
  const newWeek = await this.create({ userId, startDate, endDate });
  return newWeek;
};

weekSchema.statics.findActiveWeek = async function (userId) {
  const activeWeek = await this.findOne({ userId, status: "active" });
  return activeWeek;
};

weekSchema.statics.deleteWeek = async function (userId, weekId) {
  await this.findOneAndDelete({ userId, _id: weekId, status: "active" });
};

weekSchema.statics.updateStatus = async function (userId, weekId) {
  await this.findOneAndUpdate({ userId, _id: weekId, status: "active" }, { status: "completed" });
};

export default model("Week", weekSchema);
