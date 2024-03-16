import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { Transport, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const RPC_PROVIDER_URL =
  process.env.NEXT_PUBLIC_RPC_PROVIDER_URL ||
  "https://rpc.ankr.com/eth_sepolia";

const WALLET_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const account = privateKeyToAccount(WALLET_PRIVATE_KEY as `0x${string}`);

export const config: StoryConfig = {
  transport: http(RPC_PROVIDER_URL),
  account: account,
};
