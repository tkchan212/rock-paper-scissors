const { errorObj } = require('../errors/ErrorCode');

export interface HttpException extends Error {
  statusCode: number;
}

export class HttpException extends Error implements HttpException {
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "HttpException";
    this.statusCode = statusCode;
  }
}


export const makeStdErr = (errorCode: string ) => {
  const e = errorObj[errorCode];
  if (e.message) return (new HttpException(e.status, e.message))
  return new HttpException(400, e.toString());
}