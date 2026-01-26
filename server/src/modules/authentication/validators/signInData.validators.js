import APIError from "../../../utils/APIError.utils.js";

export const validateSignInData = (username, password) => {
  if (!username || !password) {
    throw new APIError(401, "INVALID_CREDENTIALS", "All fields are required");
  }
};
