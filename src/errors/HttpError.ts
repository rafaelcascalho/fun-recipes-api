class HttpError extends Error {
  private statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  status = () => {
    return this.statusCode;
  };
}

export default HttpError;
