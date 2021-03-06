import { QueryFindOptions, Schema } from "mongoose";
import { MongoDatabase } from "../../db/MongoDatabase";
import { ErrorStatus } from "../../utils/ErrorStatus";
import { IObject } from "../../utils/interfaces/IObject";
import { SpecialtyService } from "../specialty/specialty.service";
import { IProvider } from "./interfaces/IProvider";

export class ProviderService {

  private specialtyService: SpecialtyService;

  constructor() {
    this.specialtyService = new SpecialtyService();
  }

  public async getAll(filters: IObject<any>, paging: QueryFindOptions, sort: IObject<number>): Promise<{ providers: IProvider[], quantity: number }> {
    const providers: IProvider[] = await MongoDatabase.Models.Provider.find(filters, null, paging).sort(sort);
    const quantity = await MongoDatabase.Models.Provider.countDocuments(filters);
    return { providers, quantity };
  }

  public async getById(id: Schema.Types.ObjectId): Promise<IProvider> {
    const provider = await MongoDatabase.Models.Provider.findById(id);
    if (!provider) {
      throw ErrorStatus.notFound('Provider not found');
    }
    return provider.toJSON();
  }

  public async create(data: Partial<IProvider>, nameFile: string): Promise<IProvider> {
    const newProvider = await this.validateDataAndBuild(data);
    newProvider.profilePhoto = `/files/profile/${nameFile}`;
    const provider = new MongoDatabase.Models.Provider(newProvider);
    await provider.save();
    return provider.toJSON();
  }

  public async update(id: Schema.Types.ObjectId, data: Partial<IProvider>, nameFile: string): Promise<IProvider> {
    const updatedProvider = await this.validateDataAndBuild(data, id);
    updatedProvider.profilePhoto = `/files/profile/${nameFile}`;
    const provider = await MongoDatabase.Models.Provider.findOneAndUpdate({ _id: id }, updatedProvider, { new: true });
    if (!provider) {
      throw ErrorStatus.notFound('Provider not found');
    }
    return provider.toJSON()
  }

  public async delete(id: Schema.Types.ObjectId): Promise<IProvider> {
    const provider = await MongoDatabase.Models.Provider.findOneAndDelete({ _id: id });
    if (!provider) {
      throw ErrorStatus.notFound('Provider not found');
    }
    return provider.toJSON();
  }

  private async validateDataAndBuild(data: Partial<IProvider>, id?: Schema.Types.ObjectId): Promise<any> {
    await this.validateEmailProvider(data.email, id);
    const idSpecialty: any = data.specialty;
    const specialty = await this.specialtyService.getById(idSpecialty);
    const provider = {
      ...data,
      specialty,
      stage: data.projectedStartDate < new Date() ? 'DONE' : 'PENDING'
    };
    return provider;
  }

  private async validateEmailProvider(email: string, id?: Schema.Types.ObjectId): Promise<void> {
    const providerExist = await MongoDatabase.Models.Provider.findOne({ email });
    if (providerExist && providerExist.id !== id) {
      throw ErrorStatus.conflict('A provider with this email already exist', { email });
    }
  }

}