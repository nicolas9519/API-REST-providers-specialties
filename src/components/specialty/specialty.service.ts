import { QueryFindOptions, Schema } from 'mongoose';
import { SpecialtyModel } from '../../db/models/Specialty';
import { MongoDatabase } from '../../db/MongoDatabase';
import { ErrorStatus } from '../../utils/ErrorStatus';
import { IObject } from '../../utils/interfaces/IObject';
import { ISpecialty } from './interfaces/ISpecialty';

export class SpecialtyService {

  private specialtyModel: SpecialtyModel;

  constructor() {
    this.specialtyModel = MongoDatabase.Models.Specialty;
  }

  public async getAll(filters: IObject<any>, paging: QueryFindOptions, sort: IObject<number>): Promise<{ specialties: ISpecialty[], quantity: number }> {
    const specialties: ISpecialty[] = await this.specialtyModel.find(filters, null, paging).sort(sort);
    const quantity = await this.specialtyModel.countDocuments(filters);
    return { specialties, quantity };
  }

  public async getById(id: Schema.Types.ObjectId): Promise<ISpecialty> {
    const specialty: ISpecialty = await this.specialtyModel.findById(id);
    if (!specialty) {
      throw ErrorStatus.notFound('Specialty not found');
    }
    return specialty;
  }

  public async create(data: Partial<ISpecialty>): Promise<ISpecialty> {
    await this.validateNameSpecialty(data.name);
    const specialty = new this.specialtyModel(data);
    await specialty.save();
    return specialty.toJSON();
  }

  public async update(id: Schema.Types.ObjectId, data: Partial<ISpecialty>): Promise<ISpecialty> {
    await this.validateNameSpecialty(data.name, id);
    const specialty = await this.specialtyModel.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!specialty) {
      throw ErrorStatus.notFound('Specialty not found');
    }
    return specialty.toJSON();
  }

  public async delete(id: Schema.Types.ObjectId): Promise<ISpecialty> {
    const specialty = await this.specialtyModel.findOneAndDelete({ _id: id });
    if (!specialty) {
      throw ErrorStatus.notFound('Specialty not found');
    }
    return specialty.toJSON();
  }

  public async validateNameSpecialty(name: string, id?: Schema.Types.ObjectId): Promise<void> {
    const specialtyExist = await this.specialtyModel.findOne({ name });
    if (specialtyExist && specialtyExist.id !== id) {
      throw ErrorStatus.conflict('A specialty with this name already exist', { name });
    }
  }

}
