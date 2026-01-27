import mongoose from "mongoose";
import APIError from "../../../utils/APIError.utils.js";

export const validateMongooseId = (id) => {
  if (!id) {
    throw new APIError(400, "VALIDATION_ERROR", "No ID provided");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APIError(400, "VALIDATION_ERROR", "Invalid ID format");
  }
};
