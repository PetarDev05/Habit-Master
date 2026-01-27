import APIResponse from "../../../utils/APIResponse.utils.js";
import { deleteUserAccount } from "../services/deleteAccount.services.js";

export const deleteAccount = async (req, res, next) => {
  try {
    const user = req.user;
    await deleteUserAccount(user._id);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // production: true
      sameSite: "lax", // production: none
    });
    const response = new APIResponse(200, null, "Account deleted successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
