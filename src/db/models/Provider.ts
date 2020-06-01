import { Schema, Document, Model, model } from 'mongoose';

import { ProviderEnum } from '../../utils/enums';

interface IProvider extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  specialty: string;
  projectedStartDate: Date;
  employerId: number;
  providerType: string;
  staffStatus: string;
  assignedTo: number;
  status: string;
  createdBy: number;
  createdAt: Date;
  updatedBy?: number;
  updatedAt?: Date;
}

export interface ProviderModel extends Model<IProvider> { };

export class Provider {
  private _model: Model<IProvider>;

  constructor() {
    const schema = new Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String },
      email: { type: String, required: true, unique: true },
      specialty: { type: Schema.Types.ObjectId, ref: 'Specialty', required: true },
      projectedStartDate: { type: Date, required: true },
      providerType: { type: String, required: true },
      staffStatus: { type: String, required: true },
      status: { type: String, default: ProviderEnum.Status.AC },
      employerId: { type: Number },
      assignedTo: { type: Number },
      createdBy: { type: Number },
      createdAt: { type: Date, default: Date.now },
      updatedBy: { type: Number },
      updatedAt: { type: Date, default: Date.now },
      stage: { type: String },
      profilePhoto: { type: Buffer }
    });
    this._model = model<IProvider>('Provider', schema);
  }

  public model(): Model<IProvider> {
    return this._model;
  }

}
