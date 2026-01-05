import User from "../models/user.models.js";
import { validateRegistrationData } from "../validators/registration.validators.js";
import { registerUser } from "../services/registration.services.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.utils.js";
import APIResponse from "../utils/APIResponse.utils.js";

export const createUserAccount = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    validateRegistrationData(username, email, password);
    const { user, accessToken, refreshToken } = await registerUser(username, email, password);
    console.log(user, accessToken, refreshToken);
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    const response = new APIResponse(200, { user, accessToken }, "You are registered successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteUserAccount = async (req, res, next) => {};
export const loginUser = async (req, res, next) => {};
export const LogoutUser = async (req, res, next) => {};
export const extendUserSession = async (req, res, next) => {};
