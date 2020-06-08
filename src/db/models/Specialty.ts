import { Schema, Document, Model, model } from 'mongoose';

interface ISpecialty extends Document {
  name: string;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}

export interface SpecialtyModel extends Model<ISpecialty> { };

export class Specialty {
  private _model: Model<ISpecialty>;

  constructor() {
    const schema = new Schema({
      name: { type: String, required: true, unique: true },
      createdBy: { type: Number },
      updatedBy: { type: Number },
    }, {
      timestamps: true,
      versionKey: false,
    });
    this._model = model<ISpecialty>('Specialty', schema);
  }

  public model(): Model<ISpecialty> {
    return this._model;
  }

}
