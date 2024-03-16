import { useChainId, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, IPAREGISTRY_ADDRESS } from "@/constants/contract";
import IPAABI from "@/abi/IPAssetRegistry.json";

const useStoryIPOf = (tokenId: number) => {
  const chainId = useChainId();

  const { data: ipId, refetch: refetchIpAccount } = useReadContract({
    address: IPAREGISTRY_ADDRESS,
    abi: IPAABI,
    functionName: "ipAccount",
    args: [chainId, CONTRACT_ADDRESS, tokenId],
  });

  const { data: isRegistered, refetch: refetchIsRegistered } = useReadContract({
    address: IPAREGISTRY_ADDRESS,
    abi: IPAABI,
    functionName: "isRegistered",
    args: [ipId],
  });

  return {
    ipId: ipId as string,
    isRegistered: isRegistered as boolean,
    refetchIpAccount,
    refetchIsRegistered,
  };
};

export default useStoryIPOf;
