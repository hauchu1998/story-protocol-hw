import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

export const chains = [sepolia];

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    walletConnect({
      projectId,
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});
