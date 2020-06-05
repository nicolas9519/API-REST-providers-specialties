import { QueryFindOptions, Schema } from "mongoose";
import { MongoDatabase } from "../../db/MongoDatabase";
import { ErrorStatus } from "../../utils/ErrorStatus";
import { IObject } from "../../utils/interfaces/IObject";
import { ISpecialty } from "../specialty/interfaces/ISpecialty";
import { IProvider } from "./interfaces/IProvider";

export class ProviderService {

  public async getAll(filters: IObject, paging: QueryFindOptions): Promise<{ providers: IProvider[], quantity: number }> {
    const providers: IProvider[] = await MongoDatabase.Models.Provider.find(filters, null, paging);
    const quantity = await MongoDatabase.Models.Provider.count(filters);
    return { providers, quantity };
  }

  public async getById(id: Schema.Types.ObjectId): Promise<IProvider> {
    const provider = await MongoDatabase.Models.Provider.findById(id);
    if (!provider) {
      throw ErrorStatus.notFound('Provider not found');
    }
    return provider.toJSON();
  }

  public async create(data: Partial<IProvider>): Promise<IProvider> {
    const specialty = await this.validateProvider(data);
    const newProvider: Partial<IProvider> = {
      ...data,
      specialty,
      stage: data.projectedStartDate < new Date() ? 'DONE' : 'PENDING'
    };
    const provider = new MongoDatabase.Models.Provider(newProvider);
    await provider.save();
    return provider.toJSON();
  }

  private async validateProvider(data: Partial<IProvider>): Promise<ISpecialty> {
    const providerExist = await MongoDatabase.Models.Provider.findOne({ email: data.email });
    if (providerExist && providerExist._id !== data._id) {
      throw ErrorStatus.conflict('A provider with this email already exist', { email: data.email });
    }
    const specialty = await MongoDatabase.Models.Specialty.findById(data.specialty);
    if (!specialty) {
      throw ErrorStatus.notFound('The specialty doesn\'t exist');
    }
    return specialty.toJSON();
  }

}