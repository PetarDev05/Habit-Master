import User from "../models/user.models.js";

export const deleteUserAccount = async (userId) => {
  User.deleteUserAccount(userId);
};
