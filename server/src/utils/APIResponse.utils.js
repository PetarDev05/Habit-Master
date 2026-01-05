class APIResponse {
  constructor(statusCode, data = null, message = null) {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export default APIResponse;
