import { isValidObjectId } from "mongoose";
import { ErrorStatus } from "../ErrorStatus";

export default function validateMongoId(id: string): void {
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw ErrorStatus.badRequest('The id sent is invalid');
  }
}
