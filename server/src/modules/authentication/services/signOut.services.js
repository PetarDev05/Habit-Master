import User from "../models/user.models.js";

export const signOut = async (userId) => {
  if (!userId) {
    return;
  }

  await User.deleteRefreshToken(userId);
};
