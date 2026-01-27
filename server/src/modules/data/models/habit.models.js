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

export default model("Habit", habitSchema);
