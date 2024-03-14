import { setSeederFactory } from "typeorm-extension";
import { Nft } from "../entity/Nft";

export default setSeederFactory(Nft, (faker) => {
  faker.seed(50);
  const nft = new Nft();
  nft.walletAddress = "0x" + faker.string.alpha(40);
  nft.chainId = faker.number.int(100);
  nft.contractAddress = "0x" + faker.string.alpha(40);
  nft.tokenId = faker.number.int(100);
  nft.ipId = faker.string.uuid();

  return nft;
});
