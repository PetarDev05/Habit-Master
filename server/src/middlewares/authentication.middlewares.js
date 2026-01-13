import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.utils.js";
import { authomaticCorrection } from "../services/authomaticCheckInUpdate.services.js";
import { updateWeekStatus } from "../services/weekStatus.services.js";

export const authentication = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new APIError("Access denied", 401, "AUTHORIZATION_ERROR");
    }

    const [bearer, accessToken] = authorization.split(" ");

    if (bearer !== "Bearer" || !accessToken) {
      throw new APIError("Access denied", 401, "AUTHORIZATION_ERROR");
    }

    const { userId } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    req.user = { id: userId };
    await authomaticCorrection(userId);
    await updateWeekStatus(userId);
    next();
  } catch (error) {
    next(error);
  }
};
