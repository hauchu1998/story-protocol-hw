import * as express from "express";
import { AppDataSource } from "../data-source";
import { nftController } from "../controller/nft.controller";

const Router = express.Router();

Router.get("getNft/:chainId/:contractAddress/:tokenId", nftController.getNft);
Router.post("createNft", nftController.createNft);
Router.put("updateNft", nftController.updateNft);
Router.delete("deleteNft", nftController.deleteNft);

export { Router as nftRouter };
