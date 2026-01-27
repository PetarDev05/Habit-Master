import { signOut } from "../services/signOut.services.js";
import APIResponse from "../../../utils/APIResponse.utils.js";

export const signOutFromTheAccount = async (req, res, next) => {
  try {
    const user = req.user;
    await signOut(user._id);
    await res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // production: true
      sameSite: "lax", // production: none
    });
    const response = new APIResponse(200, null, "You have signed out successfully.");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
