import { AppDataSource } from "./data-source";
import { Nft } from "./entity/Nft";

import app from "./app";
import "reflect-metadata";

import * as dotenv from "dotenv";
dotenv.config();

const { SERVER_PORT } = process.env;

AppDataSource.initialize()
  .then(async () => {
    app.listen(SERVER_PORT, () => {
      console.log(`server is running on port ${SERVER_PORT}`);
    });
    console.log(`database connected on port 5432`);
  })
  .catch((error) => console.log(error));
