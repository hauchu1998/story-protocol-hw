import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Nft } from "../entity/Nft";

const getNft = async (req: Request, res: Response) => {
  const { chainId, contractAddress, tokenId } = req.params;

  const nftRepository = AppDataSource.getRepository(Nft);
  const nft = await nftRepository.findOneBy({
    chainId: parseInt(chainId),
    contractAddress,
    tokenId: parseInt(tokenId),
  });

  if (!nft) {
    return res.status(404).json({ message: "NFT not found" });
  }

  return res.status(200).json({ nft });
};

const createNft = async (req: Request, res: Response) => {
  try {
    const { walletAddress, chainId, contractAddress, tokenId, ipId } = req.body;

    const nftRepository = AppDataSource.getRepository(Nft);
    const nft = await nftRepository.findOneBy({
      chainId: parseInt(chainId),
      contractAddress,
      tokenId: parseInt(tokenId),
    });

    if (nft) {
      return res.status(400).json({ message: "NFT already exists" });
    }

    const newNft = nftRepository.create({
      walletAddress,
      chainId,
      contractAddress,
      tokenId,
      ipId,
    });

    await nftRepository.save(newNft);

    return res.status(201).json({ message: "NFT created successfully" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Invalid " });
  }
};

const updateNft = async (req: Request, res: Response) => {
  try {
    const { id, ipId } = req.body;
    const nftRepository = AppDataSource.getRepository(Nft);

    const nft = await nftRepository.findOneBy({
      id,
    });

    if (!nft) {
      return res.status(400).json({ message: "NFT not found" });
    }

    nft.ipId = ipId;
    await nftRepository.save(nft);

    return res.status(200).json({ message: "NFT updated successfully" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Invalid " });
  }
};

const deleteNft = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const nftRepository = AppDataSource.getRepository(Nft);

    const nft = await nftRepository.findOneBy({
      id,
    });

    if (!nft) {
      return res.status(400).json({ message: "NFT not found" });
    }

    await nftRepository.delete(id);

    return res.status(200).json({ message: "NFT deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Invalid " });
  }
};

export const nftController = {
  getNft,
  createNft,
  updateNft,
  deleteNft,
};
