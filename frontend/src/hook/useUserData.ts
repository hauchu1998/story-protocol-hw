import { useAccount, useReadContract } from "wagmi";
import { useAsync } from "react-async";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import SP721ABI from "@/abi/SP721.json";
import { formatUnits, parseUnits } from "viem";

export const useNftBalanceOf = () => {
  const { address } = useAccount();
  const { data, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SP721ABI,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: address !== undefined,
    },
  });

  return {
    balanceOf: Number(data),
    refetchNftBalanceOf: refetch,
  };
};
