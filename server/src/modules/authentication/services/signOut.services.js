import User from "../models/user.models.js";

export const signOut = async (userId) => {
  await User.deleteRefreshToken(userId);
};
