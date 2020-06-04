import { ErrorStatus } from '../../utils/ErrorStatus';
import { MongoDatabase } from '../../db/MongoDatabase';
import { ISpecialty } from './interfaces/ISpecialty'

export class SpecialtyService {

  public async getAll(query: any): Promise<ISpecialty[]> {
    const paging = {
      skip: query.offSet || 0,
      limit: query.limit || 10,
    };
    const filters: { [key: string]: any } = {};
    if (query.name) filters.name = { $regex: `${query.name}` };
    if (query.createdBy) filters.createdBy = query.createdBy;
    if (query.updatedBy) filters.updatedBy = query.updatedBy;
    const specialties: ISpecialty[] = await MongoDatabase.Models.Specialty.find(filters, null, paging);
    return specialties;
  }

  public async getById(id: string): Promise<ISpecialty> {
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

  public async update(id: string, data: Partial<ISpecialty>): Promise<ISpecialty> {
    const specialty = await MongoDatabase.Models.Specialty.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!specialty) {
      throw ErrorStatus.notFound('Specialty not found');
    }
    return specialty.toJSON();
  }

  public async delete(id: string): Promise<ISpecialty> {
    const specialty = await MongoDatabase.Models.Specialty.findOneAndDelete({_id: id});
    if (!specialty) {
      throw ErrorStatus.notFound('Specialty not found');
    }
    await specialty.remove();
    return specialty.toJSON();
  }

}
