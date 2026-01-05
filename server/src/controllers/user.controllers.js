import User from "../models/user.models.js";
import { validateRegistrationData } from "../validators/registration.validators.js";
import { validateLoginData } from "../validators/login.validators.js";
import { registerUser } from "../services/registration.services.js";
import { loginUser } from "../services/login.services.js";
import APIResponse from "../utils/APIResponse.utils.js";

export const createUserAccount = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    validateRegistrationData(username, email, password);
    const { user, accessToken, refreshToken } = await registerUser(username, email, password);
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

export const deleteUserAccount = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const signinUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    validateLoginData(username, password);
    const { user, accessToken, refreshToken } = await loginUser(username, password);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    const response = new APIResponse(200, { user, accessToken }, "You are logged in successfully");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const LogoutUser = async (req, res, next) => {

};

export const extendUserSession = async (req, res, next) => {};
