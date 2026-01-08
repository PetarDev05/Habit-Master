import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const logout = async (refreshToken) => {
  if (refreshToken) {
    try {
      const { userId } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      await User.deleteRefreshToken(userId);
    } catch (error) {}
  }
};
