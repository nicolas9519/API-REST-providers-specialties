export enum ErrorList {
  BAD_REQUEST = 'Bad request',
  NOT_FOUND = 'Not Found',
  BAD_IMPLEMENTATION = 'Internal server error'
};

export enum StatusCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  BAD_IMPLEMENTATION = 500
}

export class ErrorStatus {
  public statusCode: StatusCodes;
  public name: string;
  public message: string;
  public payload: { [key: string]: any };
  public stack: string;

  constructor(statusCode: StatusCodes, name: string, message: string, payload?: { [key: string]: any }, stack?: string) {
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.payload = payload;
    this.stack = stack;
  }
}

export class BadRequest extends ErrorStatus {
  constructor(message: string, payload?: { [key: string]: any }, stack?: string) {
    super(StatusCodes.BAD_REQUEST, ErrorList.BAD_REQUEST, message, payload, stack);
  }
}

export class NotFound extends ErrorStatus {
  constructor(message: string, payload?: { [key: string]: any }, stack?: string) {
    super(StatusCodes.NOT_FOUND, ErrorList.NOT_FOUND, message, payload, stack);
  }
}
