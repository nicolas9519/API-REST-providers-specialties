import { QueryFindOptions } from "mongoose";
import { MongoDatabase } from "../../db/MongoDatabase";
import { IObject } from "../../utils/interfaces/IObject";
import { IProvider } from "./interfaces/IProvider";

export class ProviderService {

  public async getAll(filters: IObject, paging: QueryFindOptions): Promise<IProvider[]> {
    const providers: IProvider[] = await MongoDatabase.Models.Provider.find(filters, null, paging).populate('specialty');
    return providers;
  }

}