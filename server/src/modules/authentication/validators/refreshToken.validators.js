import jwt from "jsonwebtoken";
import APIError from "../../../utils/APIError.utils.js";

export const validateRefreshToken = (refreshToken) => {
  if (!refreshToken) {
    throw new APIError(401, "TOKEN_MISSING", "Unable to extend session");
  }

  const { userId } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  return userId;
};
