import { isValidObjectId, Schema } from "mongoose";
import { ErrorStatus } from "../ErrorStatus";

export default function validateMongoId(id: any): Schema.Types.ObjectId {
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw ErrorStatus.badRequest('The id sent is invalid');
  }
  const idFormat: Schema.Types.ObjectId = id;
  return idFormat;
}
