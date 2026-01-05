import APIError from "../utils/APIError.utils.js";

export const validateLoginData = (username, password) => {
  if (!username || !password) {
    throw new APIError("All fields are required", 401, "INVALID_CREDENTIALS");
  }
};
