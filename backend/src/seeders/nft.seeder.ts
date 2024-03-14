import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";

import { Nft } from "../entity/Nft";

export default class NftSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = factoryManager.get(Nft);
    await userFactory.saveMany(10);
  }
}
