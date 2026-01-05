import User from "../models/user.models.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.utils.js";
import { hashing } from "../utils/hashing.utils.js";
import APIError from "../utils/APIError.utils.js";

export const registerUser = async (username, email, password) => {
  const userByName = await User.findOne({ username });
  if (userByName) {
    throw new APIError("User already exists with same username", 409, "USER_ALREADY_EXISTS");
  }

  const userByEmail = await User.findOne({ email });
  if (userByEmail) {
    throw new APIError("User already exists with same email", 409, "USER_ALREADY_EXISTS");
  }

  const hash = await hashing(password);
  const user = await User.saveUser(username, email, hash);
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const refreshTokenHash = await hashing(refreshToken);
  await User.saveRefreshToken(user._id, refreshTokenHash);
  return { user, accessToken, refreshToken };
};
