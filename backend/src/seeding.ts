import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { Nft } from "./entity/Nft";
import NftSeeder from "./seeders/nft.seeder";
import NftFactory from "./factories/nft.factory";
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    database: DB_DATABASE || "postgres",
    entities: [Nft],
    host: DB_HOST || "localhost",
    port: parseInt(DB_PORT || "5432"),
    username: DB_USER || "",
    password: DB_PASSWORD || "",
    seeds: [NftSeeder],
    factories: [NftFactory],
    synchronize: true,
    logging: false,
    migrations: [__dirname + "/migration/*{.ts,.js}"],
    subscribers: [],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
