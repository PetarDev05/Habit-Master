import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import APIError from "../utils/APIError.utils.js";
import { generateAccessToken } from "../utils/generateTokens.utils.js";
import { compareHashes } from "../utils/compareHashes.utils.js";

export const extendSession = async (refreshToken) => {
  if (!refreshToken) {
    throw new APIError("Unable to extend session", 401, "TOKEN_MISSING");
  }

  const { userId } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new APIError("Unable to extend session", 401, "REFRESH_TOKEN_INVALID");
  }

  if (!compareHashes(refreshToken, user.refreshToken)) {
    throw new APIError("Unable to extend session", 401, "REFRESH_TOKEN_INVALID");
  }

  const accessToken = generateAccessToken(userId);
  return accessToken;
};
