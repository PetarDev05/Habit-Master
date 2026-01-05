import APIError from "../utils/APIError.utils.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof APIError)) {
    error = new APIError("Internal server error", 500, "INTERNAL_ERROR", null, false);
  }

  const response = {
    success: false,
    message: error.message,
    statusCode: error.statusCode,
    code: error.code,
  };

  if (error.details) {
    response.details = error.details;
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};

export default errorHandler;
