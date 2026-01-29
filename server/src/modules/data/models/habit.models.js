import { Schema, model } from "mongoose";

const habitSchema = new Schema(
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

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

habitSchema.statics.fetchHabits = async function (userId) {
  const habits = await this.find({ userId });
  return habits;
};

habitSchema.statics.createNewHabits = async function (habitsForInsert) {
  const newHabits = await this.insertMany(habitsForInsert);
  return newHabits;
};

export default model("Habit", habitSchema);
