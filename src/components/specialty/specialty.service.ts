import { QueryFindOptions, Schema } from 'mongoose';
import { MongoDatabase } from '../../db/MongoDatabase';
import { ErrorStatus } from '../../utils/ErrorStatus';
import { IObject } from '../../utils/interfaces/IObject';
import { ISpecialty } from './interfaces/ISpecialty';

export class SpecialtyService {

  public async getAll(filters: IObject, paging: QueryFindOptions): Promise<{ specialties: ISpecialty[], quantity: number }> {
    const specialties: ISpecialty[] = await MongoDatabase.Models.Specialty.find(filters, null, paging);
    const quantity = await MongoDatabase.Models.Specialty.count(filters);
    return { specialties, quantity };
  }

  public async getById(id: Schema.Types.ObjectId): Promise<ISpecialty> {
    const specialty: ISpecialty = await MongoDatabase.Models.Specialty.findById(id);
    if (!specialty) {
      throw ErrorStatus.notFound('Specialty not found');
    }
    return specialty;
  }

  public async create(data: Partial<ISpecialty>): Promise<ISpecialty> {
    const specialtyExist = await MongoDatabase.Models.Specialty.findOne({ name: data.name });
    if (specialtyExist) {
      throw ErrorStatus.conflict('A specialty with this name already exist', { name: data.name });
    }
    const specialty = new MongoDatabase.Models.Specialty(data);
    await specialty.save();
    return specialty.toJSON();
  }

  public async update(id: Schema.Types.ObjectId, data: Partial<ISpecialty>): Promise<ISpecialty> {
    // TODO: validate in case of the name previously exists
    const specialty = await MongoDatabase.Models.Specialty.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!specialty) {
      throw ErrorStatus.notFound('Specialty not found');
    }
    return specialty.toJSON();
  }

  public async delete(id: Schema.Types.ObjectId): Promise<ISpecialty> {
    const specialty = await MongoDatabase.Models.Specialty.findOneAndDelete({ _id: id });
    if (!specialty) {
      throw ErrorStatus.notFound('Specialty not found');
    }
    await specialty.remove();
    return specialty.toJSON();
  }

}
