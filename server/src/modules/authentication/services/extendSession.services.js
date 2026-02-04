import User from "../models/user.models.js";
import { generateAccessToken } from "../utils/generateTokens.utils.js";
import { compareHashes } from "../utils/compareHashes.utils.js";
import { validateRefreshToken } from "../validators/refreshToken.validators.js";

export const extendSession = async (refreshToken) => {
  const userId = validateRefreshToken(refreshToken);
  const user = await User.findUserById(userId);
  await compareHashes(refreshToken, user.refreshToken);
  const accessToken = generateAccessToken(userId);
  return { user, accessToken };
};
