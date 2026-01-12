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

const Week = model("Week", weekSchema);
export default Week;
