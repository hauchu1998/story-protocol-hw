export type NetworkId = number;

export enum NetworkIds {
  Sepolia = 11155111,
}

export interface INetwork {
  name: string;
  logo: string;
  isTestNet: boolean;
  explorer: string;
  contractAddress: string;
}

export interface INetworks {
  [key: number]: INetwork;
}

export const networks: INetworks = {
  [NetworkIds.Sepolia]: {
    name: "Sepolia Testnet",
    logo: "/sepolia.png",
    isTestNet: true,
    explorer: "https://sepolia.etherscan.io/",
    contractAddress: "0x3e66b66fd1d0b02fda6c811da9e0547970db2f21",
  },
};
