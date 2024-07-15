import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Role } from "./models/role.model";

interface Options {
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
  synchronize: boolean;
  logging: boolean;
}

export class PostgresDatabase {
  static async connect(options: Options) {
    const { dbName, dbUser, dbPassword, dbHost, dbPort, synchronize, logging } =
      options;
    const AppDataSource = new DataSource({
      type: "postgres",
      host: dbHost,
      port: dbPort,
      username: dbUser,
      password: dbPassword,
      database: dbName,
      synchronize: synchronize,
      logging: logging,
      entities: [User,Role],
    });
    try {
      await AppDataSource.initialize();

      return true;
    } catch (error) {
      console.log('Postgres connection error');
      throw error;
    }
    
  }
}
