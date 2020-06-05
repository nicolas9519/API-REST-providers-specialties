import { Schema } from "mongoose";

export interface IProvider {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  specialty: Schema.Types.ObjectId;
  projectedStartDate: Date;
  employerId: number;
  providerType: string;
  staffStatus: string;
  assignedTo: number;
  status: string;
  stage: string;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
