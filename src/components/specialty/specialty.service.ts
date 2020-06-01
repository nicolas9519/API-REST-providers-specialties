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
}
