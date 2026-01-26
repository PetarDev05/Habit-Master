import User from "../models/user.models.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.utils.js";
import { hashing } from "../utils/hashing.utils.js";

export const registration = async (username, email, password) => {
  const hashedPassword = await hashing(password);
  const newUser = await User.registerUser(username, email, hashedPassword);
  const accessToken = generateAccessToken(newUser._id);
  const refreshToken = generateRefreshToken(newUser._id);
  const hashedRefreshToken = await hashing(refreshToken);
  await User.saveRefreshToken(newUser._id, hashedRefreshToken);
  return { newUser, accessToken, refreshToken };
};
