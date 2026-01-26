import APIResponse from "../../../utils/APIResponse.utils.js";
import { signIn } from "../services/signIn.services.js";
import { validateSignInData } from "../validators/signInData.validators.js";

export const signInToAccount = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    validateSignInData(username, password);
    const { existingUser, accessToken, refreshToken } = await signIn(username, password);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // production: true
      sameSite: "lax", // production: none
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    const response = new APIResponse(200, { existingUser, accessToken }, "You signed in successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};
