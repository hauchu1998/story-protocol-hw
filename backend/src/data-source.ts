import "reflect-metadata";
import { DataSource } from "typeorm";
import { Nft } from "./entity/Nft";

import * as dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST || "localhost",
  port: parseInt(DB_PORT || "5432"),
  username: DB_USER || "",
  password: DB_PASSWORD || "",
  database: DB_DATABASE || "postgres",
  synchronize: true,
  logging: false,
  entities: [Nft],
  migrations: [__dirname + "/migration/*{.ts,.js}"],
  subscribers: [],
});
