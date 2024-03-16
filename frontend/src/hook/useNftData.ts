import { useAccount, useReadContract } from "wagmi";

import { useQuery } from "@tanstack/react-query";
import { parseUnits } from "viem";

import { CONTRACT_ADDRESS } from "@/constants/contract";
import abi from "@/abi/SP721.json";

export const useOwnerOf = (tokenId: number) => {
  const { data, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "ownerOf",
    args: [parseUnits(tokenId.toString(), 18)],
  });

  return { owner: data as string, refetchOwnerOf: refetch };
};

export const useTokenOfOwnerByIndex = (index: number) => {
  const { address } = useAccount();
  const { data, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "tokenOfOwnerByIndex",
    args: [address!, index],
    query: {
      enabled: address !== undefined,
    },
  });
  return {
    tokenId: Number(data),
    refetchTokenOfOwnerByIndex: refetch,
  };
};

export const useTokenUriOf = (tokenId: number) => {
  // const parsedTokenId = parseUnits(!!tokenId ? tokenId.toString() : "0", 18);
  const parsedTokenId = !!tokenId ? tokenId : 0;
  const { data, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "tokenURI",
    args: [tokenId],
    query: {
      enabled: !!tokenId,
    },
  });

  return { tokenUri: data as string, refetchTokenUriOf: refetch };
};
