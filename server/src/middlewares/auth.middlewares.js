import jwt from "jsonwebtoken";
import { APIError } from "../utils/APIError.js";

export const authentication = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new APIError(401, "AUTHORIZATION_ERROR", "Access denied");
    }

    const [bearer, accessToken] = authorization.split(" ");

    if (bearer !== "Bearer" || !accessToken) {
      throw new APIError(401, "AUTHORIZATION_ERROR", "Access denied");
    }

    const { userId } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    req.user = { id: userId };
    next();
  } catch (error) {
    next(error);
  }
};
