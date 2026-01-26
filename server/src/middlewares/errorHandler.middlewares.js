import APIError from "../utils/APIError.utils.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (error.name === "TokenExpiredError") {
    error = new APIError(401, "TOKEN_EXPIRED", "Session expired");
  }

  if (error.name === "JsonWebTokenError") {
    error = new APIError(401, "TOKEN_MALFORMED", "Session expired");
  }

  if (!(error instanceof APIError)) {
    error = new APIError(500, "INTERNAL_ERROR", "Internal server error");
  }

  const response = {
    success: error.success,
    statusCode: error.statusCode,
    code: error.code,
    message: error.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};
