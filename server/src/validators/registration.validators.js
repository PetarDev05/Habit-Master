import validator from "validator";
import APIError from "../utils/APIError.utils.js";

export const validateRegistrationData = (username, email, password) => {
  if (!username || !email || !password) {
    throw new APIError("All fields are required", 401, "INVALID_CREDENTIALS");
  }

  if (username.length < 3) {
    throw new APIError("Username must be at least 3 characters long", 401, "INVALID_CREDENTIALS");
  }

  if (!validator.isEmail(email)) {
    throw new APIError("Email is not valid", 401, "INVALID_CREDENTIALS");
  }

  if (!validator.isStrongPassword(password)) {
    throw new APIError("Password is not strong enough", 401, "INVALID_CREDENTIALS");
  }
};
