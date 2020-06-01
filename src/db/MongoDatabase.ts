import { Connection, connection, connect } from 'mongoose';

import { database } from '../config/config';
import { Specialty, SpecialtyModel } from './models/Specialty';
import { Provider, ProviderModel } from './models/Provider';

interface IModels {
  Specialty: SpecialtyModel;
  Provider: ProviderModel;
}

export class MongoDatabase {

  private static instance: MongoDatabase;

  private connection: Connection;
  private models: IModels;

  constructor () {
    connect(database.mongo_db_url, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    this.connection = connection;
    this.connection.once('open', this.connected);
    this.connection.on('error', this.errorConnect);
    this.models = {
      Specialty: new Specialty().model(),
      Provider: new Provider().model(),
    }
  }

  public static get Models(): IModels {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance.models;
  }

  private connected() {
    console.log('Connected successfully');
  }

  private errorConnect(error: Error ) {
    throw error;
  }

}
