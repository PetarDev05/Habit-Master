import User from "../models/user.models.js";
import { compareHashes } from "../utils/compareHashes.utils.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.utils.js";
import { hashing } from "../utils/hashing.utils.js";

export const signIn = async (username, password) => {
  const existingUser = await User.signInUser(username);
  await compareHashes(password, existingUser.password);
  const accessToken = generateAccessToken(existingUser._id);
  const refreshToken = generateRefreshToken(existingUser._id);
  const hashedRefreshToken = await hashing(refreshToken);
  await User.saveRefreshToken(existingUser._id, hashedRefreshToken);
  return { existingUser, accessToken, refreshToken };
};
