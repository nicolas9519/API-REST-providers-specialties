import { ObjectSchema } from "@hapi/joi";
import { ErrorStatus, StatusCodes } from "../ErrorStatus";

export default function validateJoi<T>(schema: ObjectSchema, data: T) {
  const { error, value } = schema.validate(data);
  if (error) {
    const newError = new ErrorStatus(StatusCodes.BAD_REQUEST, error.name, error.message);
    throw newError;
  }
  return value;
}
