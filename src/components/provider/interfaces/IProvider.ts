import { Schema } from "mongoose";
import { ISpecialty } from "../../specialty/interfaces/ISpecialty";

export interface IProvider {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  specialty: ISpecialty | Schema.Types.ObjectId;
  projectedStartDate: Date;
  employerId: number;
  providerType: string;
  staffStatus: string;
  assignedTo: number;
  status: string;
  stage: string;
  profilePhoto: string;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
