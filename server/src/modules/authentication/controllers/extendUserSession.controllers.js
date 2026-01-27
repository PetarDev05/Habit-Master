import APIResponse from "../../../utils/APIResponse.utils.js";
import { extendSession } from "../services/extendSession.services.js";

export const extendUserSession = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const { accessToken } = await extendSession(refreshToken);
    const response = new APIResponse(200, { accessToken }, "Session extended");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
