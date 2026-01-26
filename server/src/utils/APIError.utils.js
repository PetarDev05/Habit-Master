class APIError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;
