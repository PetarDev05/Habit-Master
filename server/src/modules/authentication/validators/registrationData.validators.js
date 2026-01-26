import validator from "validator";
import APIError from "../../../utils/APIError.utils.js";

export const validateRegistrationData = (username, email, password) => {
  if (!username || !email || !password) {
    throw new APIError(400, "INVALID_CREDENTIALS", "All fields are required");
  }

  if (username.length < 3) {
    throw new APIError(400, "INVALID_CREDENTIALS", "Username must be at least 3 characters long");
  }

  if (!validator.isEmail(email)) {
    throw new APIError(400, "INVALID_CREDENTIALS", "Invalid email format");
  }

  if (!validator.isStrongPassword(password)) {
    throw new APIError(400, "INVALID_CREDENTIALS", "Password is not strong enough");
  }
};
