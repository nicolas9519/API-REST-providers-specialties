import { Schema, Document, Model, model } from 'mongoose';

import { ProviderEnum } from '../../utils/enums';
import { PROVIDER_TYPES, PROVIDER_STAFF_STATUS, PROVIDER_STATUS } from '../../utils/constants';
import { ISpecialty } from '../../components/specialty/interfaces/ISpecialty';

interface IProvider extends Document {
  firstName: string;
  lastName: string;
  email: string;
  specialty: ISpecialty;
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

export interface ProviderModel extends Model<IProvider> { };

export class Provider {
  private _model: Model<IProvider>;

  constructor() {
    const schema = new Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      specialty: {
        type: Object,
        required: true
      },
      projectedStartDate: { type: Date, required: true },
      providerType: {
        type: String,
        required: true,
        enum: PROVIDER_TYPES
      },
      staffStatus: {
        type: String,
        required: true,
        enum: PROVIDER_STAFF_STATUS
      },
      status: {
        type: String,
        enum: PROVIDER_STATUS,
        default: ProviderEnum.Status.AC
      },
      employerId: { type: Number },
      assignedTo: { type: Number },
      createdBy: { type: Number },
      updatedBy: { type: Number },
      stage: { type: String },
      profilePhoto: { type: Buffer }
    }, {
      timestamps: true,
      versionKey: false,
    });
    this._model = model<IProvider>('Provider', schema);
  }

  public model(): Model<IProvider> {
    return this._model;
  }

}
