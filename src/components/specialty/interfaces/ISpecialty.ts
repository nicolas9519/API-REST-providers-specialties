import { Schema } from "mongoose";

export interface ISpecialty {
  _id: Schema.Types.ObjectId,
  name: string;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
