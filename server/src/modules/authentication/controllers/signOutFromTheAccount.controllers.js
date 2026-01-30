import { signOut } from "../services/signOut.services.js";
import APIResponse from "../../../utils/APIResponse.utils.js";
import { validateMongooseId } from "../../../validators/mongooseId.validators.js";

export const signOutFromTheAccount = async (req, res, next) => {
  try {
    const { userId } = req.params;
    validateMongooseId(userId);
    await signOut(userId);
    res.clearCookie("refreshToken", {
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
