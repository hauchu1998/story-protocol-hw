import * as cors from "cors";
import * as express from "express";
import * as winston from "winston";

import { privateKeyToAccount } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { Account, Transport, http } from "viem";
import { AppDataSource } from "./data-source";
import { Nft } from "./entity/Nft";
import { Request, Response } from "express";

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "0x";
const account = privateKeyToAccount(WALLET_PRIVATE_KEY as `0x${string}`);

const config: StoryConfig = {
  transport: http(
    process.env.RPC_PROVIDER_URL || "https://rpc.ankr.com/eth_sepolia"
  ),
  account,
};
const client = StoryClient.newClient(config);

const { combine, timestamp, printf, colorize, align } = winston.format;

const app = express();

// Trust the first proxy
app.set("trust proxy", 1);
app.use(express.json()); // or use bodyParser.json()?

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// app.use(errorHandler);
// app.use(cors());

// Set up logger

function colorizeText(text: string, color: string) {
  const colors: any = {
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    white: "\x1b[37m",
    reset: "\x1b[0m", // Resets the color to default after our colored text
  };

  return `${colors[color]}${text}${colors.reset}`;
}
const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    printf((info: any) => {
      const { timestamp, level, message } = info;

      // Assuming message is in the format: "method: METHOD url: URL body: BODY status: STATUS"
      const parts = message.split(" ");
      const method = colorizeText(parts[1], "green");
      const url = colorizeText(parts[3], "green");
      const body = colorizeText(parts[5], "yellow");
      const status = colorizeText(parts[7], "white");

      return `[${timestamp}] ${level}: method: ${method} url: ${url} body: ${body} status: ${status}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

app.use((req, res, next) => {
  const body = Object.keys(req.body).length ? JSON.stringify(req.body) : "";
  logger.info(
    `method: ${req.method} url: ${req.url} body: ${body} status: ${res.statusCode}`
  );
  next();
});

app.get("/hello", (req, res) => {
  return res.status(200).json({ message: "Hello, world!" });
});

app.post("/storyprotocol/registerip", async (req, res) => {
  try {
    const { contractAddress, tokenId } = req.body;
    console.log(contractAddress, tokenId);
    const response = await client.ipAsset.registerRootIp({
      tokenContractAddress: contractAddress, // your NFT contract address
      tokenId, // your NFT token ID
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`
    );
    return res.status(200).json({ message: "Root IPA created successfully" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Invalid Request" });
  }
});

app.get("getNft/:chainId/:contractAddress/:tokenId", async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Invalid " });
  }
});

app.post("/createNft", async (req: Request, res: Response) => {
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
});

app.put("updateNft", async (req: Request, res: Response) => {
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
});

app.delete("deleteNft", async (req: Request, res: Response) => {
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
});

export default app;
