const errorList: Map<number, string> = new Map(
  [
    [400, 'Bad request'],
    [404, 'Not found'],
    [500, 'Internal server error'],
  ]
);

enum StatusCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  BAD_IMPLEMENTATION = 500
};

export class ErrorStatus {
  public statusCode: StatusCodes;
  public name: string;
  public message: string;
  public payload: { [key: string]: any };
  public stack: string;
  public handledError: boolean = true;

  private constructor(statusCode: StatusCodes, message: string, payload?: { [key: string]: any }, stack?: string) {
    this.statusCode = statusCode;
    this.name = errorList.get(statusCode);
    this.message = message;
    this.payload = payload;
    this.stack = stack;
  }

  public static badRequest(message: string, payload?: { [key: string]: any }, stack?: string): ErrorStatus {
    const error: ErrorStatus = new ErrorStatus(StatusCodes.BAD_REQUEST, message, payload, stack);
    return error;
  }

  public static notFound(message: string, payload?: { [key: string]: any }, stack?: string): ErrorStatus {
    const error: ErrorStatus = new ErrorStatus(StatusCodes.NOT_FOUND, message, payload, stack);
    return error;
  }

  public static badImplementation(message: string, payload?: { [key: string]: any }, stack?: string): ErrorStatus {
    const error: ErrorStatus = new ErrorStatus(StatusCodes.BAD_IMPLEMENTATION, message, payload, stack);
    return error;
  }

}
