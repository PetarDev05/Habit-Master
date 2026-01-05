import User from "../models/user.models.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.utils.js";
import { compareHashes } from "../utils/comparePasswords.utils.js";
import { hashing } from "../utils/hashing.utils.js";
import APIError from "../utils/APIError.utils.js";

export const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new APIError("User not found. Check login credentials", 404, "USER_NOT_FOUND");
  }

  const match = await compareHashes(password, user.password);
  if (!match) {
    throw new APIError("Password is incorrect", 401, "INVALID_CREDENTIALS");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const refreshTokenHash = await hashing(refreshToken);
  await User.saveRefreshToken(user._id, refreshTokenHash);
  return { user, accessToken, refreshToken };
};
