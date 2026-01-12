import mongoose from "mongoose";
import APIError from "../utils/APIError.utils.js";

export const validateMongooseId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APIError("Invalid ID format", 400, "VALIDATION_ERROR");
  }
};
