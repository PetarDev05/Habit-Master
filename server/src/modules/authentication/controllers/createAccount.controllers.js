import ms from "ms";
import { registration } from "../services/registration.services.js";
import { validateRegistrationData } from "../validators/registrationData.validators.js";
import APIResponse from "../../../utils/APIResponse.utils.js";

export const createAccount = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    validateRegistrationData(username, email, password);
    const { newUser, accessToken, refreshToken } = await registration(username, email, password);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // production: true
      sameSite: "lax", // production: none
      maxAge: ms(process.env.JWT_REFRESH_EXPIRES_IN),
    });
    const response = new APIResponse(
      200,
      { newUser, accessToken },
      "You are registered successfully"
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
