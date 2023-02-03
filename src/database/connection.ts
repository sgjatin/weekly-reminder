import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_LOGGING,
} from "../config/secret";
import path from "path";
import { Product } from "./model/product.model";

export class DBConnection {
  public static conn: Connection;

  public static async databaseConnection(): Promise<void> {
    const dbConfig: ConnectionOptions = {
      type: "postgres",
      host: TYPEORM_HOST,
      port: Number(TYPEORM_PORT),
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      // entities: [path.join(`${__dirname}/model/*.{js,ts}`)],
      // entities: [path.join(__dirname, "/../**/*.model.{.js,.ts}")],
      entities: [Product],
      // entities: [path.resolve(`${__dirname}/model/*.{js,ts}`)],
      migrations: [`${__dirname}/migration/*`],
      synchronize: true,
      logging: Boolean(TYPEORM_LOGGING), // true => make it to true to log the sql queries
      namingStrategy: new SnakeNamingStrategy(),
    };

    return createConnection(dbConfig)
      .then((connection) => {
        this.conn = connection;
        // console.log("Connected to DB");
      })
      .catch((error) => {
        // console.log("Not Connected to DB");
        console.log(error);
      });
  }

  public static closeConnection(): Promise<void> {
    return this.conn.close();
  }
}
