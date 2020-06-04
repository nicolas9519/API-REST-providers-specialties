import { ObjectSchema } from "@hapi/joi";
import { ErrorStatus } from "../ErrorStatus";

export default function validateJoi<T>(schema: ObjectSchema, data: T) {
  const { error, value } = schema.validate(data);
  if (error) {
    const newError = ErrorStatus.badRequest(error.message);
    throw newError;
  }
  return value;
}
